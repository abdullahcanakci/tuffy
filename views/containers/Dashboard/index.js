import { useEffect, useState } from "react";
import NoteBar from "views/components/NoteBar";
import Sidebar from "views/components/Sidebar";
import Editor from "views/components/Editor";
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
      <NoteBar />
      <Editor />
    </div>
  );
};

export default Dashboard;
