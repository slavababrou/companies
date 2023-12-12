import styles from "./SearchContent.module.css";
import Search from "../Search/Search";

const SearchContent = () => {
  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <span className={styles.text}>Оценивайте и находите компании</span>

        <p>
          Наш сервис помогает сформировать наилучшие отношения между клиентом и
          компанией! Если вы клиент — вы можете оставить свой честный отзыв и
          получить ответ от официального представительства.
        </p>

        <Search
          className={styles.search}
          placeholder='Company or product'
          inputClassName={styles[`search_placeholder`]}
        ></Search>
      </div>
    </div>
  );
};

export default SearchContent;
