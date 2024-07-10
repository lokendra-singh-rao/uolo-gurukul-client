import React from "react";
import searchIcon from "../../assets/searchIcon.svg";
import styles from "./SearchBar.module.css";

function SearchBar({ searchQuery, setSearchQuery, searchUsers }) {
  return (
    <div className={styles.searchBar}>
      <img
        className={styles.searchIcon}
        src={searchIcon}
        alt="searchIcon"
      />
      <input
        type="text"
        placeholder="Search by Name, or Email id"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={(e) => {
          searchUsers(e);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
