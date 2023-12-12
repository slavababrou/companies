import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to='/authorization' />;
};

export default PrivateRoute;
