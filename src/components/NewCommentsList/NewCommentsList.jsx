import styles from "./NewCommentsList.module.css";
import companyLogo from "../../images/logo/logo.svg";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { fetchUserById, selectUserById } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../TimeAgo/TimeAgo";

const NewCommentsList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  let [comments, setComments] = useState([]);
  let [list, setList] = useState(1);

  const handlerSetList = (list) => {
    setList(list);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3192/api/reviev?limit=6&page=${list}`
        );
        const data = await response.json();

        setComments(data.rows);

        await Promise.all(
          data.rows.map(async (item) => {
            await dispatch(fetchUserById(item.userId));
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [list, dispatch]);
  return (
    <div className={styles.container}>
      <h3>Новые отзывы</h3>

      <div className={styles.list}>
        {comments.map((item) => {
          const user = selectUserById(users, item.userId);
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.wrapper}>
                <img src={companyLogo} alt='' />
                <div className={styles.subInfo}>
                  <h4 className={styles.company}>{item.term}</h4>
                  <p className={styles.rate}>Оценка: {item.raiting}</p>
                  <span className={styles.userName}>Автор: {user?.login}</span>
                </div>
              </div>

              <span className={styles.text}>{item.text}</span>
              <p className={styles.date}>
                <TimeAgo date={item.date} /> наазд
              </p>
            </div>
          );
        })}
      </div>

      <Pagination onSetList={handlerSetList} currentList={list} />
    </div>
  );
};

export default NewCommentsList;
