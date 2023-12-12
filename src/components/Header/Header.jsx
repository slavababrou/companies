import image from "../../images/logo/logo.svg";
import styles from "./Header.module.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const username = useSelector((state) => state.auth.user?.username);

  const navs = [
    {
      href: "/authorization",
      name: "Регистрация",
    },
    {
      href: "/catalog",
      name: username,
    },
  ];

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
            <CustomLink to={nav.href}>{nav.name}</CustomLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li>
      <Link to={to} {...props} className={isActive ? `${styles.active}` : ""}>
        {children}
      </Link>
    </li>
  );
}

export default Header;
