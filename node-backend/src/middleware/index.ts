import { NextFunction, Request, Response } from "express";
import { serverError, unauthorizedError } from "../util/helper";
import { ILoginData, ISignUpData } from "../util/interfaces";
import { loginSchema, signUpSchema } from "./zod/validation";
export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: ILoginData = req.body;
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      return unauthorizedError(res, "invalid credentials.");
    }
    next();
  } catch (error) {
    serverError(res, error);
  }
};

export const signUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password }: ISignUpData = req.body;
    const result = signUpSchema.safeParse({ username, email, password });
    if (!result.success) {
      return unauthorizedError(res, "invalid credentials.");
    }
    next();
  } catch (error) {
    console.error("error validating user signup", error);
    res.status(500).json({ msg: "server error" });
  }
};
