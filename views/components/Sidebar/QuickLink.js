import { Menu } from "..";
import styles from "./index.module.scss";

const QuickLink = ({ content, actions }) => {
  const { container, menu } = Menu.useMenu();

  return (
    <div className={styles.quicklink} {...container}>
      <div className={styles.quicklink_icon}>{content.icon}</div>
      <li>{content.name}</li>
      {actions && actions.length > 0 && (
        <Menu {...menu}>
          {actions.map((action) => (
            <Menu.Item
              key={action.label}
              label={action.label}
              icon={action.icon}
              onClick={action.onClick}
            />
          ))}
        </Menu>
      )}
    </div>
  );
};

export default QuickLink;
