import { createSlice } from "@reduxjs/toolkit";
import { DataStates, NetworkStates } from "../states";

const initialState = {
  data: {},
  notesList: [],
  dirtyList: [],
  next: null,
  active: null,
  status: NetworkStates,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log("setData", action.payload);

      const data = action.payload.data;
      state.next = action.payload.meta.next;
      data.forEach((element) => {
        state.data[element.id] = element;
        state.notesList.push(element.id);
      });
      state.status = NetworkStates.COMPLETE;
    },
    setActive: (state, action) => {
      state.status = action.payload.status;
      state.active = action.payload.id;
      if (
        action.payload.status == NetworkStates.COMPLETE &&
        !action.payload.data.new_note
      ) {
        state.data[action.payload.id] = action.payload.data;
      }
    },
    setState: (state, action) => {
      state.status = action.payload;
    },
    insertNote: (state, action) => {
      state.data[`${action.payload.id}`] = action.payload;
      state.notesList.unshift(action.payload.id);
      //state.active = action.payload.id;
    },
    deleteData: (state, action) => {
      state.notesList = state.notesList.filter((x) => x != action.payload);
      delete state.data[action.payload];
    },
    updateEntry: (state, action) => {
      if (
        action.payload.status == DataStates.DIRTY &&
        !state.dirtyList.includes(action.payload.id)
      ) {
        state.dirtyList.push(action.payload.id);
      }
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
  return state.notes.notesList.map((id) => state.notes.data[id]);
};
const activeNote = (state) =>
  state.notes.active ? state.notes.data[state.notes.active] : null;

const dirtyNotes = (state) =>
  state.notes.dirtyList.map((id) => state.notes.data[id]);

export { notesList, activeNote, dirtyNotes };
