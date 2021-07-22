import React, { useState, useRef, useEffect, useMemo } from "react";
import classNames from "classnames";
import { Card, Menu, Portal } from "..";
import styles from "./dropdown.module.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Dropdown = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);

  const label = useMemo(() => {
    let l = null;
    React.Children.map(children, (child) => {
      if (child.props.active) l = child.props.label;
    });
    return l;
  }, [children]);

  const renderDropdown = () => {
    if (!showDropdown) return <></>;
    return (
      <Portal
        x={buttonRef.current.getBoundingClientRect().left}
        y={buttonRef.current.getBoundingClientRect().bottom}
        outside={() => setShowDropdown(false)}>
        <Card
          style={{
            width: `${
              buttonRef.current.getBoundingClientRect().right -
              buttonRef.current.getBoundingClientRect().left
            }px`,
          }}>
          {children}
        </Card>
      </Portal>
    );
  };

  return (
    <div className="dropdown-container">
      <button
        className="dropdown"
        icon="heart"
        onClick={() => setShowDropdown((e) => !e)}
        ref={buttonRef}>
        {label}
        <div className="icon">
          {showDropdown ? <FaCaretUp /> : <FaCaretDown />}
        </div>
      </button>
      {renderDropdown()}
    </div>
  );
};

const Item = ({ label, onClick, icon, active }) => {
  return (
    <div className="dropdown-container">
      <div
        onClick={() => onClick()}
        className={classNames("item flex flex-row", { active })}>
        <div className={styles.icon}>{icon}</div>
        <span className="flex-1 whitespace-nowrap">{label}</span>
      </div>
    </div>
  );
};

export { Item as DropdownItem };

export default Dropdown;
