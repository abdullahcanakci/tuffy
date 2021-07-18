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
    setData: (state, action) => {
      const data = action.payload.data;
      data.forEach((element) => {
        state.data[element.id] = element;
        state.tagsList.push(element.id);
      });
      state.status = NetworkStates.COMPLETE;
    },
    setActive: (state, action) => {
      state.active = action.payload.id;
    },
    setState: (state, action) => {
      state.status = action.payload.status;
    },
    insertTag: (state, action) => {
      state.data[action.payload.tag.id] = action.payload.tag;
      state.tagsList.unshift(action.payload.tag.id);
    },
    deleteTag: (state, action) => {
      delete state.data[action.payload.tag.id];
      state.tagsList = state.tagsList.filter((x) => action.payload.tag.id != x);
    },
  },
});

export const { setData, setState, setActive, insertTag, deleteTag } =
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
