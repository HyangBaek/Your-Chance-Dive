// SearchResults.js
import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResults;