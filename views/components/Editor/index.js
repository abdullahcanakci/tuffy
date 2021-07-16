import Toolbar from "./Toolbar";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { Spinner } from "..";
import { useEffect, useRef, useState } from "react";
import Icon from "../Button/Icon";
import { X } from "react-feather";
import { NoteService } from "services";

const Editor = () => {
  const status = useSelector((state) => state.note.status);
  const note = useSelector((state) => state.note.data);

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

  useEffect(() => {
    if (note) {
      const handle = setInterval(() => {
        NoteService.storeNote({ ...note, title: title });
      }, 2000);
      return () => clearInterval(handle);
    }
  }, [note, title]);

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

  console.log(note);
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
      {status == 0 && renderCallToAction()}
      {status == 1 && renderLoading()}
      {note && renderEditor()}
    </div>
  );
};

export default Editor;
