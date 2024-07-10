import { createSlice } from "@reduxjs/toolkit";
import { ICurrPage } from "../../utils/constants/interfaces";

export const initialState: ICurrPage = {
  name: "Home",
};

const currPageSlice = createSlice({
  name: "currPageSlice",
  initialState,
  reducers: {
    updateCurrPage: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default currPageSlice.reducer;
export const {updateCurrPage} = currPageSlice.actions;

