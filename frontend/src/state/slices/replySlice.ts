import { createSlice } from "@reduxjs/toolkit";
import { addReply } from "../../utils/api-communicators/post";
import { IReplySliceInitialState } from "../../utils/constants/interfaces";

const initialState: IReplySliceInitialState = {
  replyById: {},
  addReplyStatus: "idle",
  fetchReplyStatus: "idle",
};

const replySlice = createSlice({
  name: "replySlice",
  initialState,
  reducers: {
    resetAddReplyStatus: (state) => {
        state.addReplyStatus = "idle";
      },
  },
  extraReducers: (builder) => {
    builder.addCase(addReply.fulfilled, (state, action) => {
      const { reply } = action.payload;
      if (!state.replyById[reply.commentId]) {
        state.replyById[reply.commentId] = [];
      }
      state.replyById[reply.commentId] = [
        reply,
        ...state.replyById[reply.commentId],
      ];
      state.addReplyStatus = "succeeded";
    });
    builder.addCase(addReply.pending, (state) => {
      state.addReplyStatus = "loading";
    });
    builder.addCase(addReply.rejected, (state) => {
      state.addReplyStatus = "failed";
    });
  },
});

export const {resetAddReplyStatus} = replySlice.actions;
export default replySlice.reducer;
