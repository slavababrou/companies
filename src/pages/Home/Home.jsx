import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NewCommentsList from "../../components/HomeRevievsList/HomeRevievsList";
import SearchContent from "../../components/SearchContent/SearchContent";
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
