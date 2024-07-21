import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  fetchRecentPosts,
} from "../../utils/api-communicators/post";
import { IPostInitialState } from "../../utils/constants/interfaces";

const initialState: IPostInitialState = {
  posts: [],
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
      const index = state.posts.findIndex((post) => post.id === postId);

      if (index !== -1) {
        switch (type) {
          case "add":
            state.posts[index].totalLikes++;
            state.posts[index].isLiked = true;
            break;
          case "remove":
            state.posts[index].totalLikes--;
            state.posts[index].isLiked = false;
            break;
          default:
            break;
        }
      }
    },
    resetPostState: () => initialState,
    updateSave: (state, action) => {
      const { postId, type } = action.payload;
      const index = state.posts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        switch (type) {
          case "save":
            state.posts[index].isSaved = true;
            break;
          case "unSave":
            state.posts[index].isSaved = false;
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
      const data = action.payload;
      state.posts = data.posts;
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
    builder.addCase(createPost.fulfilled, (state) => {
      state.createPostStatus = "succeeded";
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createPostStatus = "failed";
    });
    builder.addCase(createPost.pending, (state) => {
      state.createPostStatus = "loading";
    });
  },
});

export const { updateLike, updateSave, resetPostState } = postSlice.actions;
export default postSlice.reducer;
