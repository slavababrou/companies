// companySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanyData = createAsyncThunk(
  "company/fetchCompanyData",
  async (companyId) => {
    try {
      const response = await axios.get(
        `http://localhost:3192/api/company/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
      throw error;
    }
  }
);

export const fetchRevievsData = createAsyncThunk(
  "company/fetchRevievsData",
  async ({ companyId, list }) => {
    try {
      const response = await axios.get(
        `http://localhost:3192/api/reviev?companyId=${companyId}&limit=4&page=${list}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching revievs data:", error);
      throw error;
    }
  }
);

export const addReviev = createAsyncThunk(
  "company/addReviev",
  async ({ revievData }) => {
    try {
      const response = await axios.post(
        `http://localhost:3192/api/reviev`,
        revievData
      );

      return response.data;
    } catch (error) {
      console.error("Error adding reviev:", error);
      throw error;
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: null,
    revievsData: null,
    sameCompaniesData: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyData = action.payload;
      })
      .addCase(fetchCompanyData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRevievsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevievsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revievsData = action.payload;
      })
      .addCase(fetchRevievsData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addReviev.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReviev.fulfilled, (state) => {
        if (state.revievsData) {
          state.revievsData.count += 1;
        }
        state.isLoading = false;
      })
      .addCase(addReviev.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default companySlice.reducer;
