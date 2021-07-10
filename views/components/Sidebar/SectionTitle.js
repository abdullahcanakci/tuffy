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
        <form onSubmit={() => confirmEntry}>
          <div className="flex flex-row">
            <input
              type="text"
              maxLength="16"
              placeholder="Input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="button"
              className={styles.quicklink_icon}
              onClick={showEdit}>
              <X />
            </button>
            <button
              type="submit"
              className={styles.quicklink_icon}
              onClick={confirmEntry}>
              <Check />
            </button>
          </div>
        </form>
      ) : (
        <span>{title}</span>
      )}
      {onNewEntry && !edit && (
        <div className={styles.quicklink_icon} onClick={showEdit}>
          <Plus />
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
