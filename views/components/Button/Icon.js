import classNames from "classnames";
import { Menu } from "..";
import styles from "./index.module.scss";

const Icon = ({ actions, icon, onClick, className, side }) => {
  const {
    container: { onContextMenu },
    menu,
  } = Menu.useMenu();

  const handleClick = (e) => {
    e.preventDefault();
    if (actions) {
      onContextMenu(e);
    } else {
      onClick(e);
    }
  };

  return (
    <>
      <button
        className={classNames(styles.icon, className)}
        onClick={handleClick}>
        {icon}
      </button>
      {actions && (
        <Menu {...menu} side={side}>
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
    </>
  );
};

export default Icon;
