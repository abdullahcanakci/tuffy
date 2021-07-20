import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = () => {
  const [value, setValue] = useState("");

  return (
    <div className="quill_container flex-1">
      <ReactQuill value={value} onChange={setValue} />
    </div>
  );
};

export default Quill;
