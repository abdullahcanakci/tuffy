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

import { NetworkStates, DataStates } from "store/states";

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
  selectNote(note);

  return note;
};

const storeNote = (note) => {
  store.dispatch(updateEntry({ ...note, status: DataStates.DIRTY }));
};

const persistNote = (note) => {
  store.dispatch(updateEntry({ ...note, status: DataStates.IN_FLIGHT }));
  fetcher(`/api/notes/${note.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }).then((data) => {
    store.dispatch(updateEntry({ ...note, status: DataStates.PERSISTED }));
  });
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
  const fn = (dispatch, getState) => {
    const state = getState();
    if (state.notes.active) {
      const note = state.notes.data[state.notes.active];
      if (!note) {
        // After a note is deleted a selectEvent might fire
        // We should check against it and
        // if there is no active note to switch in memory we should bail!
        return;
      }
      if (note.status == DataStates.DIRTY) {
        persistNote(note);
      }
    }
    dispatch(
      setActive({
        id: note.id,
        status: note.new_note
          ? NetworkStates.COMPLETE
          : NetworkStates.FETCH_ONE,
        data: note,
      })
    );
    if (!note.new_note) {
      fetcher(`/api/notes/${note.id}`, { method: "GET" }).then((data) => {
        store.dispatch(
          setActive({ id: note.id, status: NetworkStates.COMPLETE, data })
        );
      });
    }
  };
  store.dispatch(fn);
};

const fetchAll = (refetch = false) => {
  const fn = (dispatch, getState) => {
    const state = getState();
    if (state.notes.next == null && refetch == false) {
      return;
    }
    dispatch(
      setState(
        state.notes.next ? NetworkStates.FETCH_MORE : NetworkStates.FETCH
      )
    );
    fetcher("/api/notes?" + state.notes.next).then((data) => {
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
NoteService.persistNote = persistNote;

export default NoteService;
