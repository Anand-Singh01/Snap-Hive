import { Router } from "express";
import {
    authStatus,
    logout,
    userLogin,
    userSignUp
} from "../controllers/user-controller";
import { loginValidation, signUpValidation } from "../middleware/index";
import { verifyToken } from "../util/token";
export const userRoutes = Router();

// /user/login
userRoutes.post("/login", loginValidation, userLogin);

// /user/signUp
userRoutes.post("/signUp", signUpValidation, userSignUp);

// /user/auth-status
userRoutes.get("/auth-status", verifyToken, authStatus);

// /user/logout
userRoutes.get("/logout", verifyToken, logout);