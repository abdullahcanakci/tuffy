import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Tag, X } from "react-feather";
import { useSelector } from "react-redux";
import { TagService, NoteService } from "services";
import { activeNote } from "store/reducers/notesSlice";
import { tagSearch } from "store/reducers/tagsSlice";
import { Card, Portal, Pill } from "..";
import styles from "./index.module.scss";

const TagInput = () => {
  const note = useSelector(activeNote);
  const [entry, setEntry] = useState("");
  const tags = useSelector(tagSearch(entry));
  const [active, setActive] = useState(null);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  const confirmEntry = (e) => {
    e.preventDefault();
    let tagId = null;
    if (active !== null) {
      tagId = tags[active];
    } else if (active === null && entry != "") {
      const tag = TagService.create(entry);
      tagId = tag.id;
    }

    if (!tagId) return;
    setActive(null);
    NoteService.toggleTag(note.id, tagId, true);
    inputRef?.current?.focus();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyCode = event.key;
      if (keyCode == "ArrowUp" || keyCode == "ArrowDown") {
        event.preventDefault();
        setActive((prevActive) => {
          let newValue = prevActive;
          if (keyCode == "ArrowUp") {
            newValue = newValue > 0 ? newValue - 1 : null;
          } else if (keyCode == "ArrowDown") {
            if (newValue === null) return 0;
            newValue = newValue < tags.length - 1 ? newValue + 1 : newValue;
          }
          return newValue;
        });
      }
    };

    if (inputRef?.current) {
      inputRef.current.addEventListener("keydown", handleKeyPress, false);
      return () =>
        inputRef?.current?.removeEventListener("keydown", handleKeyPress);
    }
  }, [tags]);

  const renderSelector = () => {
    if (entry.length == 0) return <></>;
    return (
      <Portal
        x={menuRef.current.getBoundingClientRect().left}
        y={menuRef.current.getBoundingClientRect().bottom}
        outside={() => setEntry("")}>
        <Card
          style={{
            width: `${
              menuRef.current.getBoundingClientRect().right -
              menuRef.current.getBoundingClientRect().left
            }px`,
          }}>
          {tags.map((tag, index) => (
            <TagEntry
              key={tag}
              id={tag}
              active={active == index}
              onClick={() => NoteService.toggleTag(note.id, tag, true)}
            />
          ))}
        </Card>
      </Portal>
    );
  };

  return (
    <form onSubmit={confirmEntry}>
      <div className={styles.search_area} ref={menuRef}>
        <span className={`btn-icon ${styles.tag_icon}`}>
          <Tag />
        </span>
        {note.tags?.length > 0 &&
          note.tags.map((tag) => (
            <TagPill key={tag} noteId={note.id} tagId={tag} />
          ))}
        <input
          type="text"
          maxLength="16"
          placeholder="Add Tags"
          autoFocus
          value={entry}
          className={styles.search_input}
          onChange={(e) => setEntry(e.target.value)}
          ref={inputRef}
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
      {renderSelector()}
    </form>
  );
};

const TagEntry = ({ id, active, onClick }) => {
  const tag = useSelector((state) => state.tags.data[id]);
  return (
    <div
      className={classNames(styles.tag_entry, {
        [`${styles.active}`]: active,
      })}
      onClick={() => onClick()}>
      {tag.name}
    </div>
  );
};

const TagPill = ({ noteId, tagId }) => {
  const tag = useSelector((state) => state.tags.data[tagId]);

  return (
    <Pill
      label={tag.name}
      onDelete={() => NoteService.toggleTag(noteId, tagId, false)}
    />
  );
};

export default TagInput;
