import { useEffect, useState } from "react";
import { NoteList, Editor } from "views/components";
import Sidebar from "views/components/Sidebar";

const Dashboard = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    console.log(selectedNote);
  }, [selectedNote]);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
    </div>
  );
};

export default Dashboard;
