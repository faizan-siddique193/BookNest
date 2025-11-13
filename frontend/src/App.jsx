import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import {
  SignUp,
  SignIn,
  BookListing,
  AddBook,
  BookManagement,
  EditBook,
  DashboardOverview,
  BooksByCategory,
  WishlistPage,
  CheckoutPage,
  OrderConfirmation,
  FeaturedBooks,
  LatestBooks,
  OrderCancellation,
  ErrorPage,
  BookDetailPage,
} from "./pages/index.js";
import Home from "./pages/Home.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProfilePage from "./pages/customer/ProfilePage.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import BookLayout from "./layout/BookLayout.jsx";
import Categories from "./Component/Categories.jsx";
import ProtectedRoute from "./routes/protectedRoute.jsx";
import { getUserProfile } from "./feature/user/userAction.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Loading } from "./Component/index.js";
import { Loader, User2 } from "lucide-react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "./config/firebase.js";
import { getCartItem } from "./feature/cart/cartAction.js";
import { getWishlistItem } from "./feature/wishlist/wishlistAction.js";
import AdminPrtoctedRoute from "./routes/AdminRoutes.jsx";

const App = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState(null);
  const { user, loading } = useSelector((state) => state.user);

  const userRole = user?.role;
  // get token and user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user.getIdToken();
        setToken(token);
        dispatch(getUserProfile({ token }));
      }
      setInitializing(false);
    });
    return unsubscribe;
  }, [dispatch]);

  if (initializing) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/unauthorized" element={<ErrorPage />} />

          {/* Protected layout with nested routes */}
          <Route path="/" element={<Layout />}>
            <Route path="/home" index element={<Home />} />
            <Route path="books" element={<BookListing />} />
            <Route path="books/:slug" element={<BookDetailPage />} />
            <Route path="books/featured" element={<FeaturedBooks />} />
            <Route path="books/latest" element={<LatestBooks />} />
            <Route
              path="books/category/:category"
              element={<BooksByCategory />}
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="categories" element={<Categories />} />
            <Route
              path="order-confirmation/:orderId"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="order-cancellation"
              element={
                <ProtectedRoute>
                  <OrderCancellation />
                </ProtectedRoute>
              }
            />
            {/* user profile */}
            <Route
              path="user/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* admin routes */}
          {/* <Route element={<AdminPrtoctedRoute role={userRole} user={token} />}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="books" element={<BookLayout />}>
              <Route index element={<BookManagement />} />
              <Route path="add" element={<AddBook />} />
              <Route path="edit/:slug" element={<EditBook />} />
            </Route>
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
