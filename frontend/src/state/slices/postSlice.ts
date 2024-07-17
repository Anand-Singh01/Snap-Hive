import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecentPosts,
  getLikedPosts,
} from "../../utils/api-communicators/post";
import { logoutUser } from "../../utils/api-communicators/user";
import { IPostInitialState } from "../../utils/constants/interfaces";

const initialState: IPostInitialState = {
  posts: [],
  likedPosts: [],
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
            state.likedPosts.push({ id: postId });
            break;
          case "remove":
            state.posts[index].totalLikes--;
            state.likedPosts.filter((post) => post.id !== postId);
            break;
          default:
            break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecentPosts.fulfilled, (state, action) => {
      const data = action.payload;
      state.posts.push(...data.posts);
    });

    builder.addCase(getLikedPosts.fulfilled, (state, action) => {
      const data = action.payload;
      state.likedPosts.push(...data.likedPosts);
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.posts.splice(0, state.posts.length);
    });
  },
});

export const { updateLike } = postSlice.actions;
export default postSlice.reducer;
