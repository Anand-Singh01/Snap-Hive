"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authStatus = exports.userSignUp = exports.userLogin = void 0;
const bcrypt_1 = require("bcrypt");
const index_1 = require("../index");
const helper_1 = require("../util/helper");
const token_1 = require("../util/token");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield index_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user || !(yield (0, bcrypt_1.compare)(password, user.password))) {
            (0, helper_1.unauthorizedError)(res, "invalid email or password.");
        }
        else {
            (0, token_1.updateTokenAndCookie)(res, { id: user.id.toString(), email }, "7d");
            (0, helper_1.success)(res, { username: user.username, email });
        }
    }
    catch (error) {
        (0, helper_1.serverError)(res, error);
    }
});
exports.userLogin = userLogin;
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const userWithSameEmail = yield index_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (userWithSameEmail) {
            (0, helper_1.badRequest)(res, "this email already exists.");
        }
        else {
            const user = yield index_1.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    username,
                },
            });
            (0, token_1.updateTokenAndCookie)(res, { id: user.id.toString(), email }, "7d");
            (0, helper_1.success)(res, { username, email });
        }
    }
    catch (error) {
        (0, helper_1.serverError)(res, error);
    }
});
exports.userSignUp = userSignUp;
const authStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
        console.log(data);
        const user = yield index_1.prisma.user.findFirst({
            where: {
                id: Number(data.id),
                email: data.email,
            },
        });
        if (user) {
            (0, helper_1.success)(res, { username: user.username, email: user.email });
        }
        else {
            (0, helper_1.unauthorizedError)(res, "unauthorized");
        }
    }
    catch (error) {
        (0, helper_1.serverError)(res, error);
    }
});
exports.authStatus = authStatus;
