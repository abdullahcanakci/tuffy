import { useEffect, useState } from "react";

const { Bold, Italic, Terminal, List } = require("react-feather");
const { Icon, Button, Dropdown, IconButton } = require("..");

import {
  FaUndo,
  FaRedo,
  FaListUl,
  FaListOl,
  FaBold,
  FaItalic,
  FaStrikethrough,
} from "react-icons/fa";

const TiptapMenu = ({ editor }) => {
  if (!editor) return null;
  const [textState, setTextState] = useState({
    label: "Heading 1",
    type: "heading",
    level: 1,
  });

  const textStates = [
    {
      label: "Heading 1",
      type: "heading",
      level: 1,
      onClick: (e) => setTextState(e),
    },
    {
      label: "Heading 2",
      type: "heading",
      level: 2,
      onClick: (e) => setTextState(e),
    },
    {
      label: "Heading 3",
      type: "heading",
      level: 3,
      onClick: (e) => setTextState(e),
    },
    {
      label: "Normal",
      type: "paragraph",
      onClick: (e) => setTextState(e),
    },
  ];

  useEffect(() => {
    if (!editor) return;
    if (textState.type == "heading") {
      editor.chain().focus().toggleHeading({ level: textState.level }).run();
    } else if (textState.type == "paragraph") {
      editor.chain().focus().setParagraph().run();
    }
  }, [textState]);

  return (
    <div className="flex flex-row gap-1 items-center px-2 py-2">
      <Dropdown options={textStates} echoOption />

      <div className="flex flex-row items-center button-group">
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}>
          <FaBold />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}>
          <FaItalic />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}>
          <FaStrikethrough />
        </IconButton>
      </div>

      <div className="flex flex-row items-center button-group">
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}>
          <FaListUl />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}>
          <FaListOl />
        </IconButton>
      </div>

      <div className="flex flex-row items-center button-group">
        <IconButton onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </IconButton>
      </div>
    </div>
  );
};

export default TiptapMenu;
