import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Company.module.css";
import logo from "../../images/logo/logo.svg";
import user from "../../images/user.png";
import ModalReviev from "../../components/ModalReviev/ModalReviev";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "../../components/Raiting/Raiting";
import Pagination from "../../components/Pagination/Pagination";

const Company = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [revievsData, setRevievsData] = useState(null);
  const { companyId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  let [list, setList] = useState(1);

  const handlerSetList = (list) => {
    setList(list);
  };

  const fetchData = async () => {
    try {
      const companyResponse = await axios.get(
        `http://localhost:3192/api/company/${companyId}`
      );
      setCompanyData(companyResponse.data);

      const revievResponse = await axios.get(
        `http://localhost:3192/api/reviev?companyId=${companyId}&limit=4&page=${list}`
      );
      setRevievsData(revievResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching company data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3192/api/reviev?companyId=${companyId}&limit=4&page=${list}`
      )
      .then((response) => setRevievsData(response.data));
  }, [list]);

  const setIsModalActiveHandle = () => setIsModalActive(!isModalActive);

  let sameCompanys = [1, 2, 3, 4, 5];
  let comments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (isLoading) return <h1>Loading...</h1>;

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
                  {/* <span>{companyData.info}</span> */}
                  <span>{companyData?.raiting}</span>
                </div>
              </div>
              <div className={styles["comments"]}>
                <span className={styles["comments_raiting"]}>
                  {companyData?.raiting}
                  <Rating value={4.2} />
                </span>
                <span className={styles["comments_count"]}>
                  {revievsData.count}
                </span>
              </div>
            </div>

            <div className={styles["wrapper__toggle"]}>
              <span className={styles["toggle_comments"]}>
                Отзывы ({revievsData.count})
              </span>
              <span className={styles["toggle_questions"]}>
                Вопросы и ответы
              </span>
            </div>

            <div className={styles["wrapper__container"]}>
              <div className={styles["comments__container"]}>
                <h3>Новые отзывы</h3>
                <div className={styles["comments__list"]}>
                  {revievsData.rows?.map((reviev) => (
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
                    onClick={setIsModalActiveHandle}
                  >
                    Оставить отзыв
                  </button>
                  {isModalActive && (
                    <ModalReviev
                      setIsModalActiveHandle={setIsModalActiveHandle}
                    />
                  )}
                  {/* <ModalReviev /> */}
                </div>

                <div className={styles["bar"]}>
                  <h4>{companyData?.type}</h4>
                  <div className={styles["list"]}>
                    {sameCompanys?.map((item) => (
                      <div className={styles["list_item"]}>
                        <img src={logo} alt='logo' />
                        <div className={styles["list_item_info"]}>
                          <h5>{companyData?.name}</h5>
                          <span>Рейтинг: {companyData?.raiting}</span>
                          <span>{revievsData.count} отзывов</span>
                        </div>
                      </div>
                    ))}
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
