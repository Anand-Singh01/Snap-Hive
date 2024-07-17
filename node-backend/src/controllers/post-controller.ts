// controllers/post-controller.ts
import { Request, Response } from "express";
import { prisma } from "..";
import getDataUri from "../middleware/dataUri";
import cloudinary from "../util/cloudinary";
import { serverError, success, unauthorizedError } from "../util/helper";
import { ITokenData } from "../util/interfaces";

export const addPost = async (req: Request, res: Response) => {
  try {
    const data: ITokenData = res.locals.jwtData;
    const { id, email } = data;
    const { caption, location } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        id,
        email,
      },
    });
    if (user) {
      const file: Express.Multer.File | undefined = req.file;
      if (file) {
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.uploader.upload(fileUri.content);
        const post = await prisma.post.create({
          data: {
            postImage: myCloud.secure_url,
            caption,
            location,
            postedBy: {
              connect: {
                id,
              },
            },
          },
        });
        return success(res, { msg: "success" });
      } else {
        throw new Error("No file uploaded");
      }
    }
  } catch (error) {
    return serverError(res, error);
  }
};

export const recentPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      select: {
        id: true,
        caption: true,
        location: true,
        postImage: true,
        totalLikes: true,
        totalComments: true,
        createdAt: true,
        postedBy: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                id: true,
                profilePic: true,
              },
            },
          },
        },
        tags: {
          select: {
            id: true,
            tagName: true,
          },
        },
      },
    });

    return success(res, { posts: posts });
  } catch (error) {
    serverError(res, error);
  }
};

export const updateLikeOnAPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const data: ITokenData = res.locals.jwtData;
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
        email: data.email,
      },
      include: {
        likedPosts: true,
      },
    });
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { likedBy: true },
    });
    if (post && user) {
      const alreadyLiked = user.likedPosts.some(
        (likePost) => likePost.id === postId
      );
      if (alreadyLiked) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            likedPosts: {
              disconnect: {
                id: postId,
              },
            },
          },
        });
        await prisma.post.update({
          where: { id: postId },
          data: {
            totalLikes: {
              decrement: 1,
            },
          },
        });
      } else {
        await prisma.user.update({
          where: { id: data.id },
          data: {
            likedPosts: {
              connect: {
                id: postId,
              },
            },
          },
        });
        await prisma.post.update({
          where: { id: postId },
          data: {
            totalLikes: {
              increment: 1,
            },
          },
        });
      }
      return success(res, { msg: "success" });
    } else {
      return unauthorizedError(res, "unauthorized");
    }
  } catch (error) {
    console.log(error);
    return serverError(res, error);
  }
};

export const getLikedPosts = async (req: Request, res: Response) => {
  try {
    const data: ITokenData = res.locals.jwtData;
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
        email: data.email,
      },
    });
    if (user) {
      const likedPosts = await prisma.user.findMany({
        where: {
          id: user.id,
        },
        select: {
          likedPosts: {
            select: {
              id: true,
            },
          },
        },
      });
      return success(res, likedPosts[0]);
    } else {
      return unauthorizedError(res, "unauthorized");
    }
  } catch (error) {
    console.log(error);
    return serverError(res, error);
  }
};
