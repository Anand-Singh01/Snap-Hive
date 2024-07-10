import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ICurrentUser,
  IErrorResponse,
  ILoginData,
  ILoginResponse,
  ISignUpData,
  ISignUpResponse,
} from "./interfaces";

export const loginUser = createAsyncThunk<
  ILoginResponse,
  ILoginData,
  { rejectValue: IErrorResponse }
>("user/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post("/user/login", payload);
    const data: ICurrentUser = await res.data.payload;
    return { ...data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseError: IErrorResponse = {
        error: error.response.data,
        status:error.response.status
      };
      return rejectWithValue(responseError);
    }
    throw error;
  }
});

export const checkAuthStatus = createAsyncThunk<
  ILoginResponse,
  void,
  { rejectValue: IErrorResponse }
>("user/auth-status", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/user/auth-status");
    const data: ICurrentUser = await res.data;
    return { ...data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseError: IErrorResponse = {
        error: error.response.data,
        status:error.response.status
      };
      return rejectWithValue(responseError);
    }
    throw error;
  }
});

export const signUpUser = createAsyncThunk<
  ISignUpResponse,
  ISignUpData,
  { rejectValue: IErrorResponse }
>("user/signUpUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post("/user/signUp", payload);
    const data: ICurrentUser = await res.data;
    return { ...data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseError: IErrorResponse = {
        error: error.response.data.errors ?? error.response.data,
        status:error.response.status
      };
      return rejectWithValue(responseError);
    }
    throw error;
  }
});
