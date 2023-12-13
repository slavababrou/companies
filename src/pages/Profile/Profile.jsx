import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../store/authSlice";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);

  // Состояние для управления режимом редактирования
  const [isEditing, setIsEditing] = useState(false);

  // Состояние для хранения измененных данных пользователя
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
    return <Navigate to='/authorization' />;
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

  // Обработчик изменения полей в режиме редактирования
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обработчик отправки формы
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Обновление данных пользователя в Redux store
    await dispatch(updateUser(editedUserData));

    alert("Информация успешно изменена!");
    // Переключение обратно в режим просмотра после успешного обновления
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
            <form onSubmit={handleSubmitForm}>
              <div>
                <label htmlFor='login'>Новый логин:</label>
                <input
                  type='text'
                  id='login'
                  name='login'
                  value={editedUserData.login}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='email'>Новый email:</label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={editedUserData.email}
                  onChange={handleInputChange}
                />
              </div>
              <button type='submit'>Сохранить</button>
            </form>
          ) : (
            // Кнопка для переключения в режим редактирования
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
