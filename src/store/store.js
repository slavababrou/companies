import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import companyReducer from "./companySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    company: companyReducer,
  },
});

export default store;
// store.js

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// // Функция для загрузки сохраненных данных пользователя из localStorage
// const loadUserFromLocalStorage = () => {
//   try {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     return storedUser || null;
//   } catch (error) {
//     console.error("Error loading user from localStorage", error);
//     return null;
//   }
// };

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   preloadedState: {
//     auth: {
//       isAuthenticated: false,
//       user: loadUserFromLocalStorage(),
//       isLoading: false,
//     },
//   },
// });

// // Слушаем изменения в store и сохраняем данные пользователя в localStorage
// store.subscribe(() => {
//   const { auth } = store.getState();
//   localStorage.setItem("user", JSON.stringify(auth.user));
// });

// export default store;
