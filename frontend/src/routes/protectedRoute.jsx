import { auth } from "./auth/auth.js";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}