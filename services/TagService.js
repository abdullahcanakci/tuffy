import { ObjectID } from "bson";

const { fetcher } = require("utils");

const createTag = (name) => {
  const tag = {
    id: ObjectID().toString(),
    name: name,
  };
  fetcher(`/api/tags/${tag.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });
  return tag;
};

const TagService = {};
TagService.createTag = createTag;

export default TagService;
