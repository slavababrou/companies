import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requiredRole }) => {
  const user = useSelector((state) => state.auth?.user?.user);

  //  Два токена, для реализации ф-ии "запомнить меня", тогда токен мы храним в localeStorage
  // иначе - в state
  const token1 = localStorage.getItem("accessToken");
  const token2 = useSelector((state) => state.auth?.user?.token);

  if (!(token1 || token2)) return <Navigate to='/authorization' />;

  if (requiredRole && user?.roleId !== requiredRole) {
    return (
      <h1 style={{ textAlign: "center", fontSize: "32px", marginTop: "10%" }}>
        У вашей роли нет доступа к этому адресу
      </h1>
    );
  }

  return element;
};

export default PrivateRoute;
