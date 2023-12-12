import Button from "../Button/Button";
import styles from "./ModalReviev.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { validateRating, validateTerm } from "./validation";

function ModalReviev({ setIsModalActiveHandle }) {
  const { companyId } = useParams();

  const submitInfo = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("date", new Date());
    formData.append("companyId", companyId);
    formData.append("useId", 1); // изменить, брать из редакса
    formData.append("likes", 0);
    formData.append("dislikes", 0);

    let ratingValidation = validateRating(formData.get("raiting"));
    let termValidation = validateTerm(formData.get("term"));

    if (ratingValidation.valid && termValidation.valid) {
      const response = await axios.post(
        "http://localhost:3192/api/reviev",
        formData
      );
      setIsModalActiveHandle();
      alert("Комментарий успешно создан!");
    } else {
      alert(ratingValidation.error || termValidation.error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.window} onSubmit={submitInfo}>
        <div className={styles["window__head-wrapper"]}>
          <div></div>
          <h3>Оставить отзыв</h3>
          <button
            onClick={() => setIsModalActiveHandle()}
            className={styles["btn_close-modal"]}
          ></button>
        </div>

        <div className={styles.info}>
          <input type='text' name='term' placeholder='Тема' />
          <input
            type='number'
            name='raiting'
            placeholder='Оценка'
            defaultValue={0}
          />
          <input type='text' name='text' placeholder='Текст' />
        </div>
        <div className={styles.btnWrapper}>
          <Button className={styles.btn}>Отправить</Button>
        </div>
      </form>
    </div>
  );
}

export default ModalReviev;
