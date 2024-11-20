// SearchBar.js
import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="상품 검색" 
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;