import styles from "./index.module.scss";

const Card = ({ children, ...rest }) => {
  return (
    <div className={styles.card} {...rest}>
      {children}
    </div>
  );
};

export default Card;
