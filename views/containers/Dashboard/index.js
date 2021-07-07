import { useEffect, useState } from "react";
import { NoteList, TagList, Editor } from "views/components";

const Dashboard = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    console.log(selectedNote);
  }, [selectedNote]);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <TagList selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      {/* <NoteList selectedTag={selectedTag} setSelectedNote={setSelectedNote} />
      <Editor selectedNote={selectedNote} setSelectedNote={setSelectedNote} /> */}
    </div>
  );
};

export default Dashboard;
