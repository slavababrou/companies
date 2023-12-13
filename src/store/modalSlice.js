import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalActive: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalActive = true;
    },
    closeModal: (state) => {
      state.isModalActive = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
