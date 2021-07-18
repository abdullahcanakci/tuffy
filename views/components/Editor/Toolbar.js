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
import TagInput from "./TagInput";

const Toolbar = ({ id }) => {
  const tags = useSelector(tagsList);
  return (
    <div>
      <div className={styles.toolbar}>
        <TagInput id={id} />
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
    </div>
  );
};

export default Toolbar;
