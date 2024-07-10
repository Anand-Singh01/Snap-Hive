import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signUpUser } from "../../utils/api-communicator";
import { IUserState } from "../../utils/interfaces";

const initialState: IUserState = {
  user: { username: null, email: null, imageUrl: null },
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { username: null, email: null, imageUrl: null };

      localStorage.removeItem("user-info");
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle loginUser
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem(
        "user-info",
        JSON.stringify({
          username: action.payload.username,
          email: action.payload.email,
          imageUrl: action.payload.imageUrl,
        })
      );
    });

    // Handle signUpUser
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem(
        "user-info",
        JSON.stringify({
          username: action.payload.username,
          email: action.payload.email,
          imageUrl: action.payload.imageUrl,
        })
      );
    });
  },
});

export const { logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
