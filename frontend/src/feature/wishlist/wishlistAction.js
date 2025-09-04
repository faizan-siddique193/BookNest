import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const addToWishList = createAsyncThunk(
  "wishlist/add",
  async ({ bookId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/wishlist/add-item", { bookId });
      return response.data.data.books; // return updated wishlist
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/delete",
  async ({ bookId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/wishlist/delete-item", { bookId });
      return response.data.data.books || []; // return updated wishlist
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getWishlistItem = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/wishlist/get-item");
      return response.data.data.books || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
