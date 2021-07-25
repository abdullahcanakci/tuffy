import { useEffect, useState } from "react";
import { Dropdown, IconButton } from "..";
import {
  FaUndo,
  FaRedo,
  FaListUl,
  FaListOl,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaImage,
} from "react-icons/fa";
import { DropdownItem } from "../Button/Dropdown";

const TiptapMenu = ({ editor }) => {
  if (!editor) return null;
  const [textState, setTextState] = useState({
    label: "Heading 1",
    type: "heading",
    level: 1,
  });

  useEffect(() => {
    if (!editor) return;
    if (textState.type == "heading") {
      editor.chain().focus().toggleHeading({ level: textState.level }).run();
    } else if (textState.type == "paragraph") {
      editor.chain().focus().setParagraph().run();
    }
  }, [textState]);

  const insertImage = () => {
    editor
      .chain()
      .focus()
      .setImage({
        src: "https://images.pexels.com/photos/8817871/pexels-photo-8817871.jpeg?crop=entropy&cs=srgb&dl=pexels-kate-gundareva-8817871.jpg&fit=crop&fm=jpg&h=800&w=640",
      })
      .run();
  };

  return (
    <div className="flex flex-row gap-1 items-center py-2 sticky top-0 z-10">
      <Dropdown echoOption>
        <DropdownItem
          label="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        />
        <DropdownItem
          label="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
        />
        <DropdownItem
          label="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
        />
        <DropdownItem
          label="Normal"
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
        />
      </Dropdown>

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
        <IconButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}>
          <FaCode />
        </IconButton>
        <IconButton onClick={() => insertImage()}>
          <FaImage />
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
