import React from 'react';
import './SearchBar.css';   

const SearchBar = () => {
  return (
    <div className="searchBox">
        <h1>SlugHub</h1>
      <form className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
        />
        <button type="submit" className="search-button"><img className= 'search-icon' src='/images/search-icon-png-21.png' alt='searchIcon'/></button>
      </form>
    </div>
  );
};

export default SearchBar;
