import { ObjectID } from "bson";
import { formatISO } from "date-fns";
import store from "store";
import {
  INSERT,
  UPDATE,
  SET_STATE,
  PUT_DATA,
  SET_ACTIVE,
  DELETE,
  TOGGLE_TAG,
} from "store/reducers/notesSlice";
import { NetworkStates, DataStates } from "store/states";
import { fetcher } from "utils";

const create = (title) => {
  const note = {
    id: ObjectID().toString(),
    title: "",
    created_at: formatISO(new Date()),
    updated_at: formatISO(new Date()),
    new_note: true,
  };

  store.dispatch(INSERT({ note }));
  select(note);

  return note;
};

const update = (note) => {
  store.dispatch(UPDATE({ note: { ...note, status: DataStates.DIRTY } }));
};

const persist = (note) => {
  store.dispatch(UPDATE({ note: { ...note, status: DataStates.IN_FLIGHT } }));
  fetcher(`/api/notes/${note.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }).then((data) => {
    store.dispatch(UPDATE({ note: { ...note, status: DataStates.PERSISTED } }));
  });
};

const toggleTag = (id, tagId, attach = true) => {
  store.dispatch(TOGGLE_TAG({ id, tagId, attach }));
};

const deleteNote = (id) => {
  const fn = (dispatch, getState) => {
    dispatch(DELETE({ id }));
    return fetcher(`/api/notes/${id}`, {
      method: "DELETE",
    });
  };
  store.dispatch(fn);
};

const select = (note) => {
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
        persist(note);
      }
    }
    dispatch(
      SET_ACTIVE({
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
          SET_ACTIVE({ id: note.id, status: NetworkStates.COMPLETE, data })
        );
      });
    }
  };
  store.dispatch(fn);
};

const fetch = (refetch = false) => {
  const fn = (dispatch, getState) => {
    const state = getState();
    if (state.notes.next == null && refetch == false) {
      return;
    }
    dispatch(
      SET_STATE(
        state.notes.next ? NetworkStates.FETCH_MORE : NetworkStates.FETCH
      )
    );
    fetcher("/api/notes?" + state.notes.next).then((data) => {
      dispatch(PUT_DATA(data));
    });
  };
  store.dispatch(fn);
};

const NoteService = {
  create,
  delete: deleteNote,
  fetch,
  persist,
  select,
  toggleTag,
  update,
};

export default NoteService;
