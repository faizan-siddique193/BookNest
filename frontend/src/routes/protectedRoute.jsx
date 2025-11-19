import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [logedInUser, setLogedInUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLogedInUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!logedInUser)
    return <Navigate to="/sign-in" />;
  return children;
};

export default ProtectedRoute;
