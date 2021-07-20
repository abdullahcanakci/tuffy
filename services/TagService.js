import { ObjectID } from "bson";
import store from "store";
import { INSERT, PUT_DATA, SET_STATE, DELETE } from "store/reducers/tagsSlice";
import { DETACH_TAG } from "store/reducers/notesSlice";
import { NetworkStates } from "store/states";

const { fetcher } = require("utils");

const create = (name) => {
  const tag = {
    id: ObjectID().toString(),
    name: name,
  };
  store.dispatch(INSERT({ tag }));
  persist(tag);

  return tag;
};

const persist = (tag) => {
  fetcher(`/api/tags/${tag.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });
};

const deleteTag = (id) => {
  store.dispatch(DELETE({ tag: { id } }));
  store.dispatch(DETACH_TAG({ id }));
  fetcher(`/api/tags/${id}`, {
    method: "DELETE",
  });
};

const select = (id) => {
  store.dispatch(selectTag(id));
};

const fetch = () => {
  const fn = (dispatch, getState) => {
    dispatch(SET_STATE(NetworkStates.FETCH));
    fetcher("/api/tags").then((data) => {
      dispatch(PUT_DATA({ data }));
      dispatch(SET_STATE(NetworkStates.COMPLETE));
    });
  };

  store.dispatch(fn);
};

const TagService = { create, persist, delete: deleteTag, select, fetch };

export default TagService;
