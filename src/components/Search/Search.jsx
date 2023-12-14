import styles from "./Search.module.css";
import cn from "classnames";
import image from "../../images/search.svg";
import { useState, useEffect } from "react";
import SearchItem from "../SeacrhItem/SearchItem";
import axios from "axios";
import { Link } from "react-router-dom";

function Search({ placeholder, className, inputClassName, ...props }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [companies, setCompanies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3192/api/company`);
      setCompanies(response.data.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (searchText.trim())
      setSearchResults(
        companies.filter((company) => {
          return company.name
            .toLowerCase()
            .startsWith(searchText.toLowerCase());
        })
      );
    else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <input
          value={searchText}
          onChange={(e) => {
            e.preventDefault();
            setSearchText(e.target.value);
          }}
          className={cn(styles.search, inputClassName)}
          placeholder={placeholder}
          {...props}
          type='text'
        ></input>
        <div className={styles[`icon-wrapper`]} onClick={handleSearch}>
          <img src={image} className={styles.icon} alt='search'></img>
        </div>
      </div>
      <div className={styles["seacrh-items__wrappeer"]}>
        {searchResults.map((company) => {
          const linkTo = `/company/${company.id}`;
          return (
            <Link key={company.id} to={linkTo}>
              <SearchItem company={company} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Search;
