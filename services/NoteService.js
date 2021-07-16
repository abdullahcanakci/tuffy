import { ObjectID } from "bson";
import { formatISO } from "date-fns";
import store from "store";
import {
  deleteData,
  insertNote,
  updateData,
  updateState,
  updateEntry,
} from "store/reducers/notesSlice";

import {
  updateState as updateNoteState,
  setData as setSelectedNote,
} from "store/reducers/noteSlice";

const { fetcher } = require("utils");

const createNote = (title) => {
  const note = {
    id: ObjectID().toString(),
    title: "",
    created_at: formatISO(new Date()),
    updated_at: formatISO(new Date()),
    new_note: true,
  };

  store.dispatch(insertNote(note));
  store.dispatch(setSelectedNote(note));

  return note;
};

const storeNote = (note) => {
  /* fetcher(`/api/notes/${note.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }); */
  store.dispatch(updateEntry(note));
};

const deleteNote = (id) => {
  const fn = (dispatch, getState) => {
    dispatch(deleteData(id));
    return fetcher(`/api/notes/${id}`, {
      method: "DELETE",
    });
  };
  store.dispatch(fn);
};

const selectNote = (note) => {
  store.dispatch(updateNoteState("loading"));

  fetcher(`/api/notes/${note.id}`, { method: "GET" }).then((data) => {
    store.dispatch(setSelectedNote(data));
  });
};

const fetchAll = () => {
  const fn = (dispatch, getState) => {
    dispatch(updateState("loading"));
    fetcher("/api/notes", { method: "GET" }).then((data) => {
      dispatch(updateData(data));
      dispatch(updateState("complete"));
    });
  };
  store.dispatch(fn);
};

const NoteService = {};
NoteService.createNote = createNote;
NoteService.deleteNote = deleteNote;
NoteService.fetchAll = fetchAll;
NoteService.selectNote = selectNote;
NoteService.storeNote = storeNote;

export default NoteService;
