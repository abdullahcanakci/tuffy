import { useEffect, useState } from "react";
import NoteBar from "views/components/NoteBar";
import Sidebar from "views/components/Sidebar";
import Editor from "views/components/Editor";

const Dashboard = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    console.log(selectedNote);
  }, [selectedNote]);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <NoteBar />
      <Editor />
    </div>
  );
};

export default Dashboard;
