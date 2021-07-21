import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapMenu from "./TiptapMenu";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hellor world</p>",
  });

  return (
    <div className="w-full flex flex-col">
      <TiptapMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
