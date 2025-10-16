import { createSlice } from "@reduxjs/toolkit";
import { startStripePayment } from "./paymentAction";

const initialState = {
  clientSecret: null,
  loading: false,
  success: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.clientSecret = null;
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startStripePayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(startStripePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(startStripePayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Stripe payment failed";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
