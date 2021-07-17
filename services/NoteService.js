import { ObjectID } from "bson";
import { formatISO } from "date-fns";
import store from "store";
import {
  deleteData,
  insertNote,
  updateEntry,
  setActive,
  setState,
  setData,
} from "store/reducers/notesSlice";

import states from "store/network";

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

  return note;
};

const storeNote = (note) => {
  fetcher(`/api/notes/${note.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
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
  store.dispatch(
    setActive({
      id: note.id,
      status: note.new_note ? states.COMPLETE : states.FETCH_ONE,
      data: note,
    })
  );
  if (!note.new_note) {
    fetcher(`/api/notes/${note.id}`, { method: "GET" }).then((data) => {
      store.dispatch(setActive({ id: note.id, status: states.COMPLETE, data }));
    });
  }
};

const fetchAll = () => {
  const fn = (dispatch, getState) => {
    dispatch(setState(states.FETCH));
    fetcher("/api/notes", { method: "GET" }).then((data) => {
      dispatch(setData(data));
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
