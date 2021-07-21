import classNames from "classnames";
import { useState } from "react";
import ReactQuill from "react-quill";

const Quill = ({ className }) => {
  const [value, setValue] = useState("");

  return (
    <div className={classNames("quill_container flex-1 w-full", className)}>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};

export default Quill;
