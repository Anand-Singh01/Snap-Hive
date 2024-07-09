import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { serverError, unauthorizedError } from "../util/helper";
import { ITokenData } from "../util/interfaces";

const COOKIE_NAME = "auth_token";

export const createToken = (data: ITokenData, expiresIn: string) => {
  try {
    const { id, email } = data;
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() == "") {
      unauthorizedError(res, "unauthorized");
    } else {
      const data = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      ) as jwt.JwtPayload;

      const jwtData: ITokenData = {
        id: data.id,
        email: data.email,
      };

      res.locals.jwtData = jwtData;
      next();
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      unauthorizedError(res, "expired token");
    } else if (error instanceof JsonWebTokenError) {
      unauthorizedError(res, "invalid token");
    } else {
      serverError(res, error);
    }
  }
};

export const updateTokenAndCookie = (
  res: Response,
  data: ITokenData,
  expiresIn: string
) => {
  res.clearCookie(COOKIE_NAME, {
    path: "/",
    sameSite: "none",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  const token = createToken(data, expiresIn);
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 7);
  res.cookie(COOKIE_NAME, token, {
    path: "/",
    expires: newDate,
    sameSite: "none",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};