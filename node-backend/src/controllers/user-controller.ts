import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../index";
import {
  badRequest,
  serverError,
  success,
  unauthorizedError,
} from "../util/helper";
import { ILoginData, ISignUpData, ITokenData } from "../util/interfaces";
import { updateTokenAndCookie } from "../util/token";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: ILoginData = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
    if (!user || !(await compare(password, user.password))) {
      unauthorizedError(res, "invalid email or password.");
    } else {
      updateTokenAndCookie(res, { id: user.id, email }, "7d");
      success(res, {
        username: user.username,
        userId:user.id,
        email,
        name: user.name,
        profilePic: user.profile?.profilePic || null,
      });
    }
  } catch (error) {
    serverError(res, error);
  }
};

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, username }: ISignUpData = req.body;
    const hashedPassword = await hash(password, 10);
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userWithSameEmail) {
      badRequest(res, "this email is already taken.");
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          name,
          profile: {
            create: {},
          },
        },
        include: {
          profile: true,
        },
      });

      updateTokenAndCookie(res, { id: user.id, email }, "7d");
      success(res, {
        username,
        email,
        userId:user.id,
        name,
        profilePic: user.profile?.profilePic || null,
      });
    }
  } catch (error) {
    serverError(res, error);
  }
};

export const authStatus = async (req: Request, res: Response) => {
  try {
    const data: ITokenData = res.locals.jwtData;
    const user = await prisma.user.findFirst({
      where: {
        id: data.id,
        email: data.email,
      },
      include: {
        profile: true,
      },
    });
    if (user) {
      success(res, {
        username: user.username,
        email: user.email,
        userId:user.id,
        name: user.name,
        profilePic: user.profile?.profilePic || null,
      });
    } else {
      unauthorizedError(res, "unauthorized");
    }
  } catch (error) {
    serverError(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { email } = res.locals.jwtData;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return unauthorizedError(res, "unauthorized");
    } else {
      res.clearCookie(process.env.COOKIE_NAME || "auth-token", {
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      return success(res, { msg: "success" });
    }
  } catch (error) {
    return serverError(res, error);
  }
};
