import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  fetchAllComments,
} from "../../utils/api-communicators/post";
import {
  IComment,
  ICommentSliceInitialState,
} from "../../utils/constants/interfaces";

const initialState: ICommentSliceInitialState = {
  commentsById: {},
  addCommentStatus: "idle",
  fetchCommentStatus: "idle",
};
const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    updateReplyCount: (state, action) => {
      const { commentId, postId, command } = action.payload;
      console.log(commentId, postId, command);
      const index = state.commentsById[postId].findIndex((comment) => {
        comment.id = commentId;
      });
      console.log(index);
      if (index != -1) {
        switch (command) {
          case "add":
            state.commentsById[postId][index].replyCount++;
            break;
          case "remove":
            state.commentsById[postId][index].replyCount--;
            break;
        }
      }
    },
    resetAddCommentStatus: (state) => {
      state.addCommentStatus = "idle";
    },
    resetFetchCommentStatus: (state) => {
      state.fetchCommentStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { comment } = action.payload;
      if (comment) {
        if (!state.commentsById[comment.postId]) {
          state.commentsById[comment.postId] = [];
        }
        state.commentsById[comment.postId] = [
          comment,
          ...state.commentsById[comment.postId],
        ];
      }
      state.addCommentStatus = "succeeded";
    });
    builder.addCase(addComment.pending, (state) => {
      state.addCommentStatus = "loading";
    });
    builder.addCase(addComment.rejected, (state) => {
      state.addCommentStatus = "failed";
    });

    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      const { comments } = action.payload;
      if (comments.length > 0) {
        state.commentsById = comments.reduce<Record<string, IComment[]>>(
          (acc, comment) => {
            if (!acc[comment.postId]) {
              acc[comment.postId] = [];
            }
            acc[comment.postId].push(comment);
            return acc;
          },
          {}
        );
      }
      state.fetchCommentStatus = "succeeded";
    });

    builder.addCase(fetchAllComments.pending, (state) => {
      state.fetchCommentStatus = "loading";
    });

    builder.addCase(fetchAllComments.rejected, (state) => {
      state.fetchCommentStatus = "failed";
    });
  },
});
export const {
  resetAddCommentStatus,
  resetFetchCommentStatus,
  updateReplyCount,
} = commentSlice.actions;
export default commentSlice.reducer;
