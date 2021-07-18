import classNames from "classnames";
import { X } from "react-feather";
import Icon from "../Button/Icon";
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
        <Icon className="ml-1" icon={<X />} hover onClick={() => onDelete()} />
      )}
    </div>
  );
};

export default Pill;
