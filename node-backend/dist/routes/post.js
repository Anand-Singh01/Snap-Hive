"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post-controller");
const multer_1 = __importDefault(require("../middleware/multer"));
const token_1 = require("../util/token");
exports.postRoutes = (0, express_1.Router)();
exports.postRoutes.use(token_1.verifyToken);
// /post/addPost
exports.postRoutes.post("/addPost", multer_1.default, post_controller_1.addPost);
// /post/recentPosts
exports.postRoutes.get("/recentPosts", post_controller_1.recentPosts);
// /post/like-post/:postId
exports.postRoutes.get("/like-post/:postId", post_controller_1.updateLikeOnAPost);
// /post/likedPosts
exports.postRoutes.get("/likedPosts", post_controller_1.getLikedPosts);
