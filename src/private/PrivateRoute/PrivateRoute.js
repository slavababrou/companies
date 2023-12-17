import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("accessToken");
  //const token = useSelector((state) => state.auth?.user?.token);

  return token ? element : <Navigate to='/authorization' />;
};

export default PrivateRoute;
