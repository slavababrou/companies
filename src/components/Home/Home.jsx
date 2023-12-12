import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NewCommentsList from "../NewCommentsList/NewCommentsList";
import SearchContent from "../SearchContent/SearchContent";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={styles[`content__search`]}>
        <Header />
        <div className={styles[`content__search_wrapper`]}>
          <SearchContent></SearchContent>
        </div>
      </div>

      <NewCommentsList />
      <Footer />
    </div>
  );
};

export default Home;
