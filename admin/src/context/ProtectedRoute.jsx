import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // ❌ Token नहीं है → Login Page पर redirect
    return <Navigate to="/login" replace />;
  }

  // ✅ Token है → Dashboard या बाकी Admin pages दिखाओ
  return children;
};

export default ProtectedRoute;
