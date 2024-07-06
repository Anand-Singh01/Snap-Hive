"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_URL_DEV],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use("/user", user_1.userRoutes);
exports.default = app;
