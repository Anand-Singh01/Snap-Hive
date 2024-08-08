"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post-controller");
const multer_1 = __importDefault(require("../middleware/multer"));
const helper_1 = require("../util/helper");
const token_1 = require("../util/token");
exports.postRoutes = (0, express_1.Router)();
exports.postRoutes.use(token_1.verifyToken);
exports.postRoutes.use(helper_1.checkIfUserExists);
// /post/addPost
exports.postRoutes.post("/addPost", multer_1.default, post_controller_1.addPost);
// /post/getPost
// postRoutes.post("/getPost", getPost);
// /post/recentPosts
exports.postRoutes.get("/recentPosts", post_controller_1.recentPosts);
// /post/like-post/:postId
exports.postRoutes.get("/like-post/:postId", post_controller_1.updateLikeOnAPost);
// /post/save-post/:postId
exports.postRoutes.get("/save-post/:postId", post_controller_1.updateSaveOnAPost);
// // /post/likedPosts
// postRoutes.get("/likedPosts", getLikedPosts);
// post/update-post/postId
exports.postRoutes.post("/update-post/:postId", multer_1.default, post_controller_1.updatePost);
// post/update-post/postId
exports.postRoutes.get("/get-comments/:postId", helper_1.checkIfPostExists, post_controller_1.getComments);
// post/get-reply/:commentId
exports.postRoutes.get("/get-reply/:commentId", post_controller_1.getReply);
// post/add-comment
exports.postRoutes.post("/add-comment", post_controller_1.addComment);
// post/add-reply
exports.postRoutes.post("/add-reply", post_controller_1.addReply);
