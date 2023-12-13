import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ModalReviev.module.css";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import { validateRating, validateTerm } from "./validation";
import { closeModal } from "../../store/modalSlice";
import { addReviev } from "../../store/companySlice";

function ModalReviev() {
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const userId = useSelector((state) => state.auth.user?.user?.id);

  const submitInfo = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("date", new Date());
    formData.append("companyId", companyId);
    formData.append("userId", userId);
    formData.append("likes", 0);
    formData.append("dislikes", 0);

    let ratingValidation = validateRating(formData.get("raiting"));
    let termValidation = validateTerm(formData.get("term"));

    if (ratingValidation.valid && termValidation.valid) {
      console.log(userId, "aboba");
      await dispatch(addReviev({ revievData: formData }));

      dispatch(closeModal());
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
            onClick={() => dispatch(closeModal())}
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
