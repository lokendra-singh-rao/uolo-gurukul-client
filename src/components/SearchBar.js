import React from 'react';
import searchIcon from '../images/searchIcon.svg'

function SearchBar({searchQuery, setSearchQuery}) {
  return (
    <div className="search-bar">
        <img className='search-icon' src={searchIcon} alt='searchIcon'/>
      <input type="text" placeholder="Search by Name, or Email id" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
      <button onClick={(e) => {window.alert("Search will be implemented in Level 3")}}>Search</button>
    </div>
  );
}

export default SearchBar;