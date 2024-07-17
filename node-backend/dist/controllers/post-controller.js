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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedPosts = exports.updateLikeOnAPost = exports.recentPosts = exports.addPost = void 0;
const __1 = require("..");
const dataUri_1 = __importDefault(require("../middleware/dataUri"));
const cloudinary_1 = __importDefault(require("../util/cloudinary"));
const helper_1 = require("../util/helper");
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
        const { id, email } = data;
        const { caption, location } = req.body;
        const user = yield __1.prisma.user.findFirst({
            where: {
                id,
                email,
            },
        });
        if (user) {
            const file = req.file;
            if (file) {
                const fileUri = (0, dataUri_1.default)(file);
                const myCloud = yield cloudinary_1.default.uploader.upload(fileUri.content);
                const post = yield __1.prisma.post.create({
                    data: {
                        postImage: myCloud.secure_url,
                        caption,
                        location,
                        postedBy: {
                            connect: {
                                id,
                            },
                        },
                    },
                });
                return (0, helper_1.success)(res, { msg: "success" });
            }
            else {
                throw new Error("No file uploaded");
            }
        }
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.addPost = addPost;
const recentPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield __1.prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 20,
            select: {
                id: true,
                caption: true,
                location: true,
                postImage: true,
                totalLikes: true,
                totalComments: true,
                createdAt: true,
                postedBy: {
                    select: {
                        id: true,
                        name: true,
                        profile: {
                            select: {
                                id: true,
                                profilePic: true,
                            },
                        },
                    },
                },
                tags: {
                    select: {
                        id: true,
                        tagName: true,
                    },
                },
            },
        });
        return (0, helper_1.success)(res, { posts: posts });
    }
    catch (error) {
        (0, helper_1.serverError)(res, error);
    }
});
exports.recentPosts = recentPosts;
const updateLikeOnAPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const data = res.locals.jwtData;
        const user = yield __1.prisma.user.findUnique({
            where: {
                id: data.id,
                email: data.email,
            },
            include: {
                likedPosts: true,
            },
        });
        const post = yield __1.prisma.post.findUnique({
            where: { id: postId },
            include: { likedBy: true },
        });
        if (post && user) {
            const alreadyLiked = user.likedPosts.some((likePost) => likePost.id === postId);
            if (alreadyLiked) {
                yield __1.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        likedPosts: {
                            disconnect: {
                                id: postId,
                            },
                        },
                    },
                });
                yield __1.prisma.post.update({
                    where: { id: postId },
                    data: {
                        totalLikes: {
                            decrement: 1,
                        },
                    },
                });
            }
            else {
                yield __1.prisma.user.update({
                    where: { id: data.id },
                    data: {
                        likedPosts: {
                            connect: {
                                id: postId,
                            },
                        },
                    },
                });
                yield __1.prisma.post.update({
                    where: { id: postId },
                    data: {
                        totalLikes: {
                            increment: 1,
                        },
                    },
                });
            }
            return (0, helper_1.success)(res, { msg: "success" });
        }
        else {
            return (0, helper_1.unauthorizedError)(res, "unauthorized");
        }
    }
    catch (error) {
        console.log(error);
        return (0, helper_1.serverError)(res, error);
    }
});
exports.updateLikeOnAPost = updateLikeOnAPost;
const getLikedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
        const user = yield __1.prisma.user.findUnique({
            where: {
                id: data.id,
                email: data.email,
            },
        });
        if (user) {
            const likedPosts = yield __1.prisma.user.findMany({
                where: {
                    id: user.id,
                },
                select: {
                    likedPosts: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            return (0, helper_1.success)(res, likedPosts[0]);
        }
        else {
            return (0, helper_1.unauthorizedError)(res, "unauthorized");
        }
    }
    catch (error) {
        console.log(error);
        return (0, helper_1.serverError)(res, error);
    }
});
exports.getLikedPosts = getLikedPosts;
