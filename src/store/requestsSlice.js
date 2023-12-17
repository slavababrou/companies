import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRequests = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3192/api/requests");
    const allRequests = response.data;

    const companyRequests = allRequests.rows.filter(
      (request) => request.type === "company"
    );
    const userRequests = allRequests.rows.filter(
      (request) => request.type === "user"
    );

    dispatch(setCompanyRequests(companyRequests));
    dispatch(setUserRequests(userRequests));
  } catch (error) {
    console.error("Ошибка при загрузке запросов:", error);
  }
};

export const deleteRequest = createAsyncThunk(
  "requests/deleteRequest",
  async (requestId) => {
    try {
      await axios.delete(`http://localhost:3192/api/requests/${requestId}`);
      return requestId;
    } catch (error) {
      throw error;
    }
  }
);
export const addRequest = createAsyncThunk(
  "requests/addCompanyRequest",
  async ({ type, userId, companyInfo }) => {
    try {
      const response = await axios.post("http://localhost:3192/api/requests", {
        type,
        userId,
        companyInfo,
      });
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
