import React, { useState, useEffect, useRef } from "react";
import styles from "./Search.module.css";
import cn from "classnames";
import image from "../../images/search.svg";
import SearchItem from "../SeacrhItem/SearchItem";
import axios from "axios";
import { Link } from "react-router-dom";

function Search({ placeholder, className, inputClassName, ...props }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

  const searchContainerRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3192/api/company`);
      setCompanies(response.data.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (searchText.trim()) {
      setSearchResults(
        companies.filter((company) =>
          company.name.toLowerCase().startsWith(searchText.toLowerCase())
        )
      );
      setIsSearchResultsVisible(true);
    } else {
      setSearchResults([]);
      //setIsSearchResultsVisible(false);
    }
  }, [searchText, companies]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setIsSearchResultsVisible(false);
    }
  };

  return (
    <>
      <div className={cn(styles.wrapper, className)} ref={searchContainerRef}>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => {
            setIsSearchResultsVisible(true);
            handleSearch();
          }}
          className={cn(styles.search, inputClassName)}
          placeholder={placeholder}
          {...props}
          type='text'
        />
        <div className={styles[`icon-wrapper`]}>
          <img src={image} className={styles.icon} alt='search' />
        </div>
      </div>
      {isSearchResultsVisible && (
        <div className={styles["seacrh-items__wrappeer"]}>
          {searchText
            ? searchResults.slice(0, 3).map((company) => (
                <Link key={company.id} to={`/company/${company.id}`}>
                  <SearchItem company={company} />
                </Link>
              ))
            : companies.slice(0, 3).map((company) => (
                <Link key={company.id} to={`/company/${company.id}`}>
                  <SearchItem company={company} />
                </Link>
              ))}
        </div>
      )}
    </>
  );
}

export default Search;
