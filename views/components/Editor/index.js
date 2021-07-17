import Toolbar from "./Toolbar";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { Spinner } from "..";
import { useEffect, useRef, useState } from "react";
import Icon from "../Button/Icon";
import { X } from "react-feather";
import { NoteService } from "services";
import { activeNote } from "store/reducers/notesSlice";
import states from "store/network";

const Editor = () => {
  const status = useSelector((state) => state.notes.status);
  const note = useSelector(activeNote);
  const [isDirty, setIsDirty] = useState(false);

  const [title, setTitle] = useState("");
  const titleInput = useRef(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      titleInput.current.focus();
    } else {
      setTitle("");
    }
  }, [note]);

  const onBlur = () => {
    if (title != note.title) {
      isDirty = true;
    }
  };

  useEffect(() => {
    if (note) {
      const handle = setInterval(() => {
        NoteService.storeNote({ ...note, title: title });
      }, 2000);
      return () => clearInterval(handle);
    }
  }, [note, isDirty]);

  const renderEditor = () => {
    return (
      <div>
        <Toolbar tags={note?.tags} />
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
  const renderLoading = () => {
    return <Spinner />;
  };

  return (
    <div className={styles.editor}>
      {!note && renderCallToAction()}
      {note && renderEditor()}
    </div>
  );
};

export default Editor;
