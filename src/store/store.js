import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import companyReducer from "./companySlice";
import userReducer from "./userSlice";
import requestsReducer from "./requestsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    company: companyReducer,
    user: userReducer,
    requests: requestsReducer,
  },
});

export default store;
