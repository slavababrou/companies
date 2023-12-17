import React from "react";
import styles from "./CompanyRevievItem.module.css";
import logo from "../../images/logo/logo.svg";
import TimeAgo from "../TimeAgo/TimeAgo";
import { useDispatch } from "react-redux";
import { addLikeDislikeReviev } from "../../store/companySlice";

const ReviewItem = ({ reviev, user }) => {
  const dispatch = useDispatch();

  const addLike = async (revievId) => {
    const actionType = "like";
    const userId = user?.id;
    await dispatch(addLikeDislikeReviev({ revievId, actionType, userId }));
  };
  const addDislike = async (revievId) => {
    const actionType = "dislike";
    const userId = user?.id;
    await dispatch(addLikeDislikeReviev({ revievId, actionType, userId }));
  };

  return (
    <div className={styles["list_item"]}>
      <div className={styles["list_item_logo-wrapper"]}>
        <img src={logo} alt='logo' />
        <TimeAgo date={reviev.date} />
      </div>
      <div className={styles["list_item_info"]}>
        <h5> {reviev.term}</h5>
        <span>Оценка: {reviev.raiting}</span>
        <span>{user?.login}</span>
      </div>
      <span className={styles["list_item_text"]}>{reviev.text}</span>
      <div className={styles["list_item_likes"]}>
        <button className={styles["likes"]} onClick={() => addLike(reviev.id)}>
          Лайки: {reviev.likes}
        </button>
        <button
          className={styles["dislikes"]}
          onClick={() => addDislike(reviev.id)}
        >
          Дизлайки: {reviev.dislikes}
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
