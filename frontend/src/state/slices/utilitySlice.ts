import { createSlice } from "@reduxjs/toolkit";
import { IUtilitySlice } from "../../utils/constants/interfaces";

const initialState: IUtilitySlice = {
  utilityReply: null
};

const utilitySlice = createSlice({
  name: "replySlice",
  initialState,
  reducers: {
    updateUtilityReplyState: (state, action) => {
      const { mainCommentId, replyToName } = action.payload;
      state.utilityReply = {
        mainCommentId,
        replyToName,
      };
    },
  },
});

export const { updateUtilityReplyState } = utilitySlice.actions;
export default utilitySlice.reducer;
