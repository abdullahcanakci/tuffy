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
import { ImagePicker } from "components";

const TiptapMenu = ({ editor }) => {
  if (!editor) return null;
  const [visible, setVisible] = useState(false);
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

  const insertImage = (image) => {
    setVisible(false);
    editor
      .chain()
      .focus()
      .setImage({
        src: image.url,
        id: image.id,
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
        <IconButton onClick={() => setVisible(true)}>
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
      <ImagePicker
        visible={visible}
        onCancel={() => setVisible(false)}
        onSelect={(image) => insertImage(image)}
      />
    </div>
  );
};

export default TiptapMenu;
