import { configureStore } from "@reduxjs/toolkit";
import imagesSlice from "./reducers/imagesSlice";
import notesSlice from "./reducers/notesSlice";
import tagsSlice from "./reducers/tagsSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice,
    tags: tagsSlice,
    user: userSlice,
    images: imagesSlice,
  },
});

export default store;
