import classNames from "classnames";
import { format } from "date-fns";
import { useMemo } from "react";
import { AlertCircle, Circle, Loader, X } from "react-feather";
import { useSelector } from "react-redux";
import { NoteService } from "services";
import { DataStates } from "store/states";
import { Menu } from "..";
import styles from "./index.module.scss";

const Note = ({ id }) => {
  const note = useSelector((state) => state.notes.data[id]);
  const date = useMemo(() => {
    if (note.updated_at) {
      return format(new Date(note.updated_at), "MM/dd/yyyy");
    }
    return null;
  }, [note.updated_at]);
  const { container, menu } = Menu.useMenu();

  const selectNote = () => {
    NoteService.selectNote(note);
  };
  const renderStatus = () => {
    if (!note.status) return <></>;
    return (
      <div className={styles.status_icon}>
        {note.status == DataStates.DIRTY && <AlertCircle />}
        {note.status == DataStates.IN_FLIGHT && (
          <Loader className="loader slow" />
        )}
      </div>
    );
  };

  if (!note) {
    return <></>;
  }

  return (
    <div className={styles.note} {...container} onClick={selectNote}>
      <div className={styles.ear}>
        {note.color && (
          <span className={styles.color} style={{ color: note.color }}>
            <Circle />
          </span>
        )}
      </div>
      <div className={styles.detail}>
        <div className="flex flex-row">
          <h3 className={classNames(styles.title, "flex-1")}>
            {note.title} {note.new_note && !note.title && <>- New Note -</>}
          </h3>
          {renderStatus()}
        </div>
        <p className={styles.abstract}>{note.abstract}</p>
        <span>{date}</span>
      </div>
      <Menu {...menu}>
        <Menu.Item
          label="Delete"
          icon={<X />}
          onClick={() => NoteService.deleteNote(note.id)}
        />
      </Menu>
    </div>
  );
};

export default Note;
