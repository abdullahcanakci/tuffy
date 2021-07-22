import Tippy from "@tippyjs/react";
import React, { useState } from "react";
import { Card } from "..";

const DropdownMenu = ({ children, options, matchWidth = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = (e) => {
    if (typeof children.props.onClick === "function") {
      children.props.onClick(e);
    } else {
      setIsOpen((p) => !p);
    }
  };
  return (
    <div className="dropdown-container">
      <Tippy
        trigger="click"
        interactive
        placement="bottom"
        hideOnClick="true"
        render={(attrs, content) => (
          <div>
            <Card>{options}</Card>
          </div>
        )}>
        {React.cloneElement(children, {
          onClick: handleOnClick,
        })}
      </Tippy>
    </div>
  );
};

export default DropdownMenu;
