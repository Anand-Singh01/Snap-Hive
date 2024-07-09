"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = exports.success = exports.unauthorizedError = exports.serverError = void 0;
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
