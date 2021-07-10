import { usePortal } from "hooks";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

const QuickLink = ({ content }) => {
  const { container, menu } = useMenu();

  return (
    <div className={styles.quicklink} {...container}>
      <div className={styles.quicklink_icon}>{content.icon}</div>
      <li>{content.name}</li>
      <QuickLinkMenu {...menu} />
    </div>
  );
};

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

const QuickLinkMenu = ({ visible, position, outside, ...rest }) => {
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

  if (visible) {
    return render(
      <div
        {...rest}
        ref={ref}
        style={{
          height: "50px",
          width: "50px",
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: "pink",
          pointerEvents: "all",
        }}></div>
    );
  } else {
    return <></>;
  }
};

export default QuickLink;
