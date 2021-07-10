import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Plus, X } from "react-feather";
import styles from "./index.module.scss";

const SectionTitle = ({ title, icon, onNewEntry }) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");

  const showEdit = () => {
    setInput("");
    setEdit((val) => !val);
  };

  const confirmEntry = () => {
    if (typeof onNewEntry == "function" && input != "") {
      onNewEntry(input);
    }

    showEdit();
  };

  return (
    <div
      className={classNames(styles.section_title, {
        [`${styles.active}`]: edit,
      })}>
      {edit ? (
        <input
          type="text"
          maxLength="16"
          placeholder="Input"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <span>{title}</span>
      )}
      {onNewEntry && (
        <div className={styles.quicklink_icon} onClick={showEdit}>
          {edit ? <X /> : <Plus />}
        </div>
      )}
      {edit && (
        <div className={styles.quicklink_icon} onClick={confirmEntry}>
          <Check />
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
