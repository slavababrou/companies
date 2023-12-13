import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCompanyData,
  fetchRevievsData,
} from "../../store/companySlice.js";
import { openModal } from "../../store/modalSlice";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Company.module.css";
import logo from "../../images/logo/logo.svg";
import user from "../../images/user.png";
import ModalReviev from "../../components/ModalReviev/ModalReviev";
import Rating from "../../components/Raiting/Raiting";
import Pagination from "../../components/Pagination/Pagination";

const Company = () => {
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const isModalActive = useSelector((state) => state.modal.isModalActive);

  // Используйте селекторы для получения данных из Redux store
  const companyData = useSelector((state) => state.company.companyData);
  const revievsData = useSelector((state) => state.company.revievsData);
  const sameCompaniesData = useSelector(
    (state) => state.company.sameCompaniesData
  );
  const isLoading = useSelector((state) => state.company.isLoading);

  let [list, setList] = useState(1);

  const handlerSetList = (list) => {
    setList(list);
  };

  useEffect(() => {
    dispatch(fetchCompanyData(companyId));
    dispatch(fetchRevievsData({ companyId, list }));
  }, [companyId, list, dispatch]);

  return (
    <>
      {
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.main}>
            <div className={styles["wrapper__company"]}>
              <div className={styles["company"]}>
                <div className={styles["company_logo"]}>
                  <img src={logo} alt='logo' />
                </div>
                <div className={styles["company_info"]}>
                  <h3>
                    <b className={styles.bold}>{companyData?.name} </b>отзывы
                  </h3>
                  <span>{companyData?.type}</span>
                  <span>
                    {companyData?.raiting}
                    <Rating value={4} />
                  </span>
                </div>
              </div>
              <div className={styles["comments"]}>
                <span className={styles["comments_raiting"]}>
                  {companyData?.raiting}
                  <Rating value={4} />
                </span>
                <span className={styles["comments_count"]}>
                  {revievsData?.count}
                </span>
              </div>
            </div>
            <div className={styles["wrapper__toggle"]}>
              <span className={styles["toggle_comments"]}>
                Отзывы ({revievsData?.count})
              </span>
              <span className={styles["toggle_questions"]}>
                Вопросы и ответы
              </span>
            </div>

            <div className={styles["wrapper__container"]}>
              <div className={styles["comments__container"]}>
                <h3>Новые отзывы</h3>
                <div className={styles["comments__list"]}>
                  {revievsData?.rows?.map((reviev) => (
                    <>
                      <div key={reviev.id} className={styles["list_item"]}>
                        <img src={user} alt='logo' />
                        <div className={styles["list_item_info"]}>
                          <h5>{reviev.term}</h5>
                          <span>Оценка: {reviev.raiting}</span>
                          <span>Татьяна {reviev.date}</span>
                          <span>{reviev.text}</span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className={styles["bar__container"]}>
                <div className={styles["add-comment"]}>
                  <button
                    className={styles["btn_add-commetn"]}
                    onClick={() => dispatch(openModal())}
                  >
                    Оставить отзыв
                  </button>
                  {isModalActive && <ModalReviev />}
                </div>

                <div className={styles["bar"]}>
                  <h4>
                    {companyData?.type}{" "}
                    <b className={styles["bar_revievs-count"]}>
                      ({sameCompaniesData?.count || 0})
                    </b>
                  </h4>
                  <div className={styles["list"]}>
                    {sameCompaniesData?.map((company) => (
                      <div className={styles["list_item"]}>
                        <img src={logo} alt='logo' />
                        <div className={styles["list_item_info"]}>
                          <h5>{company?.name}</h5>
                          <span>Рейтинг: {company?.raiting}</span>
                          {/* <span>{revievsData.count} отзывов</span> */}
                        </div>
                      </div>
                    )) && (
                      <span className={styles["list_no-such-companies"]}>
                        Нет компаний такого типа
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.pagination}>
              <Pagination onSetList={handlerSetList} currentList={list} />
            </div>
          </div>
          <Footer />
        </div>
      }
    </>
  );
};

export default Company;
