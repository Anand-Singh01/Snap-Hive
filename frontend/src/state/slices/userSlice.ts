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
      state.user = action.payload;
    });

    // Handle signUpUser
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // Handle check-auth
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {
        username: null,
        email: null,
        profilePic: null,
        name: null,
        userId: null,
      };

    });
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
