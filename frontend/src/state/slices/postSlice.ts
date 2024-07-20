import { createSlice } from "@reduxjs/toolkit";
import { fetchRecentPosts } from "../../utils/api-communicators/post";
import { logoutUser } from "../../utils/api-communicators/user";
import { IPostInitialState } from "../../utils/constants/interfaces";

const initialState: IPostInitialState = {
  posts: [],
  status: "idle",
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
    builder.addCase(fetchRecentPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      const data = action.payload;
      state.posts.push(...data.posts);
    });
    builder.addCase(fetchRecentPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRecentPosts.rejected, (state) => {
      state.status = "failed";
      // alert("error");
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.posts.splice(0, state.posts.length);
    });
  },
});

export const { updateLike, updateSave } = postSlice.actions;
export default postSlice.reducer;
