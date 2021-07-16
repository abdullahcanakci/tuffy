import classNames from "classnames";
import useNotes from "hooks/useNotes";
import { useState } from "react";
import { Filter, Plus, Search, X } from "react-feather";
import { useSelector } from "react-redux";
import { NoteService } from "services";
import { Spinner } from "..";
import styles from "./index.module.scss";
import Note from "./Note";

const NoteBar = () => {
  const notes = useSelector((state) => state.notes.data);
  const status = useSelector((state) => state.notes.status);
  const [search, setSearch] = useState("");

  const renderNotes = () => {
    if (!notes || notes.length == 0) {
      return (
        <>
          <div className="w-full h-full flex-1 flex flex-col  justify-center">
            <p className="block text-[#dddddd99] text-center">
              No notes found!
            </p>
          </div>
        </>
      );
    } else {
      return (
        <>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </>
      );
    }
  };

  const confirmEntry = () => {
    console.log(search);
  };

  const createNote = () => {
    NoteService.createNote("");
  };

  return (
    <div className={styles.notebar}>
      <div className={styles.search_box}>
        <form onSubmit={() => confirmEntry()}>
          <div className={styles.search_area}>
            <span className="btn-icon">
              <Search />{" "}
            </span>
            <input
              type="text"
              maxLength="16"
              placeholder="Search"
              autoFocus
              value={search}
              className={styles.search_input}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
              <button
                className="btn-icon"
                type="button"
                onClick={() => setSearch("")}>
                <span>
                  <X />
                </span>
              </button>
            )}
            <button
              className="btn-icon"
              type="button"
              onClick={() => setSearch("")}>
              <span>
                <Filter />
              </span>
            </button>
            <button
              type="submit"
              className={classNames(styles.quicklink_icon, "hidden")}
              onClick={() => confirmEntry}></button>
          </div>
        </form>
        <button className={styles.new_note_btn} onClick={() => createNote()}>
          <Plus />
        </button>
      </div>
      {status == "loading" ? <Spinner /> : <>{renderNotes()}</>}
    </div>
  );
};

export default NoteBar;
