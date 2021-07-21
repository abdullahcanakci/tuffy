import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import { FaCircle } from "react-icons/fa";
import { Card, IconButton } from "..";
import TiptapMenu from "./TiptapMenu";

const Tiptap = ({ className }) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    content: "<p>Hello world</p>",
  });
  return (
    <div className={classNames("w-full flex flex-col", className)}>
      <TiptapMenu editor={editor} />
      <EditorContent editor={editor} />
      {editor && (
        <BubbleMenu editor={editor}>
          <div className="flex flex-row items-center button-group">
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color: "red" }).run()
              }>
              <FaCircle />
            </IconButton>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default Tiptap;
