import classNames from "classnames";
import styles from "./layouts.module.scss";

const CenterLayout = ({ children, className }) => {
  return (
    <div className={classNames(styles.center_layout, className)}>
      {children}
    </div>
  );
};

export default CenterLayout;
