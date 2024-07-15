import React, { useEffect } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import styles from "./SearchBar.module.css";

function SearchBar({
  searchQuery,
  setSearchQuery,
  searchUsers,
  setCurrentPage,
}) {
  useEffect(() => {
    if (searchQuery?.length === 0) {
      searchUsers();
    }
  }, [searchQuery]);

  return (
    <div className={styles.searchBar}>
      <img
        className={styles.searchIcon}
        src={searchIcon}
        alt="searchIcon"
      />
      <input
        type="search"
        placeholder="Search by Name, or Email id"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setCurrentPage(1);
            searchUsers();
          }
        }}
      />
      <button
        onClick={(e) => {
          setCurrentPage(1);
          searchUsers();
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
