import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "password should be minimum 5 characters long." })
    .max(20, { message: "password should be max 20 characters long." }),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username should be minimum 2 characters long." })
    .max(20, { message: "username should be max 20 characters long." }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "password should be minimum 5 characters long." })
    .max(20, { message: "password should be maximum 20 characters long." }),
});
