import { ObjectID } from "bson";

const { fetcher } = require("utils");

const createTag = (name) => {
  const tag = {
    id: ObjectID(),
    name: name,
  };
  
  return tag;
};

const persistNote = (tag) => {
    fetcher(`/api/tags/${tag.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag),
      });
}

const deleteTag = (id) => {
  fetcher(`/api/tags/${id}`, {
    method: "DELETE",
  });
};

const TagService = {};
TagService.createTag = createTag;
TagService.deleteTag = deleteTag;

export default TagService;
