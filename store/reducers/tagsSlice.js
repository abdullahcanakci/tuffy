import { createSlice } from "@reduxjs/toolkit";
import { NetworkStates } from "store/states";

const initialState = {
  data: {},
  tagsList: [],
  active: null,
  status: NetworkStates,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    PUT_DATA: (state, action) => {
      const data = action.payload.data;
      data.forEach((element) => {
        state.data[element.id] = element;
        state.tagsList.push(element.id);
      });
      state.status = NetworkStates.COMPLETE;
    },
    SET_ACTIVE: (state, action) => {
      state.active = action.payload.id;
    },
    SET_STATE: (state, action) => {
      state.status = action.payload.status;
    },
    INSERT: (state, action) => {
      const { tag } = action.payload;
      state.data[tag.id] = tag;
      state.tagsList.unshift(tag.id);
    },
    DELETE: (state, action) => {
      const { tag } = action.payload;
      delete state.data[tag.id];
      state.tagsList = state.tagsList.filter((x) => tag.id != x);
    },
  },
});

export const { PUT_DATA, SET_STATE, SET_ACTIVE, INSERT, DELETE } =
  tagsSlice.actions;

export default tagsSlice.reducer;

const tagsList = (state) =>
  state.tags.tagsList.map((id) => state.tags.data[id]);

const tagSearch = (query) => (state) => {
  if (query == "") return [];
  return Object.values(state.tags.data)
    .filter((tag) => tag.name.includes(query))
    .map((tag) => tag.id);
};

export { tagsList, tagSearch };
