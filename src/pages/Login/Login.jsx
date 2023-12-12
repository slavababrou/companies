import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import axios from "axios";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3192/api/user/login",
        formData
      );

      const username = response.data.user.login;
      const token = response.data.token;

      console.log("Успешный ответ. Логин:", username);

      dispatch(login({ username: username }));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error(
        "Ошибка:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    handleLogin(formData);
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
        <span>Нет аккаунта?</span>
        <div>
          <a onClick={props.authToggleHandler}>Регистрация</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
