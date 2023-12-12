import styles from "./Footer.module.css";
import telegramIcon from "../../images/cotact_icons/telegram.svg";
import instagramIcon from "../../images/cotact_icons/instagram.svg";
import youtubeIcon from "../../images/cotact_icons/youtube.svg";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.up}>
          <div className={styles.mail}>rate@vsu.by</div>
          <ul>
            <li>о нас</li>
            <li>история</li>
            <li>вопросы</li>
          </ul>
          <div className={styles.number}>+375(212)26-25-16</div>
        </div>

        <div className={styles.down}>
          <div className={styles["down_icons"]}>
            <a>
              <img src={telegramIcon} alt='telegram' className={styles.icons} />
            </a>
            <a>
              <img src={instagramIcon} alt='inst' className={styles.icons} />
            </a>
            <a>
              <img src={youtubeIcon} alt='youtube' className={styles.icons} />
            </a>
          </div>
          <div className={styles["down_text"]}>
            <span className={styles.text}>
              2023 ВГУ имени П. М. Машерова. Все права защищены
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
