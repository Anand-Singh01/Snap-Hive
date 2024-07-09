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
    });
    if (!user || !(await compare(password, user.password))) {
      unauthorizedError(res, "invalid email or password.");
    } else {
      updateTokenAndCookie(res, { id: user.id.toString(), email }, "7d");
      success(res, { username: user.username, email });
    }
  } catch (error) {
    serverError(res, error);
  }
};

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: ISignUpData = req.body;
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
        },
      });
      updateTokenAndCookie(res, { id: user.id.toString(), email }, "7d");
      success(res, { username, email });
    }
  } catch (error) {
    serverError(res, error);
  }
};

export const authStatus = async (req: Request, res: Response) => {
  try {
    const data: ITokenData = res.locals.jwtData;
    console.log(data);
    const user = await prisma.user.findFirst({
      where: {
        id: Number(data.id),
        email: data.email,
      },
    });
    if (user) {
      success(res, { username: user.username, email: user.email });
    } else {
      unauthorizedError(res, "unauthorized");
    }
  } catch (error) {
    serverError(res, error);
  }
};
