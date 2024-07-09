import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signUpUser } from "../../utils/api-communicator";
import { IUserState } from "../../utils/interfaces";

const initialState: IUserState = {
  user: { username: null, email: null },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { username: null, email: null };
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
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
