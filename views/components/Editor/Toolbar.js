import classNames from "classnames";
import { useTags } from "hooks";
import { useState } from "react";
import { Bell, MoreHorizontal, Paperclip, Share2, Tag, X } from "react-feather";
import styles from "./index.module.scss";

const Toolbar = ({ tags: noteTags = [] }) => {
  const [search, setSearch] = useState("");
  const { tags, tagsLoading } = useTags();
  console.log("tags", tags);
  console.log("noteTags", noteTags);
  return (
    <div>
      <div className={styles.toolbar}>
        <form onSubmit={() => confirmEntry()}>
          <div className={styles.search_area}>
            <span className="btn-icon">
              <Tag />{" "}
            </span>
            <input
              type="text"
              maxLength="16"
              placeholder="Add Tags"
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
              type="submit"
              className={classNames(styles.quicklink_icon, "hidden")}
              onClick={() => confirmEntry}></button>
          </div>
        </form>
        <button className="btn-icon">
          <span>
            <Paperclip />
          </span>
        </button>
        <button className="btn-icon">
          <span>
            <Bell />
          </span>
        </button>
        <button className="btn-icon">
          <span>
            <Share2 />
          </span>
        </button>
        <button className="btn-icon">
          <span>
            <MoreHorizontal />
          </span>
        </button>
      </div>
      <ul className="flex flex-row px-2">
        {!tagsLoading &&
          tags?.map((tag) => (
            <>
              {noteTags.includes(tag.id) && (
                <li className={styles.tag} key={tag.id}>
                  {tag.name}
                  <button className="btn-icon">
                    <span>
                      <X />
                    </span>
                  </button>
                </li>
              )}
            </>
          ))}
      </ul>
    </div>
  );
};

export default Toolbar;
