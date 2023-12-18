import styles from "./NewCommentsList.module.css";
import companyLogo from "../../images/logo/logo.svg";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { fetchUserById, selectUserById } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../TimeAgo/TimeAgo";
import { fetchRevievsData } from "../../store/companySlice";

const NewCommentsList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const revievsData = useSelector((state) => state.company.revievsData);

  let [list, setList] = useState(1);

  const handlerSetList = (list) => {
    setList(list);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchRevievsData({ list }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [list, dispatch]);

  // Зависимость от revievsData для выполнения дополнительных действий
  useEffect(() => {
    // Проверяем, что есть rows и это массив, прежде чем использовать map
    if (revievsData?.rows && Array.isArray(revievsData.rows)) {
      const fetchUsers = async () => {
        try {
          // Выполняем запросы на получение пользователей
          await Promise.all(
            revievsData.rows.map(async (item) => {
              await dispatch(fetchUserById(item.userId));
            })
          );
        } catch (error) {
          console.log(error);
        }
      };

      // Вызываем функцию для получения пользователей
      fetchUsers();
    }
  }, [revievsData, dispatch]);

  return (
    <div className={styles.container}>
      <h3>Новые отзывы</h3>

      <div className={styles.list}>
        {revievsData?.rows &&
          Array.isArray(revievsData.rows) &&
          revievsData.rows.map((item) => {
            const user = selectUserById(users, item?.userId);
            return (
              <div className={styles.item} key={item?.id}>
                <div className={styles.wrapper}>
                  <img src={companyLogo} alt='' />
                  <div className={styles.subInfo}>
                    <h4 className={styles.company}>{item?.term}</h4>
                    <p className={styles.rate}>Оценка: {item?.raiting}</p>
                    <span className={styles.userName}>
                      Автор: {user?.login}
                    </span>
                  </div>
                </div>
                <span className={styles.text}>{item?.text}</span>
                <p className={styles.date}>
                  <TimeAgo date={item?.date} />
                </p>
              </div>
            );
          })}
      </div>

      {revievsData.count > 6 && (
        <Pagination
          onSetList={handlerSetList}
          currentList={list}
          totalLists={Math.ceil(revievsData.count / 6)}
        />
      )}
    </div>
  );
};

export default NewCommentsList;
