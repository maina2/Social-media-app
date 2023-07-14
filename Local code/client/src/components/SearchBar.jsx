import React from 'react';
import './searchbar.css'

const SearchBar = () => {
  const handleSearch = (e) => {
    
    const searchTerm = e.target.value;
   
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
