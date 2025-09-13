import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  getCartItem,
  updateCartItemQuantity,
} from "./cartAction";

const initialState = {
  cart: null,
  loading: false,
  error: null,
  success: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  //  add these reducers
  reducers: {
    clearCartState: (state) => {
      state.loading = false;
      state.success = false;
    },
    // Optimistic update for quantity
    updateQuantityOptimistic: (state, action) => {
      const { bookId, quantity } = action.payload;
      if (state.cart) {
        const itemIndex = state.cart.items.findIndex(
          (item) => item.bookId._id === bookId
        );
        if (itemIndex > -1) {
          state.cart.items[itemIndex].quantity = quantity;
          // Recalculate total optimistically
          state.cart.total = state.cart.items.reduce((acc, item) => {
            return acc + item.bookId.price * item.quantity;
          }, 0);
        }
      }
    },
    // Optimistic removal
    removeItemOptimistic: (state, action) => {
      const bookId = action.payload;
      console.log("Optimistically removing bookId:", bookId);

      if (state.cart) {
        state.cart.items = state.cart.items.filter(
          (item) => item.bookId._id !== bookId
        );

        // Recalculate total optimistically
        state.cart.total = state.cart.items.reduce((acc, item) => {
          return acc + item.bookId.price * item.quantity;
        }, 0);
      }
    },

    // clear redux persist
    clearCart: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.cart = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    // update cart "cart item quantity"
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.cart = action.payload;
      state.error = null;
    });
    builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // get cart item
    builder.addCase(getCartItem.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(getCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.cart = action.payload;
      state.error = null;
    });
    builder.addCase(getCartItem.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // delete cart item

    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.cart = action.payload;
      state.error = null;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearCartState,
  removeItemOptimistic,
  updateQuantityOptimistic,
  clearCart,w
} = cartSlice.actions;
export default cartSlice.reducer;
