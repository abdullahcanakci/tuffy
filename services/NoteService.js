import { ObjectID } from "bson";

const { fetcher } = require("utils");

const createNote = (name) => {
  const note = {
    id: ObjectID(),
    name: name,
  };
  fetcher(`/api/notes/${note.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return tag;
};

const deleteNote = (id) => {
  fetcher(`/api/notes/${id}`, {
    method: "DELETE",
  });
};

const NoteService = {};
NoteService.createNote = createNote;
NoteService.deleteNote = deleteNote;

export default NoteService;
