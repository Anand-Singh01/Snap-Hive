"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const server_js_1 = __importDefault(require("./server.js"));
exports.prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 5000;
exports.prisma
    .$connect()
    .then(() => {
    console.log("connected to database");
    server_js_1.default.listen(process.env.PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to database", error);
    process.exit(1);
});
