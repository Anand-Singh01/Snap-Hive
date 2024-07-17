import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ICreatePostResponse,
  IErrorResponse,
  IFetchRecentPostPostResponse,
  ILikedPosts,
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

export const getLikedPosts = createAsyncThunk<
  ILikedPosts,
  void,
  { rejectValue: IErrorResponse }
>("/post/likedPosts", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/post/likedPosts");
    const data: ILikedPosts = await res.data.payload;
    console.log(data);
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
