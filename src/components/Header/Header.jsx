import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/authSlice";
import image from "../../images/logo/logo.svg";
import styles from "./Header.module.css";
import { selectUserRoleString } from "../../store/authSlice";

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const roleString = useSelector(selectUserRoleString);

  const navs = [
    !isAuthenticated && { href: "/authorization", name: "Регистрация" },
    isAuthenticated &&
      roleString === "admin" && { href: "/requests", name: "Запросы" },
    isAuthenticated && { href: "/profile", name: "Профиль" },
  ].filter(Boolean);

  return (
    <header>
      <div className={styles["wrapper_logo"]}>
        <Link to='/'>
          <img src={image} alt='logo' className={styles.logo} />
        </Link>
      </div>

      <nav>
        <ul>
          {navs.map((nav) => (
            <CustomLink to={nav.href} key={nav.href}>
              {nav.name}
            </CustomLink>
          ))}

          {/* {isAuthenticated && (
            <li>
              <div
                className={styles.profileMenu}
                onClick={handleMenuToggle}
                onBlur={() => setMenuVisible(false)}
                tabIndex={0}
              >
                Профиль
                {isMenuVisible && (
                  <ul className={styles.dropdownMenu}>
                    <li>
                      <Link to='/profile'>Мой профиль</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Выйти</button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default Header;
