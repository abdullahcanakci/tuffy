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

const Editor = () => {
  const status = useSelector((state) => state.notes.status);
  const note = useSelector(activeNote);
  const [isDirty, setIsDirty] = useState(false);

  const [title, setTitle] = useState("");
  const titleInput = useRef(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
    } else {
      setTitle("");
    }
  }, [note]);

  const onBlur = () => {
    if (title != note.title) {
      setIsDirty(true);
    }
  };

  useEffect(() => {
    if (isDirty) {
      const handle = setTimeout(() => {
        setIsDirty(false);
        NoteService.update({ ...note, title: title });
      }, 500);
      return () => clearTimeout(handle);
    }
  }, [isDirty]);

  useEffect(() => {
    if (note?.status == DataStates.DIRTY) {
      const handle = setTimeout(() => {
        NoteService.persist(note);
      }, 2000);
      return () => clearTimeout(handle);
    }
  }, [note?.status]);

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
