import classNames from "classnames";
import { useState } from "react";
import {
  Bell,
  Download,
  MoreHorizontal,
  Paperclip,
  Plus,
  Share,
  Share2,
  Tag,
  X,
} from "react-feather";
import { useSelector } from "react-redux";
import { tagsList } from "store/reducers/tagsSlice";
import Icon from "../Button/Icon";
import styles from "./index.module.scss";

const Toolbar = ({ tags: noteTags = [] }) => {
  const [search, setSearch] = useState("");
  const tags = useSelector(tagsList);
  return (
    <div>
      <div className={styles.toolbar}>
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
        <Icon
          icon={<Paperclip />}
          side="left"
          actions={[
            {
              label: "Upload Image",
              onClick: () => console.log("upload image"),
              icon: <Share />,
            },
          ]}
        />
        <Icon
          icon={<Bell />}
          side="left"
          actions={[
            {
              label: "Set Reminder",
              onClick: () => console.log("Reminder Set"),
              icon: <Plus />,
            },
          ]}
        />
        <Icon
          icon={<Share2 />}
          side="left"
          actions={[
            {
              label: "Download",
              onClick: () => console.log("Download"),
              icon: <Download />,
            },
          ]}
        />
        <Icon
          icon={<MoreHorizontal />}
          side="left"
          onClick={() => console.log("More")}
        />
      </div>
      <ul className="flex flex-row px-2">
        {tags?.map((tag) => (
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
