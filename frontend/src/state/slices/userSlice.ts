import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signUpUser,
} from "../../utils/api-communicators/user";
import { IUserState } from "../../utils/constants/interfaces";

const initialState: IUserState = {
  user: {
    username: null,
    email: null,
    profilePic: null,
    name: null,
    userId: null,
  },
  authStatus: "idle",
  logoutStatus: "idle",
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
    resetUserState: (state) => {
      localStorage.removeItem("user");
      state.user = initialState.user;
      state.authStatus = initialState.authStatus;
      state.logoutStatus = initialState.logoutStatus;
      state.isAuthenticated = initialState.isAuthenticated;
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
      state.user = action.payload;
      state.authStatus = "succeeded";
      state.isAuthenticated = true;
    });
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.authStatus = "loading";
      state.isAuthenticated = false;
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.authStatus = "failed";
      state.isAuthenticated = false;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.logoutStatus = "loading";
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.logoutStatus = "failed";
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.logoutStatus = "succeeded";
    });
  },
});

export const { updateUserInfo, resetUserState } = userSlice.actions;
export default userSlice.reducer;
