import { useEffect, useState } from "react";
import NoteBar from "views/components/NoteBar";
import Sidebar from "views/components/Sidebar";
import Editor from "views/components/Editor";
import { NoteService } from "services";

const Dashboard = () => {
  useEffect(() => {
    NoteService.fetchAll(true);
  }, []);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <NoteBar />
      <Editor />
    </div>
  );
};

export default Dashboard;
