import { useEffect } from "react";
import NoteList from "views/components/NoteList";
import Sidebar from "views/components/Sidebar";
import { Editor } from "views/components/Editor";
import { NoteService } from "services";
import { TagService } from "services";

const Dashboard = () => {
  useEffect(() => {
    NoteService.fetch(true);
    TagService.fetch();
  }, []);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <NoteList />
      <Editor />
    </div>
  );
};

export default Dashboard;
