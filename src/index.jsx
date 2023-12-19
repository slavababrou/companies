import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import AuthLayout from "./layout/Auth/AuthLayout";
import Company from "./pages/Company/Company";
import store from "./store/store";
import PrivateRoute from "./private/PrivateRoute/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import AdminsRequests from "./pages/AdminsRequests/AdminsRequests";

import { autoLoginUser } from "./store/authSlice";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: "/catalog",
    element: <PrivateRoute element={<Catalog />} />,
  },
  {
    path: "/authorization",
    element: <AuthLayout />,
  },
  {
    path: "/company/:companyId",
    element: <PrivateRoute element={<Company />} />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<Profile />} />,
  },
  {
    path: "/requests",
    element: <PrivateRoute element={<AdminsRequests />} requiredRole={2} />,
  },
]);

const App = () => {
  useEffect(() => {
    store.dispatch(autoLoginUser());
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>
);
