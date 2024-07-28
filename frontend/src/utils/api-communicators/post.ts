import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ICreatePostData,
  ICreatePostResponse,
  IErrorResponse,
  IFetchRecentPostPostResponse,
  msgResponse
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
msgResponse,
  { postId: string },
  { rejectValue: IErrorResponse }
>("/post/LikeAPost", async ({ postId }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/post/like-post/${postId}`);
    const data: msgResponse = await res.data.payload;
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
msgResponse,
  { postId: string },
  { rejectValue: IErrorResponse }
>("/post/SaveAPost", async ({ postId }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/post/save-post/${postId}`);
    const data: msgResponse = await res.data.payload;
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

export const createPost = createAsyncThunk<
  ICreatePostResponse,
  ICreatePostData,
  { rejectValue: IErrorResponse }
>("post/addPost", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post("/post/addPost", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data : ICreatePostResponse = await res.data.payload;
    return { ...data };
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

export const updatePost = createAsyncThunk<
  ICreatePostResponse,
  { id: string | undefined; payload: ICreatePostData },
  { rejectValue: IErrorResponse }
>(`post/update-post/:id`, async ({ id, payload }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`/post/update-post/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data: ICreatePostResponse = await res.data.payload;
    return { ...data };
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
