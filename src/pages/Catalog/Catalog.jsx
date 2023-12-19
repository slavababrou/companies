import Header from "../../components/Header/Header";
import styles from "./Catalog.module.css";

const Catalog = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>Catalog</div>
    </div>
  );
};

export default Catalog;
