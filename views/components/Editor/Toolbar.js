import { useSelector } from "react-redux";
import { tagsList } from "store/reducers/tagsSlice";
import styles from "./index.module.scss";
import TagInput from "./TagInput";

const Toolbar = ({ id }) => {
  const tags = useSelector(tagsList);
  return (
    <div>
      <div className={styles.toolbar}>
        <TagInput id={id} />
      </div>
    </div>
  );
};

export default Toolbar;
