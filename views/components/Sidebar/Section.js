import styles from "./index.module.scss";

const Section = ({ children }) => {
  return <div className={styles.sidebar_group}>{children}</div>;
};

export default Section;
