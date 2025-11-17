import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../feature/user/userSlice";
import authReducer from "../feature/auth/authSlice";
import bookReducer from "../feature/book/bookSlice";
import cartReducer from "../feature/cart/cartSlice";
import wishlistReducer from "../feature/wishlist/wishlistSlice";
import paymentReducer from "../feature/payment/paymentSlice";
import orderRedcuer from "../feature/order/orderSlice";
import reviewReducer from "../feature/review/reviewSlice";

/* const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "book", "cart", "wishlist"],
}; */

// combine reducer

/* const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderRedcuer,
  payment: paymentReducer,
}); */

// const persistedReducer = persistReducer(persistConfig, rootReducer);
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
