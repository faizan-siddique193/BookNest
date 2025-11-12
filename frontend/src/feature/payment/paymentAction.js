import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../api/axiosInstance";

export const startStripePayment = createAsyncThunk(
  "payment/startStripePayment",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        { orderId },
        {
          /* headers: {
            Authorization: `Bearer ${token}`,
          }, */
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
