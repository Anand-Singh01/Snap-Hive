import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import { ITokenData } from "./interfaces";

export const serverError = (res: Response, error: any) => {
  console.log(error);
  return res.status(500).json({ msg: "server error" });
};

export const unauthorizedError = (res: Response, msg: string) => {
  return res.status(401).json({ msg });
};

export const success = (res: Response, payload: {}) => {
  return res.status(200).json({ payload });
};

export const badRequest = (res: Response, msg: string) => {
  return res.status(409).json({ msg });
};

export const checkIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: ITokenData = res.locals.jwtData;
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
        email: data.email,
      },
    });
    if (user) {
      next();
    } else {
      return unauthorizedError(res, "unauthorized");
    }
  } catch (error) {
    return serverError(res, error);
  }
};

export const checkIfPostExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (post) {
      next();
    } else {
      return unauthorizedError(res, "unauthorized");
    }
  } catch (error) {
    return serverError(res, error);
  }
};
