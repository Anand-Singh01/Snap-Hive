"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const index_1 = require("../middleware/index");
const token_1 = require("../util/token");
exports.userRoutes = (0, express_1.Router)();
// /user/login
exports.userRoutes.post("/login", index_1.loginValidation, user_controller_1.userLogin);
// /user/signUp
exports.userRoutes.post("/signUp", index_1.signUpValidation, user_controller_1.userSignUp);
// /user/auth-status
exports.userRoutes.get("/auth-status", token_1.verifyToken, user_controller_1.authStatus);
