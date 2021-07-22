import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import { useEffect } from "react";
import TiptapMenu from "./TiptapMenu";

const Tiptap = ({ className, onChange, content = [] }) => {
  const editor = useEditor({
    extensions: [StarterKit],
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
    <div className={classNames("w-full flex flex-col", className)}>
      <TiptapMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
