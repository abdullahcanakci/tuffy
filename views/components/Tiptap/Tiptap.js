import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import TiptapMenu from "./TiptapMenu";

const Tiptap = ({ className, onChange, content = [] }) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: { type: "doc", content },
    onUpdate() {
      if (typeof onChange === "function") {
        onChange(this.getJSON().content);
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent({ type: "doc", content });
  }, [content]);
  return (
    <div
      className={classNames("w-full h-full flex flex-col mx-auto", className)}
      style={{ maxWidth: "800px" }}>
      <TiptapMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
