import { usePortal } from "hooks";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import React from "react";
import classNames from "classnames";

const useMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const onContextMenu = (e) => {
    e.preventDefault();
    setVisible(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const outside = (e) => {
    setVisible(false);
  };

  return {
    container: { onContextMenu },
    menu: { visible, position, outside },
  };
};

const Menu = ({ children, visible, position, outside, ...rest }) => {
  const { render } = usePortal();
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onChildClick = (event, childOnClick) => {
    outside();
    childOnClick(event);
  };

  if (visible) {
    return render(
      <div
        {...rest}
        ref={ref}
        className={styles.menu}
        style={{
          position: "absolute",
          left: `${position.x + 10}px`,
          top: `${position.y + 10}px`,
        }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            ...child.props,
            onClick: (e) => onChildClick(e, child.props.onClick),
          });
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

const Item = ({ label, onClick, icon }) => {
  return (
    <div onClick={onClick} className={classNames(styles.item, "flex flex-row")}>
      <div className={styles.icon}>{icon}</div>
      <span className="flex-1">{label}</span>
    </div>
  );
};

Menu.useMenu = useMenu;
Menu.Item = Item;
export default Menu;
