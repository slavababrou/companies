import styles from "./AuthLayout.module.css";
import image from "../../images/logo/logo.svg";
import Login from "../../pages/Login/Login";
import RegistrationForm from "../../pages/Login/RegistrationForm";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const AuthLayout = () => {
  const [authToggle, setAuthToggle] = useState(false);
  const authToggleHandler = () => setAuthToggle(!authToggle);

  // const isLoggedIn = localStorage.getItem("token");
  // if (isLoggedIn) {
  //   return <Navigate to='/' />;
  // }

  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <Link to='/'>
          <img src={image} alt='logo'></img>
        </Link>
      </div>
      <div className={styles["content"]}>
        {!authToggle ? (
          <Login authToggleHandler={authToggleHandler} />
        ) : (
          <RegistrationForm authToggleHandler={authToggleHandler} />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
