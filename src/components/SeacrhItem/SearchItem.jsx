import styles from "./SearchItem.module.css";

function SearchItem({ company, ...props }) {
  return (
    <div className={styles["Search-Item__wrapper"]}>
      <div className={styles["Search-Item__item"]}>
        <div className={styles["Search-Item__img"]}>
          <img src='../../images/logo/logo.svg' alt='' />
        </div>
        <div className={styles["Search-Item__info"]}>
          <h3 className={styles["Search-Item__info_name"]}>{company.name}</h3>
          <span className={styles["Search-Item__info_type"]}>
            {company.type}
          </span>
          <span className={styles["Search-Item__info_rating"]}>
            {company.raiting}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
