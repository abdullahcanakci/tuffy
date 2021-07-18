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
    toggleTag: (state, action) => {
      const { attach, id, tagId } = action.payload;
      console.log("toggleTag", { attach, id, tagId });
      if (!Array.isArray(state.data[id].tags)) {
        state.data[id].tags = [];
      }
      if (attach && !state.data[id].tags.includes(tagId)) {
        state.data[id].tags.push(tagId);
      } else {
        state.data[id].tags = state.data[id].tags.filter((t) => t != tagId);
      }
      state.data[id].status = DataStates.DIRTY;
    },
    detachTag: (state, action) => {
      const id = action.payload;

      Object.keys(state.data).map((key) => {
        if (
          state.data[key].tags &&
          state.data[key].tags.length > 0 &&
          state.data[key].tags.includes(id)
        ) {
          state.data[key].tags = state.data[key].tags.filter((t) => t != id);
        }
      });
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
  toggleTag,
  detachTag,
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
