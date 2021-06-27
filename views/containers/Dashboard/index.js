import { useState } from "react";
import { NoteList, TagList, Editor } from "views/components";

const Dashboard = () => {
  const { selectedTag, setSelectedTag } = useState({});
  const { selectedNote, setSelectedNote } = useState({});

  return (
    <>
      <TagList selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <NoteList selectedTag={selectedTag} setSelectedNote={setSelectedNote} />
      <Editor selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
    </>
  );
};

export default Dashboard;
