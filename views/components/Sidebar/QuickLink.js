import { ContextMenu, MenuItem } from "../Menu";
import styles from "./index.module.scss";

const QuickLink = ({ content, actions }) => {
  const link = (
    <div className={styles.quicklink}>
      <div className={styles.quicklink_icon}>{content.icon}</div>
      <li>{content.name}</li>
    </div>
  );
  if (actions && actions.length > 0) {
    return (
      <ContextMenu
        options={actions.map((action) => (
          <MenuItem
            key={action.label}
            label={action.label}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))}>
        {link}
      </ContextMenu>
    );
  } else {
    return link;
  }
};

export default QuickLink;
