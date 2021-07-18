import { useState } from "react";
import { Tag, X } from "react-feather";
import styles from "./index.module.scss";

const TagInput = ({ id }) => {
  const [entry, setEntry] = useState("");
  const confirmEntry = () => {};
  return (
    <form onSubmit={() => confirmEntry()}>
      <div className={styles.search_area}>
        <span className="btn-icon">
          <Tag />
        </span>
        <input
          type="text"
          maxLength="16"
          placeholder="Add Tags"
          autoFocus
          value={entry}
          className={styles.search_input}
          onChange={(e) => setEntry(e.target.value)}
        />
        {entry.length > 0 && (
          <button
            className="btn-icon"
            type="button"
            onClick={() => setEntry("")}>
            <span>
              <X />
            </span>
          </button>
        )}
        <button
          type="submit"
          className={classNames(styles.quicklink_icon, "hidden")}
          onClick={() => confirmEntry}></button>
      </div>
    </form>
  );
};

export default TagInput;
