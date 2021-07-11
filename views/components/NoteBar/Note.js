import { format } from "date-fns";
import useNotes from "hooks/useNotes";
import { useMemo } from "react";
import { Circle, X } from "react-feather";
import { Menu } from "..";
import styles from "./index.module.scss";

const Note = ({ note }) => {
  const date = useMemo(() => {
    if (note.date) {
      return format(new Date(note.date), "MM/dd/yyyy");
    }
    return null;
  }, [note.date]);
  const { container, menu } = Menu.useMenu();
  const { deleteNote } = useNotes();

  return (
    <div className={styles.note} {...container}>
      <div className={styles.ear}>
        {note.color && (
          <span className={styles.color} style={{ color: note.color }}>
            <Circle />
          </span>
        )}
      </div>
      <div className={styles.detail}>
        <h3 className={styles.title}>{note.title}</h3>
        <p className={styles.abstract}>{note.abstract}</p>
        <span>{date}</span>
      </div>
      <Menu {...menu}>
        <Menu.Item
          label="Delete"
          icon={<X />}
          onClick={() => deleteNote(note.id)}
        />
      </Menu>
    </div>
  );
};

export default Note;
