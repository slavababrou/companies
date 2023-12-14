import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    dispatch(loginUser(formData));
    navigate("/");
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
          <button
            className={styles["enter_link"]}
            onClick={props.authToggleHandler}
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
