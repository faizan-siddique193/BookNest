import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/sign-in" />;
  return children;
};

export default ProtectedRoute;
