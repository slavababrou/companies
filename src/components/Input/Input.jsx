import styles from "./Input.module.css";
import cn from "classnames";

function Input({ placeholder, className, ...props }) {
  return (
    <input
      className={cn(styles.input, className)}
      placeholder={placeholder}
      {...props}
      type='text'
    />
  );
}

export default Input;
