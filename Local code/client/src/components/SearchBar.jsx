import React from 'react';
import './searchbar.css'

const SearchBar = () => {
  const handleSearch = (e) => {
    // Handle the search functionality
    const searchTerm = e.target.value;
    // Perform any necessary actions based on the search term
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="search-input"
    />
  );
};

export default SearchBar;
