import React from "react";
import styles from "./CompanyRevievItem.module.css";
import logo from "../../images/logo/logo.svg";
import TimeAgo from "../TimeAgo/TimeAgo";

const ReviewItem = ({ reviev, user }) => {
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
    </div>
  );
};

export default ReviewItem;
