import { ObjectID } from "bson";
import store from "store";
import { insertTag, setData, setState } from "store/reducers/tagsSlice";
import { NetworkStates } from "store/states";

const { fetcher } = require("utils");

const createTag = (name) => {
  const tag = {
    id: ObjectID(),
    name: name,
  };
  store.dispatch(insertTag(tag));
  persistNote(tag);

  return tag;
};

const persistNote = (tag) => {
  fetcher(`/api/tags/${tag.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });
};

const deleteTag = (id) => {
  store.dispatch(deleteTag(id));
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
    fetcher("/api/tags").than((data) => {
      dispatch(setData(data));
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
