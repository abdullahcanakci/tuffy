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
    RESET_STATE: (state, action) => {
      state = initialState;
    },
    PUT_DATA: (state, action) => {
      const { data, meta } = action.payload;
      state.next = meta.next;
      data.forEach((element) => {
        state.data[element.id] = element;
        state.notesList.push(element.id);
      });
      state.status = NetworkStates.COMPLETE;
    },
    SET_ACTIVE: (state, action) => {
      const { status, id, data } = action.payload;
      state.status = status;
      state.active = id;
      if (status == NetworkStates.COMPLETE && !data.new_note) {
        state.data[id] = data;
      }
    },
    SET_STATE: (state, action) => {
      state.status = action.payload;
    },
    INSERT: (state, action) => {
      const { note } = action.payload;
      state.data[`${note.id}`] = note;
      state.notesList.unshift(note.id);
    },
    DELETE: (state, action) => {
      const { id } = action.payload;
      state.notesList = state.notesList.filter((x) => x != id);
      delete state.data[id];
    },
    UPDATE: (state, action) => {
      const { note } = action.payload;
      state.data[note.id] = { ...state.data[note.id], ...note };
    },
    TOGGLE_TAG: (state, action) => {
      const { attach, id, tagId } = action.payload;
      if (!Array.isArray(state.data[id].tags)) state.data[id].tags = [];

      if (attach && !state.data[id].tags.includes(tagId)) {
        state.data[id].tags.push(tagId);
      } else {
        state.data[id].tags = state.data[id].tags.filter((t) => t != tagId);
      }
      state.data[id].status = DataStates.DIRTY;
    },
    DETACH_TAG: (state, action) => {
      const { id } = action.payload;

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
  RESET_STATE,
  PUT_DATA,
  SET_ACTIVE,
  SET_STATE,
  INSERT,
  DELETE,
  UPDATE,
  TOGGLE_TAG,
  DETACH_TAG,
} = notesSlice.actions;

export default notesSlice.reducer;

const notesList = (state) => {
  return state.notes.notesList.map((id) => state.notes.data[id]);
};
const activeNote = (state) =>
  state.notes.active ? state.notes.data[state.notes.active] : null;

export { notesList, activeNote };
