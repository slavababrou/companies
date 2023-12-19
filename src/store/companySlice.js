// companySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanyData = createAsyncThunk(
  "company/fetchCompanyData",
  async (companyId, { getState }) => {
    try {
      const token = getState().auth?.user?.token;
      if (token) {
        const response = await axios.get(
          `http://localhost:3192/api/company/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      throw error;
    }
  }
);

//добавить лимит
export const fetchAllCompaniesData = createAsyncThunk(
  "company/fetchAllCompaniesData",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token;
      if (token) {
        const response = await axios.get("http://localhost:3192/api/company", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching all companies data:", error);
      throw error;
    }
  }
);

export const fetchRevievsData = createAsyncThunk(
  "company/fetchRevievsData",
  async ({ companyId, list }, { getState }) => {
    const apiUrl = companyId
      ? `http://localhost:3192/api/reviev?companyId=${companyId}&limit=4&page=${list}`
      : `http://localhost:3192/api/reviev?limit=6&page=${list}`;

    try {
      const token = getState().auth?.user?.token;
      if (token) {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching revievs data:", error);
      throw error;
    }
  }
);

export const addReviev = createAsyncThunk(
  "company/addReviev",
  async ({ revievData }, { getState }) => {
    try {
      const token = getState().auth?.user?.token;
      if (token) {
        const response = await axios.post(
          `http://localhost:3192/api/reviev`,
          revievData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      }
    } catch (error) {
      console.error("Error adding reviev:", error);
      throw error;
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyInfo, { getState }) => {
    try {
      const token = getState().auth?.user?.token;
      const response = await axios.post(
        "http://localhost:3192/api/company",
        companyInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  }
);

//Добавить лимит в 5шт
export const fetchSameCompaniesData = createAsyncThunk(
  "company/fetchSameCompaniesData",
  async (_, thunkAPI) => {
    try {
      const { companyData } = thunkAPI.getState().company;
      const token = thunkAPI.getState().auth?.user?.token;

      if (companyData && token) {
        const type = companyData?.type;
        const id = companyData?.id;

        const response = await axios.get(
          `http://localhost:3192/api/company?type=${type}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredCompanies = response.data.rows.filter(
          (company) => company.id !== id
        );

        return filteredCompanies;
      }
    } catch (error) {
      console.error("Error fetching same companies data:", error);

      throw error;
    }
  }
);

export const addLikeDislikeReviev = createAsyncThunk(
  "company/likeDislikeReviev",
  async ({ revievId, actionType }, { getState }) => {
    try {
      const userId = getState().auth.user?.user?.id;
      const token = getState().auth?.user?.token;

      if (
        actionType === "like" ||
        (actionType === "dislike" && userId && revievId)
      ) {
        const response = await axios.post(
          `http://localhost:3192/api/reviev/add-like-dislike`,
          { id: revievId, actionType, userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      }
    } catch (error) {
      console.error("Ошибка при лайке/дизлайке отзыва: оценка уже стоит");
      throw error;
    }
  }
);
//для получения сос-ия лайка(этот ли юзер лайкнул/дизлайкнул)
export const checkUserLikedDisliked = createAsyncThunk(
  "company/checkUserLikedDisliked",
  async ({ userId, revievId }, { getState }) => {
    try {
      const token = getState().auth?.user?.token;
      const response = await axios.post(
        "http://localhost:3192/api/like/check-user-liked-disliked",
        { userId, revievId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error checking user liked or disliked:", error);
      throw error;
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: null,
    revievsData: null,
    allCompaniesData: null,
    sameCompaniesData: null,
    isLoading: false,
  },
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
      })
      .addCase(fetchSameCompaniesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSameCompaniesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sameCompaniesData = action.payload;
      })
      .addCase(fetchSameCompaniesData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyData = action.payload;
      })
      .addCase(createCompany.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllCompaniesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCompaniesData = action.payload;
      })
      .addCase(addLikeDislikeReviev.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedReviev = action.payload[0][0][0];
        if (state.revievsData) {
          const updatedRevievs = state.revievsData.rows.map((reviev) =>
            reviev.id === updatedReviev.id ? updatedReviev : reviev
          );
          state.revievsData.rows = updatedRevievs;
        }
      });
  },
});

export const selectRevievsDataFromStore = (state) => {
  return state?.company?.revievsData;
};

export const selectAllCompaniesDataFromStore = (state) => {
  return state?.company?.allCompaniesData?.rows;
};

export default companySlice.reducer;
