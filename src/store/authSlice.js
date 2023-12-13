import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Создаем асинхронное действие (thunk) для процесса входа
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3192/api/user/login",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      // Важно: возвращайте данные из тела ответа, не весь объект response
      return response.data;
    } catch (error) {
      // Если возникла ошибка, вы можете ее обработать здесь
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData) => {
    try {
      const response = await axios.put(
        "http://localhost:3192/api/user",
        userData
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
