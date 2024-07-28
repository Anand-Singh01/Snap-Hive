import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  fetchRecentPosts,
  updatePost,
} from "../../utils/api-communicators/post";
import { IPost, IPostInitialState } from "../../utils/constants/interfaces";

const initialState: IPostInitialState = {
  postsById: {},
  fetchPostStatus: "idle",
  createPostStatus: "idle",
  updatePostStatus: "idle"
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    updateLike: (state, action) => {
      const { postId, type } = action.payload;
      const post = state.postsById[postId];
      if (post) {
        switch (type) {
          case "add":
            post.totalLikes++;
            post.isLiked = true;
            break;
          case "remove":
            post.totalLikes--;
            post.isLiked = false;
            break;
          default:
            break;
        }
      }
    },
    resetPostState: () => initialState,
    resetPostStatus: (state, action) => {
      switch (action.payload) {
        case "fetch":
          state.fetchPostStatus = "idle";
          break;
        case "create":
          state.createPostStatus = "idle";
          break;
        case "update":
          state.updatePostStatus = "idle";
          break;
      }
    },
    updateSave: (state, action) => {
      const { postId, type } = action.payload;
      const post = state.postsById[postId];
      if (post) {
        switch (type) {
          case "save":
            state.postsById[postId].isSaved = true;
            break;
          case "unSave":
            state.postsById[postId].isSaved = false;
            break;
          default:
            break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Posts
    builder.addCase(fetchRecentPosts.fulfilled, (state, action) => {
      state.fetchPostStatus = "succeeded";
      const {posts} = action.payload;
      state.postsById = posts.reduce<Record<string, IPost>>(
        (acc, post) => {
          acc[post.id] = post;
          return acc;
        },
        {}
      );
      // state.posts.push(...data.posts);
    });
    builder.addCase(fetchRecentPosts.pending, (state) => {
      state.fetchPostStatus = "loading";
    });
    builder.addCase(fetchRecentPosts.rejected, (state) => {
      state.fetchPostStatus = "failed";
      alert("error");
    });

    // Create post
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.createPostStatus = "succeeded";
      const { post } = action.payload;
      state.postsById[post.id] = post;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createPostStatus = "failed";
    });
    builder.addCase(createPost.pending, (state) => {
      state.createPostStatus = "loading";
    });

    //updatePost
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const { post } = action.payload;
      state.postsById[post.id] = post;

      state.updatePostStatus = "succeeded";
    });
    builder.addCase(updatePost.rejected, (state) => {
      state.updatePostStatus = "failed";
    });
    builder.addCase(updatePost.pending, (state) => {
      state.updatePostStatus = "loading";
    });
  },
});

export const { updateLike, updateSave, resetPostState, resetPostStatus } =
  postSlice.actions;
export default postSlice.reducer;
