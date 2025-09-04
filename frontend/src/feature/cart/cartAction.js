import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart/add-item", {
        bookId,
        quantity,
      });

      //   TODO: verify add to cart
      console.log("add to  cart Response :: ", response?.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getCartItem = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart/get-item", {});

      //   TODO: verify add to cart
      console.log("get cart item:: ", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async ({ bookId }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.delete(
        `/cart/delete-item/${bookId}`
      );

      //   TODO: verify delete cart item
      console.log("delete cart item :: ", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// update cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/cart/update-item", {
        bookId,
        quantity,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
