import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./reducers/noteSlice";
import notesSlice from "./reducers/notesSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice,
    note: noteSlice,
  },
});

export default store;
