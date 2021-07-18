import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./reducers/notesSlice";
import tagsSlice from "./reducers/tagsSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice,
    tags: tagsSlice,
  },
});

export default store;
