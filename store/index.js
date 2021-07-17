import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./reducers/notesSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});

export default store;
