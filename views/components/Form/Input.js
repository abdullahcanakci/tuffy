import { slugify } from "utils/helpers";
import styles from "./index.module.scss";

const Input = ({ value, setValue, label, type = "text", name = null }) => {
  return (
    <div className={styles.input_field}>
      <label>
        <span>{label}</span>
        <input type={type} name={name ?? slugify(label)} />
      </label>
    </div>
  );
};

export default Input;
