import classNames from "classnames";
import styles from "./index.module.scss";

const Card = ({ children, className, ...rest }) => {
  return (
    <div className={classNames(styles.card, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;
