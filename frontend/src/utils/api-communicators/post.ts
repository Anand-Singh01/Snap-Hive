import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ICreatePostResponse,
  IErrorResponse,
  IFetchRecentPostPostResponse
} from "../constants/interfaces";

export const fetchRecentPosts = createAsyncThunk<
  IFetchRecentPostPostResponse,
  void,
  { rejectValue: IErrorResponse }
>("/post/recentPosts", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/post/recentPosts");
    const data: IFetchRecentPostPostResponse = await res.data.payload;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseError: IErrorResponse = {
        error: error.response.data,
        status: error.response.status,
      };
      return rejectWithValue(responseError);
    }
    throw error;
  }
});

export const likeAPost = createAsyncThunk<
  ICreatePostResponse,
  { postId: string },
  { rejectValue: IErrorResponse }
>("/post/LikeAPost", async ({ postId }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/post/like-post/${postId}`);
    const data: ICreatePostResponse = await res.data.payload;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseError: IErrorResponse = {
        error: error.response.data,
        status: error.response.status,
      };
      return rejectWithValue(responseError);
    }
    throw error;
  }
});

export const saveAPost = createAsyncThunk<
  ICreatePostResponse,
  { postId: string },
  { rejectValue: IErrorResponse }
>("/post/SaveAPost", async ({ postId }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/post/save-post/${postId}`);
    const data: ICreatePostResponse = await res.data.payload;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseError: IErrorResponse = {
        error: error.response.data,
        status: error.response.status,
      };
      return rejectWithValue(responseError);
    }
    throw error;
  }
});

