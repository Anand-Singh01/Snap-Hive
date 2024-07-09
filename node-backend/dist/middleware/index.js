"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidation = exports.loginValidation = void 0;
const helper_1 = require("../util/helper");
const validation_1 = require("./zod/validation");
const loginValidation = (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = validation_1.loginSchema.safeParse({ email, password });
        if (!result.success) {
            return (0, helper_1.unauthorizedError)(res, "invalid credentials.");
        }
        next();
    }
    catch (error) {
        (0, helper_1.serverError)(res, error);
    }
};
exports.loginValidation = loginValidation;
const signUpValidation = (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const result = validation_1.signUpSchema.safeParse({ username, email, password });
        if (!result.success) {
            return (0, helper_1.unauthorizedError)(res, "invalid credentials.");
        }
        next();
    }
    catch (error) {
        console.error("error validating user signup", error);
        res.status(500).json({ msg: "server error" });
    }
};
exports.signUpValidation = signUpValidation;
