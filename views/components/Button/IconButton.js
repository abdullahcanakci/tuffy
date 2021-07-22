import classNames from "classnames";
import React from "react";

const IconButton = React.forwardRef(
  ({ children, label, className, active, ...rest }, ref) => {
    const button = (
      <button
        className={classNames("icon-button", className, { active })}
        ref={ref}
        {...rest}>
        {children}
      </button>
    );

    return button;
  }
);

export default IconButton;
