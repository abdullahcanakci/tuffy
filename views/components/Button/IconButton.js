import classNames from "classnames";

const IconButton = ({ children, label, className, active, ...rest }) => {
  return (
    <button
      className={classNames("icon-button", className, { active })}
      {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
