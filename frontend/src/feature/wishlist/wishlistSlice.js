import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishList,
  deleteWishlistItem,
  getWishlistItem,
} from "./wishlistAction";

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
  success: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // add
      .addCase(addToWishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.success = true;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete
      .addCase(deleteWishlistItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.success = true;
      })
      .addCase(deleteWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get
      .addCase(getWishlistItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
