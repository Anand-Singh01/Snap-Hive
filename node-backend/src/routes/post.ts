import { Router } from "express";
import {
    addPost,
    getLikedPosts,
    recentPosts,
    updateLikeOnAPost,
} from "../controllers/post-controller";
import singleUpload from "../middleware/multer";
import { verifyToken } from "../util/token";
export const postRoutes = Router();

postRoutes.use(verifyToken);

// /post/addPost
postRoutes.post("/addPost", singleUpload, addPost);

// /post/recentPosts
postRoutes.get("/recentPosts", recentPosts);

// /post/like-post/:postId
postRoutes.get("/like-post/:postId", updateLikeOnAPost);

// /post/likedPosts
postRoutes.get("/likedPosts", getLikedPosts);
