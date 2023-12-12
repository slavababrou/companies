import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import AuthLayout from "./layout/Auth/AuthLayout";
import Company from "./pages/Company/Company";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from "./private/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/authorization",
    element: <AuthLayout />,
  },
  {
    path: "/company/:companyId",
    element: <Company />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
