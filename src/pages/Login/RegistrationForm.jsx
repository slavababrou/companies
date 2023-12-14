import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./RegistrationForm.module.css";
import axios from "axios";
import { validateLogin, validateEmail, validatePassword } from "./validation";
import { Link } from "react-router-dom";

const RegistrationForm = (props) => {
  const register = async (formData) => {
    try {
      await axios.post("http://localhost:3192/api/user/register", formData);
      console.log("User created");
      props.authToggleHandler();
      return 0;
    } catch (error) {
      console.error("Error creating user:", error.message);
      return 1;
    }
  };

  const postUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { login, email, password } = Object.fromEntries(formData.entries());

    if (!validateLogin(login)) {
      console.error(
        "Invalid login. Login should be between 3 and 20 characters."
      );
      return;
    }

    if (!validatePassword(password)) {
      console.error(
        "Invalid password length. Password should be at least 8 characters long."
      );
      return;
    }

    if (!validateEmail(email)) {
      console.error("Invalid email address. (should be with @ and '.')");
      return;
    }

    // For user
    formData.append("user_avatar", "../../images/vlad.img");
    formData.append("roleId", "1");

    try {
      await register(formData);
    } catch (error) {
      console.error("Error checking or creating user:", error.message);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <h2 className={styles["h2"]}>Регистрация</h2>
      <form className={styles["form"]} onSubmit={postUser}>
        <div className={styles["field"]}>
          <label htmlFor='login'></label>
          <Input
            className={styles["input"]}
            name='login'
            id='login'
            placeholder='login'
          />
        </div>

        <div className={styles["field"]}>
          <label htmlFor='email'></label>
          <Input
            className={styles["input"]}
            name='email'
            id='email'
            placeholder='email'
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
          <Button className={styles["button"]}>Зарегистрироваться</Button>
        </div>
      </form>
      <div>
        <span className={styles["enter_span"]}>
          Уже есть аккаунт?
          <button
            className={styles["enter_link"]}
            onClick={props.authToggleHandler}
          >
            Войти
          </button>
        </span>
      </div>
    </div>
  );
};

export default RegistrationForm;
