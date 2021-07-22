import Toolbar from "./Toolbar";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { Spinner } from "..";
import { useEffect, useRef, useState } from "react";
import Icon from "../Button/Icon";
import { X } from "react-feather";
import { NoteService } from "services";
import { activeNote } from "store/reducers/notesSlice";
import { DataStates } from "store/states";
import Tiptap from "../Tiptap";

const Editor = () => {
  const status = useSelector((state) => state.notes.status);
  const note = useSelector(activeNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [initialState, setInitialState] = useState({ title: "", content: [] });
  const titleInput = useRef(null);

  const onBlur = () => {
    if (title != note.title) {
      NoteService.update({ ...note, title });
    }
  };

  useEffect(() => {
    if (!note) {
      setTitle("");
      setContent([]);
      return;
    }
    console.log("test");
    setTitle(note.title ?? "");
    setContent(note.content ?? []);
  }, [note?.id]);

  useEffect(() => {
    if (!note) return;

    const timeout = setTimeout(() => {
      console.log("interval", note);
      if (note.status !== DataStates.DIRTY) return;
      NoteService.persist(note);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [note?.status]);

  const onContentChange = (content) => {
    NoteService.update({ ...note, content });
    setContent(content);
  };

  const renderEditor = () => {
    return (
      <div>
        <Toolbar />
        <div className={styles.main_area}>
          <div className={styles.hero}>
            <div className={styles.hero_title}>
              <input
                type="text"
                spellCheck={false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ref={titleInput}
                onBlur={onBlur}
              />
              {title.length > 0 && titleInput.current && (
                <Icon icon={<X />} onClick={(e) => setTitle("")} />
              )}
            </div>
          </div>
        </div>
        <Tiptap
          className="px-4 py-2"
          content={content}
          onChange={onContentChange}
        />
      </div>
    );
  };

  const renderCallToAction = () => {
    return (
      <>
        <div className="w-full h-full flex-1 flex flex-col  justify-center">
          <p className="block text-[#dddddd99] text-center">
            Yeni bir not oluşturun!
          </p>
        </div>
      </>
    );
  };
  return (
    <div className={styles.editor}>
      {!note && renderCallToAction()}
      {note && renderEditor()}
    </div>
  );
};

export default Editor;
