import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./RegistrationForm.module.css";
import { isValidFormData } from "./validation";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";

const RegistrationForm = (props) => {
  const dispatch = useDispatch();

  const register = async (formData) => {
    try {
      const result = await dispatch(registerUser(formData));
      if (result.payload && result.payload.success) {
        alert("Аккаунт успешно создан!");
        props.authToggleHandler();
        return 0;
      } else {
        alert(result.error.message);
        return 1;
      }
    } catch (error) {
      alert("Error creating user:", error.message);
      return 1;
    }
  };

  const postUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { login, email, password } = Object.fromEntries(formData.entries());

    if (!isValidFormData(login, email, password)) {
      alert("Invalid form data.");
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
