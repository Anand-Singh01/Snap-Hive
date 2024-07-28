import { Router } from "express";
import {
    addPost,
    getComments,
    getLikedPosts,
    getPost,
    recentPosts,
    updateLikeOnAPost,
    updatePost,
    updateSaveOnAPost
} from "../controllers/post-controller";
import singleUpload from "../middleware/multer";
import { checkIfPostExists, checkIfUserExists } from "../util/helper";
import { verifyToken } from "../util/token";
export const postRoutes = Router();

postRoutes.use(verifyToken);
postRoutes.use(checkIfUserExists);
// /post/addPost
postRoutes.post("/addPost", singleUpload, addPost);

// /post/getPost
postRoutes.post("/getPost", getPost);

// /post/recentPosts
postRoutes.get("/recentPosts", recentPosts);

// /post/like-post/:postId
postRoutes.get("/like-post/:postId", updateLikeOnAPost);

// /post/save-post/:postId
postRoutes.get("/save-post/:postId", updateSaveOnAPost);

// /post/likedPosts
postRoutes.get("/likedPosts", getLikedPosts);

// post/update-post/postId
postRoutes.post("/update-post/:postId", singleUpload, updatePost);

// post/update-post/postId
postRoutes.post("/get-comments/:postId", checkIfPostExists, getComments);
