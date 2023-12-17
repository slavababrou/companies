import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import AuthLayout from "./layout/Auth/AuthLayout";
import Company from "./pages/Company/Company";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from "./private/PrivateRoute/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import AdminsRequests from "./pages/AdminsRequests/AdminsRequests";
import { autoLoginUser } from "./store/authSlice";

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
    element: <PrivateRoute element={<AdminsRequests />} />,
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
