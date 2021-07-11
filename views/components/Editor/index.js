import Toolbar from "./Toolbar";
import styles from "./index.module.scss";
import { useNote } from "hooks";

const Editor = ({ note: oldNote }) => {
  const { data: note } = useNote(oldNote);

  return (
    <div className={styles.editor}>
      <Toolbar tags={note?.tags} />
    </div>
  );
};

export default Editor;
