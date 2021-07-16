import { ObjectID } from "bson";
import { formatISO } from "date-fns";
import store from "store";
import {
  deleteData,
  insertNote,
  updateData,
  updateState,
} from "store/reducers/notesSlice";

const { fetcher } = require("utils");

const createNote = (title) => {
  const note = {
    id: ObjectID().toString(),
    title,
    date: formatISO(new Date())
  };

  store.dispatch(insertNote(note));

  fetcher(`/api/notes/${note.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return note;
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

const fetchAll = () => {
  const fn = (dispatch, getState) => {
    dispatch(updateState("loading"));
    fetcher("/api/notes", { method: "GET" }).then((data) => {
      console.log("all", data);
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

export default NoteService;
