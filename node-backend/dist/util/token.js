"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTokenAndCookie = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const helper_1 = require("../util/helper");
const COOKIE_NAME = "auth_token";
const createToken = (data, expiresIn) => {
    try {
        const { id, email } = data;
        const payload = { id, email };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn,
        });
        return token;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    try {
        const token = req.signedCookies[COOKIE_NAME];
        if (!token || token.trim() == "") {
            (0, helper_1.unauthorizedError)(res, "unauthorized");
        }
        else {
            const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
            const jwtData = {
                id: data.id,
                email: data.email,
            };
            res.locals.jwtData = jwtData;
            next();
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            (0, helper_1.unauthorizedError)(res, "expired token");
        }
        else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            (0, helper_1.unauthorizedError)(res, "invalid token");
        }
        else {
            (0, helper_1.serverError)(res, error);
        }
    }
};
exports.verifyToken = verifyToken;
const updateTokenAndCookie = (res, data, expiresIn) => {
    res.clearCookie(COOKIE_NAME, {
        path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
    const token = (0, exports.createToken)(data, expiresIn);
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
exports.updateTokenAndCookie = updateTokenAndCookie;
