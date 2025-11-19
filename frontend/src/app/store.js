import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import authReducer from "../feature/auth/authSlice";
import bookReducer from "../feature/book/bookSlice";
import cartReducer from "../feature/cart/cartSlice";
import wishlistReducer from "../feature/wishlist/wishlistSlice";
import paymentReducer from "../feature/payment/paymentSlice";
import orderRedcuer from "../feature/order/orderSlice";
import reviewReducer from "../feature/review/reviewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    book: bookReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderRedcuer,
    payment: paymentReducer,
    review: reviewReducer,
  },
});

export default store;
