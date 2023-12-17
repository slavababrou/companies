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
    const apiUrl = companyId
      ? `http://localhost:3192/api/reviev?companyId=${companyId}&limit=4&page=${list}`
      : `http://localhost:3192/api/reviev?limit=6&page=${list}`;

    try {
      const response = await axios.get(apiUrl);
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

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:3192/api/company",
        companyInfo
      );
      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  }
);

export const fetchSameCompaniesData = createAsyncThunk(
  "company/fetchSameCompaniesData",
  async (_, thunkAPI) => {
    try {
      const { companyData } = thunkAPI.getState().company;

      if (!companyData) {
        console.error("Company data is not available");
        throw new Error("Company data is not available");
      }

      const type = companyData.type;
      const id = companyData.id;

      const response = await axios.get(
        `http://localhost:3192/api/company?type=${type}`
      );

      const filteredCompanies = response.data.rows.filter(
        (company) => company.id !== id
      );

      return filteredCompanies;
    } catch (error) {
      console.error("Error fetching same companies data:", error);

      throw error;
    }
  }
);

export const addLikeDislikeReviev = createAsyncThunk(
  "company/likeDislikeReviev",
  async ({ revievId, actionType, userId }, { getState }) => {
    try {
      const userId = getState().auth.user?.user?.id;

      if (
        actionType === "like" ||
        (actionType === "dislike" && userId && revievId)
      ) {
        const response = await axios.post(
          `http://localhost:3192/api/reviev/add-like-dislike`,
          { id: revievId, actionType, userId }
        );

        return response.data;
      }
    } catch (error) {
      console.error("Error liking/disliking reviev:", error);
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
      .addCase(addLikeDislikeReviev.fulfilled, async (state, action) => {
        const { actionType, userId } = action.payload[0][0][0];
        const revievId = action.payload[0][0][0]?.id;

        const revievsDataCopy = JSON.parse(JSON.stringify(state.revievsData));

        const reviev = revievsDataCopy?.rows.find((rev) => rev.id === revievId);

        if (!revievId || !userId) return;
        const likedDisliked = await getLikedDislikedState(revievId, userId);

        if (reviev) {
          if (actionType === "like" && !likedDisliked) {
            reviev.likes += 1;
            if (likedDisliked === "liked") {
              reviev.dislikes -= 1; // Убираем дизлайк, если он был
            }
          } else if (actionType === "dislike" && !likedDisliked) {
            reviev.dislikes += 1;
            if (likedDisliked === "liked") {
              reviev.likes -= 1; // Убираем лайк, если он был
            }
          }
        }

        state.revievsData = revievsDataCopy;
      });
  },
});

async function getLikedDislikedState(revievId, userId) {
  try {
    console.log(userId, revievId);
    const response = await axios.post(
      `http://localhost:3192/api/like/check-user-liked-disliked`,
      { userId: userId, revievId: revievId }
    );

    const alreadyLikedOrDisliked = response.data?.alreadyLikedOrDisliked;
    const actionType = response.data?.actionType;

    if (actionType === "like" && alreadyLikedOrDisliked) {
      return "liked";
    } else if (actionType === "dislike" && alreadyLikedOrDisliked) {
      return "disliked";
    }

    return null;
  } catch (error) {
    console.error("Error checking user liked or disliked:", error);
    throw error;
  }
}

export const selectRevievsDataFromStore = (state) => {
  return state?.company?.revievsData;
};

export default companySlice.reducer;
