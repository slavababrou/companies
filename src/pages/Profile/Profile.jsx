import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user?.user);
  console.log("User from Redux store:", user);

  const [isEditing, setIsEditing] = useState(false);

  const [editedUserData, setEditedUserData] = useState({
    login: user?.login,
    email: user?.email,
    id: user?.id,
    password: user?.password,
    user_avatar: user?.user_avatar,
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm("Вы уверены, что хотите выйти?");

    if (!confirmLogout) {
      return;
    }

    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/authorization");
  };

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return "User";
      case 2:
        return "Admin";
      case 3:
        return "Manager";
      default:
        return "Неизвестная роль";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const updatedUserData = { ...editedUserData };
    await dispatch(updateUser(updatedUserData));

    alert("Информация успешно изменена!");

    setIsEditing(false);
  };

  return (
    <div className={styles["profile__wrapper"]}>
      <Header />
      <div className={styles.profileContainer}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.nickname}>{user?.login}</div>
          <div className={styles.userInfoTag}>Role</div>
          <div className={styles.role}>{getRoleName(user?.roleId)}</div>
          <div className={styles.userInfoTag}>Email</div>
          <div className={styles.email}>{user?.email}</div>
        </div>
        <div className={styles.userButtons}>
          {isEditing ? (
            // Форма редактирования
            <form
              className={styles["user__edit-form"]}
              onSubmit={handleSubmitForm}
            >
              <h2>Редактирование пользователя</h2>
              <div className={styles["user__edit-form_fields"]}>
                <div>
                  <label htmlFor='login'>Новый логин: </label>
                  <input
                    type='text'
                    id='login'
                    name='login'
                    value={editedUserData.login}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor='email'>Новый email: </label>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    value={editedUserData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles["user__edit-form_buttons"]}>
                <button
                  className={styles["edit-form_buttons_accept"]}
                  type='submit'
                >
                  Сохранить
                </button>
                <button
                  className={styles["edit-form_buttons_decline"]}
                  onClick={() => setIsEditing(false)}
                  type='button'
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <button className={styles.btn} onClick={() => setIsEditing(true)}>
              Редактировать
            </button>
          )}
          {getRoleName(user?.roleId) === "Manager" && (
            <button className={styles.btn}>Добавить компанию</button>
          )}
          <button className={styles.btn} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
