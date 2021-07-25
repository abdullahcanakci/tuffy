import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";

const Button = React.forwardRef(
  (
    {
      actions = null,
      icon,
      onClick,
      className,
      side,
      label,
      style = "primary",
      block = false,
      type = "button",
    },
    ref
  ) => {
    const handleClick = (e) => {
      if (actions) {
        e.preventDefault();
        onContextMenu(e);
      } else if (onClick) {
        e.preventDefault();
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        className={classNames(styles.action, className, {
          [`${styles.primary}`]: style == "primary",
          [`${styles.secondary}`]: style == "secondary",
          [`${styles.danger}`]: style == "danger",
          [`${styles.block}`]: block,
        })}
        onClick={handleClick}
        type={type}>
        {icon}
        <span>{label}</span>
      </button>
    );
  }
);

export default Button;
