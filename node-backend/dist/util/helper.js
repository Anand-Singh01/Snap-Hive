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
exports.checkIfUserExists = exports.badRequest = exports.success = exports.unauthorizedError = exports.serverError = void 0;
const __1 = require("..");
const serverError = (res, error) => {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
};
exports.serverError = serverError;
const unauthorizedError = (res, msg) => {
    return res.status(401).json({ msg });
};
exports.unauthorizedError = unauthorizedError;
const success = (res, payload) => {
    return res.status(200).json({ payload });
};
exports.success = success;
const badRequest = (res, msg) => {
    return res.status(409).json({ msg });
};
exports.badRequest = badRequest;
const checkIfUserExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
        const user = yield __1.prisma.user.findUnique({
            where: {
                id: data.id,
                email: data.email,
            },
        });
        if (user) {
            next();
        }
        else {
            return (0, exports.unauthorizedError)(res, "unauthorized");
        }
    }
    catch (error) {
        return (0, exports.serverError)(res, error);
    }
});
exports.checkIfUserExists = checkIfUserExists;
