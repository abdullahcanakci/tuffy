import { ObjectId } from "bson";
import store from "store";
import {
  insertTag,
  setData,
  setState,
  deleteTag as deleteTagAction,
} from "store/reducers/tagsSlice";
import { detachTag } from "store/reducers/notesSlice";
import { NetworkStates } from "store/states";

const { fetcher } = require("utils");

const createTag = (name) => {
  const tag = {
    id: ObjectId().toString(),
    name: name,
  };
  store.dispatch(insertTag({ tag }));
  persistTag(tag);

  return tag;
};

const persistTag = (tag) => {
  fetcher(`/api/tags/${tag.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });
};

const deleteTag = (id) => {
  store.dispatch(deleteTagAction({ tag: { id } }));
  store.dispatch(detachTag(id));
  fetcher(`/api/tags/${id}`, {
    method: "DELETE",
  });
};

const selectTag = (id) => {
  store.dispatch(selectTag(id));
};

const fetchTags = () => {
  const fn = (dispatch, getState) => {
    dispatch(setState(NetworkStates.FETCH));
    fetcher("/api/tags").then((data) => {
      dispatch(setData({ data }));
      dispatch(setState(NetworkStates.COMPLETE));
    });
  };

  store.dispatch(fn);
};

const TagService = {};
TagService.createTag = createTag;
TagService.deleteTag = deleteTag;
TagService.selectTag = selectTag;
TagService.fetchTags = fetchTags;

export default TagService;
