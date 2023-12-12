import styles from "./NewCommentsList.module.css";
import companyLogo from "../../images/logo/logo.svg";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";

const NewCommentsList = () => {
  let [comments, setComments] = useState([]);
  let [list, setList] = useState(1);

  const handlerSetList = (list) => {
    setList(list);
  };

  useEffect(() => {
    fetch(`http://localhost:3192/api/reviev?limit=6&page=${list}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.rows);
      })
      .catch((e) => console.log(e));
  }, [list]);

  return (
    <div className={styles.container}>
      <h3>Новые отзывы</h3>

      <div className={styles.list}>
        {comments.map((item) => (
          <div className={styles.item} key={item.id}>
            <div className={styles.wrapper}>
              <img src={companyLogo} alt='' />
              <div className={styles.subInfo}>
                <h4 className={styles.company}>{item.userId}</h4>
                <p className={styles.rate}>{item.raiting}</p>
                <span className={styles.userName}>{item.userId}</span>
              </div>
              <p className={styles.date}>{item.date}</p>
            </div>

            <span className={styles.text}>{item.text}</span>
          </div>
        ))}
      </div>

      <Pagination onSetList={handlerSetList} currentList={list} />
    </div>
  );
};

export default NewCommentsList;
