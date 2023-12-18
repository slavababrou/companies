import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./AdminsRequests.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllRequests,
  selectCompanyRequests,
  selectUserRequests,
} from "../../store/requestsSlice";
import { deleteUser } from "../../store/userSlice";
import { deleteRequest } from "../../store/requestsSlice";
import { createCompany } from "../../store/companySlice";
import { fetchUserById } from "../../store/userSlice";

const AdminsRequests = () => {
  const dispatch = useDispatch();
  const companyRequests = useSelector(selectCompanyRequests);
  const userRequests = useSelector(selectUserRequests);

  useEffect(() => {
    dispatch(fetchAllRequests());
  }, [dispatch]);

  useEffect(() => {
    userRequests.forEach((request) => {
      dispatch(fetchUserById(request.userId));
    });
  }, [dispatch, userRequests]);

  const users = useSelector((state) => state.user.users);

  const handleAcceptUserRequest = (request) => {
    const confirmation = window.confirm(
      "Вы уверены, что хотите принять этот запрос?"
    );
    if (confirmation) {
      dispatch(deleteUser(request.userId));
      dispatch(deleteRequest(request.id));
    }
  };

  const handleAcceptCompanyRequest = (request) => {
    const confirmation = window.confirm(
      "Вы уверены, что хотите принять этот запрос?"
    );
    if (confirmation) {
      dispatch(createCompany(request.companyInfo));
      dispatch(deleteRequest(request.id));
    }
  };

  const handleRejectRequest = (requestId) => {
    const confirmation = window.confirm(
      "Вы уверены, что хотите отклонить этот запрос?"
    );
    if (confirmation) {
      dispatch(deleteRequest(requestId));
    }
  };

  const getRoleString = (roleId) => {
    switch (roleId) {
      case 1:
        return "user";
      case 2:
        return "admin";
      case 3:
        return "manager";
      default:
        return "Неизвестная роль";
    }
  };

  return (
    <div className={styles["admins-requests"]}>
      <Header />
      <main className={styles["admins-requests__main"]}>
        {companyRequests.length > 0 && (
          <section className={styles["admins-section"]}>
            <h2>Создание компании</h2>
            <ul>
              {companyRequests.map((request, index) => (
                <li key={index}>
                  <div className={styles["request_wrapper_user-info"]}>
                    <span className={styles["request_info_keys"]}>name: </span>
                    {request.companyInfo.name}
                    <span className={styles["request_info_keys"]}>type: </span>
                    {request.companyInfo.type}
                  </div>

                  <div className={styles["request_wrapper_btn"]}>
                    <button onClick={() => handleAcceptCompanyRequest(request)}>
                      Принять
                    </button>
                    <button onClick={() => handleRejectRequest(request.id)}>
                      Отклонить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {userRequests.length > 0 && (
          <section className={styles["admins-section"]}>
            <h2>Удаление аккаунта</h2>
            <ul>
              {userRequests.map((request, index) => {
                const user = users[request?.userId];
                return (
                  <li key={index}>
                    <div className={styles["request_wrapper_user-info"]}>
                      <span className={styles["request_info_keys"]}>
                        login:{" "}
                      </span>
                      {user?.login}
                      <span className={styles["request_info_keys"]}>
                        email:{" "}
                      </span>
                      {user?.email}
                      <span className={styles["request_info_keys"]}>
                        role:{" "}
                      </span>
                      {getRoleString(user?.roleId)}
                    </div>

                    <div className={styles["request_wrapper_btn"]}>
                      <button onClick={() => handleAcceptUserRequest(request)}>
                        Принять
                      </button>
                      <button onClick={() => handleRejectRequest(request.id)}>
                        Отклонить
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {userRequests.length === 0 && companyRequests.length === 0 && (
          <h1 className={styles["admins-requests_no-requests"]}>
            Нет запросов
          </h1>
        )}
      </main>
    </div>
  );
};

export default AdminsRequests;
