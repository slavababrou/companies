import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchCompanyData,
  fetchRevievsData,
  fetchSameCompaniesData,
} from "../../store/companySlice.js";
import logo from "../../images/logo/logo.svg";
import { openModal } from "../../store/modalSlice";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Company.module.css";
import ModalReviev from "../../components/ModalReviev/ModalReviev";
import Pagination from "../../components/Pagination/Pagination";
import { selectUserById } from "../../store/userSlice.js";
import CompanyRevievItem from "../../components/CompanyRevievItem/CompanyRevievItem";

const Company = () => {
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const isModalActive = useSelector((state) => state.modal.isModalActive);
  const users = useSelector((state) => state.user.users);
  const companyData = useSelector((state) => state.company.companyData);
  const revievsData = useSelector((state) => state.company.revievsData);

  const sameCompaniesData = useSelector(
    (state) => state.company.sameCompaniesData
  );
  //const isLoading = useSelector((state) => state.company.isLoading);

  let [list, setList] = useState(1);

  const handlerSetList = (list) => {
    setList(list);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCompanyData(companyId));
        await dispatch(fetchSameCompaniesData());
        await dispatch(fetchRevievsData({ companyId, list }));

        //const revievsData = selectRevievsDataFromStore();

        // await Promise.all(
        //   (revievsData?.rows || []).map(async (item) => {
        //     await dispatch(fetchUserById(item.userId));
        //   })
        // );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
                  <span>{companyData?.raiting || 0}</span>
                </div>
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
                <h3>
                  {revievsData?.rows?.length > 0
                    ? "Новые отзывы"
                    : "Нет отзывов"}
                </h3>
                <div className={styles["comments__list"]}>
                  {revievsData?.rows?.map((reviev) => {
                    const user = selectUserById(users, reviev.userId);
                    return (
                      <CompanyRevievItem
                        key={reviev.id}
                        reviev={reviev}
                        user={user}
                      />
                    );
                  })}
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
                  {isModalActive && <ModalReviev list={list} />}
                </div>

                <div className={styles["bar"]}>
                  <h4>
                    {companyData?.type}{" "}
                    <b className={styles["bar_revievs-count"]}>
                      ({sameCompaniesData?.length || 0})
                    </b>
                  </h4>
                  <div className={styles["list"]}>
                    {sameCompaniesData?.map((company) => {
                      const linkTo = `/company/${company.id}`;
                      return (
                        <Link
                          to={linkTo}
                          key={company.id}
                          className={styles["list_item"]}
                        >
                          <img src={logo} alt='logo' />
                          <div className={styles["list_item_info"]}>
                            <h5>{company?.name}</h5>
                            <span>Рейтинг: {company?.raiting}</span>
                          </div>
                        </Link>
                      );
                    })}
                    {sameCompaniesData?.length === 0 && (
                      <span className={styles["list_no-such-companies"]}>
                        Нет компаний такого типа
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.pagination}>
              {revievsData?.count > 4 && (
                <Pagination
                  onSetList={handlerSetList}
                  currentList={list}
                  totalLists={Math.ceil(revievsData.count / 4)}
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      }
    </>
  );
};

export default Company;
