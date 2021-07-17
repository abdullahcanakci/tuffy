import { createSlice } from "@reduxjs/toolkit";
import states from "../network";

const initialState = {
  data: {},
  active: null,
  status: states,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log("setData", action.payload);
      state.data = action.payload.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      state.status = states.COMPLETE;
    },
    setActive: (state, action) => {
      state.status = action.payload.status;
      state.active = action.payload.id;
      if (
        action.payload.status == states.COMPLETE &&
        !action.payload.data.new_note
      ) {
        state.data[action.payload.id] = action.payload.data;
      }
    },
    setState: (state, action) => {
      state.status = action.payload;
    },
    insertNote: (state, action) => {
      state.data = { [`${action.payload.id}`]: action.payload, ...state.data };
      state.active = action.payload.id;
    },
    deleteData: (state, action) => {
      delete state.data[action.payload.id];
    },
    updateEntry: (state, action) => {
      state.data[action.payload.id] = action.payload;
    },
  },
});

export const {
  updateData,
  setState,
  deleteData,
  insertNote,
  updateEntry,
  setActive,
  setData,
} = notesSlice.actions;

export default notesSlice.reducer;

const notesList = (state) => {
  return Object.values(state.notes.data);
};
const activeNote = (state) =>
  state.notes.active ? state.notes.data[state.notes.active] : null;

export { notesList, activeNote };
