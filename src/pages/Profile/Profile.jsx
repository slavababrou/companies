import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser, changePassword } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user?.user);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [editedUserData, setEditedUserData] = useState({
    login: user?.login,
    email: user?.email,
    id: user?.id,
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Вы уверены, что хотите выйти?");

    if (!confirmLogout) {
      return;
    }

    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/authorization");
  };

  useEffect(() => {
    setEditedUserData({
      login: user?.login,
      email: user?.email,
      id: user?.id,
    });
  }, [user]);

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const updatedUserData = { ...editedUserData };
    await dispatch(updateUser(updatedUserData));

    alert("Информация успешно изменена!");

    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    try {
      const result = await dispatch(
        changePassword({
          userId: editedUserData.id,
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
      );
      console.log(result);

      if (result.error) {
        throw new Error("Неверный старый пароль");
      }

      setOldPassword("");
      setNewPassword("");
      setIsChangingPassword(false);
      alert("Пароль успешно изменен!");
    } catch (error) {
      alert(error);
    }
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
            <form
              className={styles["user__edit-form"]}
              onSubmit={handleSubmitForm}
            >
              <h2>Редактировать</h2>
              <div className={styles["user__edit-form_fields"]}>
                <div>
                  <label htmlFor='login'>Логин: </label>
                  <input
                    type='text'
                    id='login'
                    name='login'
                    value={editedUserData.login}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor='email'>Email: </label>
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
            <button
              className={styles.btn}
              onClick={() => {
                setIsEditing(true);
                setIsChangingPassword(false);
              }}
            >
              Редактировать
            </button>
          )}

          {isChangingPassword ? (
            <form className={styles["user__edit-form"]}>
              <h2>Изменить пароль</h2>
              <div className={styles["user__edit-form_fields"]}>
                <div>
                  <label htmlFor='oldPassword'>Старый пароль: </label>
                  <input
                    type='password'
                    id='oldPassword'
                    name='oldPassword'
                    value={oldPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label htmlFor='newPassword'>Новый пароль: </label>
                  <input
                    type='password'
                    id='newPassword'
                    name='newPassword'
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>

              <div className={styles["user__edit-form_buttons"]}>
                <button
                  className={styles["edit-form_buttons_accept"]}
                  onClick={handleChangePassword}
                  type='button'
                >
                  Подтвердить
                </button>
                <button
                  className={styles["edit-form_buttons_decline"]}
                  onClick={() => {
                    setOldPassword("");
                    setNewPassword("");
                    setIsChangingPassword(false);
                  }}
                  type='button'
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <button
              className={styles.btn}
              onClick={() => {
                setIsChangingPassword(true);
                setIsEditing(false);
              }}
            >
              Изменить пароль
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
