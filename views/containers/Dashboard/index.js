import { useState } from "react";
import { NoteList, TagList, Editor } from "views/components";

const Dashboard = () => {
  const { selectedTag, setSelectedTag } = useState({});
  const { selectedNote, setSelectedNote } = useState({});

  return (
    <div className="flex flex-row">
      <TagList selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <NoteList selectedTag={selectedTag} setSelectedNote={setSelectedNote} />
      <Editor selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
    </div>
  );
};

export default Dashboard;
