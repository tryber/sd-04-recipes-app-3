import React from 'react';

const SearchInput = ({ searchInput, setSearchInput }) => {
  return (
    <input
      type="text"
      placeholder="Buscar Receita"
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      data-testid="search-input"
    />
  );
};

export default SearchInput;
