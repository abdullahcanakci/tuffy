import classNames from "classnames";
import { FaTimes } from "react-icons/fa";
import { IconButton } from "..";

const Pill = ({ label, onClick, onDelete }) => {
  const handleClick = () => {
    if (typeof onClick === "function") onClick();
  };
  return (
    <div
      className={classNames("pill", { pill_delete: onDelete })}
      onClick={handleClick}>
      <span className="pill_label">{label}</span>
      {onDelete && (
        <IconButton onClick={() => onDelete()}>
          <FaTimes />
        </IconButton>
      )}
    </div>
  );
};

export default Pill;
