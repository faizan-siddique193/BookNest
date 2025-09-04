import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../feature/user/userSlice";
import authReducer from "../feature/auth/authSlice";
import bookReducer from "../feature/book/bookSlice";
import cartReducer from "../feature/cart/cartSlice";
import wishlistReducer from "../feature/wishlist/wishlistSlice";
import orderRedcuer from "../feature/order/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "book", "cart", "wishlist"],
};

// combine reducer

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderRedcuer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
