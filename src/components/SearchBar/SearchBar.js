import React from "react";
import searchIcon from "../../assets/searchIcon.svg";
import styles from "./SearchBar.module.css";

function SearchBar({ searchQuery, setSearchQuery }) {
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
          window.alert("Search will be implemented in Level 3");
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
