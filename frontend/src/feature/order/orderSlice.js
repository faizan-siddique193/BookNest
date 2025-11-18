import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "./orderAction";

const initialState = {
  orderInfo: {
    orders: [],
    selectedOrder: null,
  },
  loading: false,
  error: null,
  success: false,
  totalPage: 1,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.selectedOrder = action.payload.data;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo.orders = action.payload.data.orders || [];
        state.totalPage = action.payload.data.totalPage;
        state.error = null;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo.selectedOrder = action.payload.data || null;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
