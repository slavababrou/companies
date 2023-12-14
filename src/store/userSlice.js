import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Создаем асинхронное действие (thunk) для получения пользователя по ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { getState }) => {
    try {
      const token = getState().auth.user?.token;
      if (!token) {
        throw new Error("Токен недоступен");
      }

      const response = await axios.get(
        `http://localhost:3192/api/user/${userId}`,
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

// Создаем асинхронное действие (thunk) для получения массива пользователей по массиву ID
export const fetchUsersByIds = createAsyncThunk(
  "user/fetchUsersByIds",
  async (userIds) => {
    try {
      const response = await axios.get("http://localhost:3192/api/user");
      return response.data.filter((item) => userIds.includes(item.id));
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users[action.payload.id] = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUsersByIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersByIds.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload.forEach((user) => {
          state.users[user.id] = user;
        });
      })
      .addCase(fetchUsersByIds.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Selector to get a user by ID
export const selectUserById = (state, userId) => {
  return state[userId];
};

export default userSlice.reducer;
