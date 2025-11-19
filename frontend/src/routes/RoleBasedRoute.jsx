import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return children;
  }

  // If admin tries to access customer routes, redirect to admin dashboard
  if (user.role === "admin" && !allowedRoles.includes("admin")) {
    return <Navigate to="/admin/books" replace />;
  }

  // If customer tries to access admin routes, redirect to home
  if (user.role !== "admin" && allowedRoles.includes("admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
