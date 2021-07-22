import React, { useState, useRef, useEffect, useMemo } from "react";
import classNames from "classnames";
import { Card, Menu, Portal } from "..";
import styles from "./dropdown.module.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Tippy from "@tippyjs/react/headless";

const Dropdown = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const label = useMemo(() => {
    let l = null;
    React.Children.map(children, (child) => {
      if (child.props.active) l = child.props.label;
    });
    return l;
  }, [children]);

  return (
    <div className="dropdown-container">
      <Tippy
        trigger="click"
        placement="bottom"
        interactive
        onTrigger={() => setShowDropdown(true)}
        onUntrigger={() => setShowDropdown(false)}
        popperOptions={{
          modifiers: [
            {
              name: "sameWidth",
              enabled: true,
              fn: ({ state }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
              },
              phase: "beforeWrite",
              requires: ["computeStyles"],
              effect: ({ state }) => {
                console.log(state);
                state.elements.popper.style.width = `${state.elements.reference.clientWidth}px`;
              },
            },
          ],
        }}
        render={(attrs, content) => (
          <div>
            <Card>{children}</Card>
          </div>
        )}>
        <button className="dropdown">
          {label}
          <div className="icon">
            {showDropdown ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </button>
      </Tippy>
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
