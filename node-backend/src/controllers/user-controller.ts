import { Request, Response } from "express";
import { prisma } from "../index.js";
export const addUser = async (req: Request, res: Response) => {
  try {
    console.log("here");
    const { username, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("error adding user", error);
    res.status(500).json({ msg: "server error" });
  }
};
