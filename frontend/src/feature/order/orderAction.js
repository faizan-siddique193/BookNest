import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

// Create Order
export const createOrder = createAsyncThunk(
  "order/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/order/create", data);
      console.log("Order response at order action:: ", response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Order creation failed"
      );
    }
  }
);

// Get My Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/order/get/orders?p=${currentPage}`
      );

      // delete this controller

      console.log("Response:: ", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// Get Order By ID
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/order/get/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/order/update/${orderId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);
