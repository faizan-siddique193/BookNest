import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./pages/index.js";
import Home from "./pages/Home.jsx";
import BookDetailPage from "./pages/Book/BookDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProfilePage from "./pages/customer/ProfilePage.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import BookLayout from "./layout/BookLayout.jsx";
import Categories from "./Component/Categories.jsx";
import ProtectedRoute from "./routes/protectedRoute.jsx";
import { getUserProfile } from "./feature/user/userAction.js";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/* Protected layout with nested routes */}
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
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
          </Route>
          {/* user profile */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="books" element={<BookLayout />}>
              <Route index element={<BookManagement />} />
              <Route path="add" element={<AddBook />} />
              <Route path="edit/:slug" element={<EditBook />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
