import styles from "./index.module.scss";

const Folder = ({ content }) => {
  return (
    <div>
      <li className={styles.quicklink}>{content.name}</li>
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

export default Folder;
