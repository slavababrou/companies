import styles from "./Button.module.css";
import cn from "classnames";

function Button({ children, className, ...props }) {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
