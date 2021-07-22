import classNames from "classnames";
import { X } from "react-feather";
import { IconButton } from "..";
import styles from "./index.module.scss";

const Pill = ({ label, onClick, onDelete }) => {
  const handleClick = () => {
    if (typeof onClick === "function") onClick();
  };
  return (
    <div
      className={classNames(styles.pill, { [`${styles.delete}`]: onDelete })}
      onClick={handleClick}>
      {label}
      {onDelete && (
        <IconButton
          className="ml-1"
          icon={<X />}
          hover
          onClick={() => onDelete()}
        />
      )}
    </div>
  );
};

export default Pill;
