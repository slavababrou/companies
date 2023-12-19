import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ formData, rememberMe }) => {
    try {
      const response = await axios.post(
        "http://localhost:3192/api/user/login",
        formData
      );

      if (rememberMe) localStorage.setItem("accessToken", response.data.token);

      return response.data;
    } catch (error) {
      throw error?.response?.data?.info;
    }
  }
);

export const autoLoginUser = createAsyncThunk(
  "auth/autoLoginUser",
  async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return;
      }

      const response = await axios.post(
        "http://localhost:3192/api/user/login",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { getState }) => {
    try {
      const token = getState().auth?.user?.token;

      const response = await axios.put(
        "http://localhost:3192/api/user",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, oldPassword, newPassword }, { getState }) => {
    try {
      const token = getState().auth?.user?.token;

      const response = await axios.post(
        "http://localhost:3192/api/user/change-password",
        { userId, oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    try {
      await axios.post("http://localhost:3192/api/user/register", formData);
      return { success: true };
    } catch (error) {
      throw error.response.data;
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
      localStorage.removeItem("accessToken");
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
        state.user.user = action.payload;
      })
      .addCase(autoLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(autoLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(autoLoginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const getRoleString = (roleId) => {
  switch (roleId) {
    case 1:
      return "user";
    case 2:
      return "admin";
    case 3:
      return "manager";
    default:
      return "Неизвестная роль";
  }
};

export const selectUserRoleString = (state) => {
  const roleId = state.auth?.user?.user?.roleId;
  return getRoleString(roleId);
};
export const selectUserRole = (state) => state.auth.user.user.roleId;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
