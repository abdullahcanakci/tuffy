import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle" | "loading" | "complete" | "failed",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    updateState: (state, action) => {
      state.status = action.payload;
    },
    insertNote: (state, action) => {
      state.data.unshift(action.payload);
    },
    deleteData: (state, action) => {
      state.data = state.data.filter((d) => d.id != action.payload);
    },
    updateEntry: (state, action) => {
      state.data = state.data.map((d) =>
        d.id == action.payload.id ? { ...action.payload, isDirty: true } : d
      );
    },
  },
});

export const { updateData, updateState, deleteData, insertNote, updateEntry } =
  notesSlice.actions;

export default notesSlice.reducer;
