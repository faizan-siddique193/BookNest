import React, { useEffect, useState } from "react";
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
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import BookLayout from "./layout/BookLayout.jsx";
import Categories from "./Component/Categories.jsx";
import ProtectedRoute from "./routes/protectedRoute.jsx";
import RoleBasedRoute from "./routes/RoleBasedRoute.jsx";
import { getUserProfile } from "./feature/user/userAction.js";
import { getCartItem } from "./feature/cart/cartAction.js";
import { getWishlistItem } from "./feature/wishlist/wishlistAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./Component/index.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.js";

const App = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState(null);
  const { user } = useSelector((state) => state.user);

  const userRole = user?.role;

  // Get token and user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          setToken(token);
          dispatch(getUserProfile({ token }));
        });
      }
      setInitializing(false);
    });
    return unsubscribe;
  }, [dispatch]);

  // Fetch cart items when user is authenticated
  useEffect(() => {
    if (user) {
      dispatch(getCartItem());
      dispatch(getWishlistItem());
    }
  }, [dispatch, user]);

  if (initializing) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Authentication routes */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/unauthorized" element={<ErrorPage />} />

          {/* Main application routes with Layout - Customers only */}
          <Route
            path="/"
            element={
              <RoleBasedRoute allowedRoles={["customer"]}>
                <Layout />
              </RoleBasedRoute>
            }
          >
            {/* Home page - rendered at / */}
            <Route index element={<Home />} />

            {/* Book routes */}
            <Route path="/books" element={<BookListing />} />
            <Route path="/books/:slug" element={<BookDetailPage />} />
            <Route path="/books/featured" element={<FeaturedBooks />} />
            <Route path="/books/latest" element={<LatestBooks />} />
            <Route
              path="/books/category/:category"
              element={<BooksByCategory />}
            />

            {/* Categories */}
            <Route path="/categories" element={<Categories />} />

            {/* Protected user routes */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order-confirmation/:orderId"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order-cancellation"
              element={
                <ProtectedRoute>
                  <OrderCancellation />
                </ProtectedRoute>
              }
            />

            {/* User profile */}
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin routes - Admins only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          >
            {/* Admin Profile */}
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/admin/books" element={<BookLayout />}>
              <Route index element={<BookManagement />} />
              <Route path="/admin/books/add" element={<AddBook />} />
              <Route path="/admin/books/edit/:slug" element={<EditBook />} />
            </Route>
          </Route>

          {/* Fallback route for 404 - must be last */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
