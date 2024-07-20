import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signUpUser,
} from "../../utils/api-communicators/user";
import { IUserState } from "../../utils/constants/interfaces";

const initialState: IUserState = {
  user: JSON.parse(localStorage.getItem("user") || "null") || {
    username: null,
    email: null,
    profilePic: null,
    name: null,
    userId: null,
  },
  authStatus: {
    status: "idle",
  },
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle loginUser
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });

    // Handle signUpUser
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // Handle check-auth
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.authStatus.status = "succeeded";
    });
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.authStatus.status = "loading";
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.authStatus.status = "failed";
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {
        username: null,
        email: null,
        profilePic: null,
        name: null,
        userId: null,
      };
      localStorage.removeItem("user");
    });
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
