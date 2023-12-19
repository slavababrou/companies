import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";
import { validatePassword, validateLogin } from "./validation";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(true);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (formData) => {
    try {
      const result = await dispatch(loginUser({ formData, rememberMe }));
      if (!result?.payload && !result?.payload?.success) {
        alert(result.error.message);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const login = formData.get("username"); // Или что-то подобное в зависимости от вашей формы
    const password = formData.get("password");

    if (validatePassword(password) && validateLogin(login))
      handleLogin(formData);
    else alert("Invalid form data.");
  };

  return (
    <div className={styles["wrapper"]}>
      <h2 className={styles["h2"]}>Вход</h2>
      <form className={styles["form"]} onSubmit={submitHandler}>
        <div className={styles["field"]}>
          <label htmlFor='username'></label>
          <Input
            className={styles["input"]}
            name='username'
            id='username'
            placeholder='username'
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor='password'></label>
          <Input
            className={styles["input"]}
            name='password'
            id='password'
            placeholder='password'
          />
        </div>
        <div className={styles["wrapper_button"]}>
          <Button className={styles["button"]}>Войти</Button>
        </div>
      </form>

      <div className={styles["links"]}>
        <div className={styles["links_no-acc"]}>
          <span>Нет аккаунта?</span>
          <div>
            <button
              className={styles["enter_link"]}
              onClick={props.authToggleHandler}
            >
              Регистрация
            </button>
          </div>
        </div>

        <label>
          <input
            type='checkbox'
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Запомнить меня
        </label>
      </div>
    </div>
  );
};

export default Login;
