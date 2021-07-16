import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle" | "loading" | "complete" | "failed" | "saving",
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.status = "complete";
    },
    resetData: (state) => {
      state.data = null;
      state.status = "complete";
    },
    updateState: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setData, resetData, updateState } = noteSlice.actions;

export default noteSlice.reducer;
