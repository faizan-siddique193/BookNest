import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Navigate, Outlet } from "react-router-dom";
import { ErrorPage } from "../pages/index";
const AdminPrtoctedRoute = ({ role, user }) => {
  if (!user || role !== "admin") return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default AdminPrtoctedRoute;
