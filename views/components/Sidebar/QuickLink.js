import styles from "./index.module.scss";

const QuickLink = ({ content }) => {
  return (
    <div>
      <div className={styles.quicklink}>
        <div className={styles.quicklink_icon}>{content.icon}</div>
        <li>{content.name}</li>
      </div>
      {content.children && (
        <ul>
          {content.children.map((child) => (
            <Folder content={child} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuickLink;
