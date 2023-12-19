import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRequests = createAsyncThunk(
  "requests/fetchAllRequests",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token;

      const response = await axios.get("http://localhost:3192/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allRequests = response.data;

      const companyRequests = allRequests.rows.filter(
        (request) => request.type === "company"
      );
      const userRequests = allRequests.rows.filter(
        (request) => request.type === "user"
      );

      thunkAPI.dispatch(setCompanyRequests(companyRequests));
      thunkAPI.dispatch(setUserRequests(userRequests));
    } catch (error) {
      console.error("Ошибка при загрузке запросов:", error);
      throw error;
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "requests/deleteRequest",
  async (requestId, { getState }) => {
    try {
      const token = getState().auth?.user?.token;
      await axios.delete(`http://localhost:3192/api/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return requestId;
    } catch (error) {
      throw error;
    }
  }
);
export const addRequest = createAsyncThunk(
  "requests/addCompanyRequest",
  async ({ type, userId, companyInfo }, { getState }) => {
    try {
      const token = getState().auth?.user?.token;
      const response = await axios.post(
        "http://localhost:3192/api/requests",
        {
          type,
          userId,
          companyInfo,
        },
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

const initialState = {
  companyRequests: [],
  userRequests: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addCompanyRequest: (state, action) => {
      state.companyRequests.push(action.payload);
    },
    addUserRequest: (state, action) => {
      state.userRequests.push(action.payload);
    },
    setCompanyRequests: (state, action) => {
      state.companyRequests = action.payload;
    },
    setUserRequests: (state, action) => {
      state.userRequests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteRequest.fulfilled, (state, action) => {
      const requestId = action.payload;
      state.companyRequests = state.companyRequests.filter(
        (request) => request.id !== requestId
      );
      state.userRequests = state.userRequests.filter(
        (request) => request.id !== requestId
      );
    });
  },
});

export const {
  addCompanyRequest,
  addUserRequest,
  setCompanyRequests,
  setUserRequests,
} = requestsSlice.actions;

export const selectCompanyRequests = (state) => state.requests.companyRequests;
export const selectUserRequests = (state) => state.requests.userRequests;

export default requestsSlice.reducer;
