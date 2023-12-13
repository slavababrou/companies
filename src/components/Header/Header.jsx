import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "../../store/authSlice";
import image from "../../images/logo/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user?.user?.login);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
  };

  const handleMenuToggle = () => {
    setMenuVisible(!isMenuVisible);
  };

  const navs = [
    !isAuthenticated && { href: "/authorization", name: "Регистрация" },
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
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li>
      <Link to={to} {...props} className={isActive ? `${styles.active}` : ""}>
        {children}
      </Link>
    </li>
  );
};

export default Header;
