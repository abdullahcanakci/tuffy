import Tippy from "@tippyjs/react/headless";
import { followCursor } from "tippy.js/headless";
import React, { useState } from "react";
import { Card } from "..";

const ContextMenu = ({ children, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = async (e) => {
    e.preventDefault();
    if (isOpen == false) {
      setIsOpen(true);
    } else {
      await setIsOpen(false);
      setIsOpen(true);
    }
  };
  const close = (e) => {
    if (e?.preventDefault) e?.preventDefault();
    setIsOpen(false);
  };

  const handleOnClick = (e) => {
    setIsOpen(false);
    if (typeof children.props.onClick === "function") {
      children.props.onClick(e);
    }
  };

  return (
    <Tippy
      render={() => <Card className="dropdown-container">{options}</Card>}
      interactive={true}
      visible={isOpen}
      onClickOutside={close}
      followCursor="initial"
      placement="bottom"
      plugins={[followCursor]}>
      {React.cloneElement(children, {
        onContextMenu: open,
        onClick: handleOnClick,
      })}
    </Tippy>
  );
};

export default ContextMenu;
