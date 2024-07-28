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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getLikedPosts = exports.updateSaveOnAPost = exports.updateLikeOnAPost = exports.recentPosts = exports.addPost = exports.updatePost = exports.getPost = void 0;
const __1 = require("..");
const dataUri_1 = __importDefault(require("../middleware/dataUri"));
const cloudinary_1 = __importDefault(require("../util/cloudinary"));
const helper_1 = require("../util/helper");
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
        const { postId } = req.params;
        const post = yield __1.prisma.post.findFirst({
            where: {
                id: postId,
            },
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
                likedBy: {
                    where: {
                        id: data.id,
                    },
                },
                savedBy: {
                    where: {
                        id: data.id,
                    },
                },
                tags: {
                    select: {
                        tagName: true,
                    },
                },
            },
        });
        if (post) {
            const { likedBy, savedBy } = post, rest = __rest(post, ["likedBy", "savedBy"]);
            const newPost = Object.assign(Object.assign({}, rest), { isLiked: likedBy.length > 0, isSaved: savedBy.length > 0 });
        }
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
        const { postId } = req.params;
        const file = req.file;
        const { caption, location, tags } = req.body;
        const tagOperations = tags && tags.length > 0
            ? tags.map(({ tagName }) => ({
                where: { tagName },
                create: { tagName },
            }))
            : undefined;
        const existingTags = yield __1.prisma.post.findFirst({
            where: {
                id: postId,
            },
            select: {
                tags: true,
            },
        });
        const tagsToBeDeleted = existingTags === null || existingTags === void 0 ? void 0 : existingTags.tags.filter((existingTag) => !(tags === null || tags === void 0 ? void 0 : tags.some((newTag) => newTag.tagName === existingTag.tagName)));
        if (!file) {
            const post = yield __1.prisma.post.update({
                where: { id: postId },
                data: {
                    caption,
                    location,
                    tags: { connectOrCreate: tagOperations, disconnect: tagsToBeDeleted },
                },
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
                            tagName: true,
                        },
                    },
                    likedBy: {
                        where: {
                            id: data.id,
                        },
                    },
                    savedBy: {
                        where: {
                            id: data.id,
                        },
                    },
                },
            });
            const { likedBy, savedBy } = post, rest = __rest(post, ["likedBy", "savedBy"]);
            const newPost = Object.assign(Object.assign({}, rest), { isLiked: likedBy.length > 0, isSaved: savedBy.length > 0 });
            return (0, helper_1.success)(res, { post: newPost });
        }
        else {
            const fileUri = (0, dataUri_1.default)(file);
            const myCloud = yield cloudinary_1.default.uploader.upload(fileUri.content);
            const post = yield __1.prisma.post.update({
                where: { id: postId },
                data: {
                    postImage: myCloud.secure_url,
                    caption,
                    location,
                    tags: { connectOrCreate: tagOperations, disconnect: tagsToBeDeleted },
                },
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
                            tagName: true,
                        },
                    },
                    likedBy: {
                        where: {
                            id: data.id,
                        },
                    },
                    savedBy: {
                        where: {
                            id: data.id,
                        },
                    },
                },
            });
            const { likedBy, savedBy } = post, rest = __rest(post, ["likedBy", "savedBy"]);
            const newPost = Object.assign(Object.assign({}, rest), { isLiked: likedBy.length > 0, isSaved: savedBy.length > 0 });
            return (0, helper_1.success)(res, { post: newPost });
        }
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.updatePost = updatePost;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email } = res.locals.jwtData;
        const { caption, location, tags } = req.body;
        const file = req.file;
        if (file) {
            const fileUri = (0, dataUri_1.default)(file);
            const myCloud = yield cloudinary_1.default.uploader.upload(fileUri.content);
            const tagOperations = tags && tags.length > 0
                ? tags.map(({ tagName }) => ({
                    where: { tagName },
                    create: { tagName },
                }))
                : undefined;
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
                    tags: {
                        connectOrCreate: tagOperations,
                    },
                },
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
                            tagName: true,
                        },
                    },
                },
            });
            const newPost = Object.assign(Object.assign({}, post), { isLiked: false, isSaved: false });
            return (0, helper_1.success)(res, { post: newPost });
        }
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.addPost = addPost;
const recentPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = res.locals.jwtData;
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
                likedBy: {
                    where: {
                        id: data.id,
                    },
                },
                savedBy: {
                    where: {
                        id: data.id,
                    },
                },
                tags: {
                    select: {
                        tagName: true,
                    },
                },
            },
        });
        const newPosts = posts.map((post) => {
            const { likedBy, savedBy } = post, rest = __rest(post, ["likedBy", "savedBy"]);
            return Object.assign(Object.assign({}, rest), { isLiked: likedBy.length > 0, isSaved: savedBy.length > 0 });
        });
        return (0, helper_1.success)(res, { posts: newPosts });
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
const updateSaveOnAPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const data = res.locals.jwtData;
        const user = yield __1.prisma.user.findUnique({
            where: {
                id: data.id,
            },
            include: {
                savedPosts: true,
            },
        });
        if (user) {
            const alreadySaved = user.savedPosts.some((post) => post.id === postId);
            if (alreadySaved) {
                yield __1.prisma.user.update({
                    where: {
                        id: data.id,
                    },
                    data: {
                        savedPosts: {
                            disconnect: {
                                id: postId,
                            },
                        },
                    },
                });
            }
            else {
                yield __1.prisma.user.update({
                    where: {
                        id: data.id,
                    },
                    data: {
                        savedPosts: {
                            connect: {
                                id: postId,
                            },
                        },
                    },
                });
            }
            return (0, helper_1.success)(res, "success");
        }
    }
    catch (error) {
        console.log(error);
        return (0, helper_1.serverError)(res, error);
    }
});
exports.updateSaveOnAPost = updateSaveOnAPost;
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
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comments = __1.prisma.comment.findMany({
            where: {
                postId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            select: {
                id: true,
                comment: true,
                commentBy: {
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
            },
        });
        return (0, helper_1.success)(res, { comments });
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.getComments = getComments;
