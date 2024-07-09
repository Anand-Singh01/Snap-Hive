"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z
        .string()
        .min(5, { message: "password should be minimum 5 characters long." })
        .max(20, { message: "password should be max 20 characters long." }),
});
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(2, { message: "username should be minimum 2 characters long." })
        .max(20, { message: "username should be max 20 characters long." }),
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z
        .string()
        .min(5, { message: "password should be minimum 5 characters long." })
        .max(20, { message: "password should be maximum 20 characters long." }),
});
