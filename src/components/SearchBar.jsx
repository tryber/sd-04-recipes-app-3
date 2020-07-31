import React, { useState } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  return (
    <form>
      <input
        type="text"
        placeholder="Buscar Receita"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        data-testid="search-input"
      />
      <div className="radio-btns">
        <input
          type="radio"
          name="search-radio"
          id="ingredient"
          value="ingredient"
          checked={searchRadio === 'ingredient'}
          onChange={(event) => setSearchRadio(event.target.value)}
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredient">Ingrediente</label>
        <input
          type="radio"
          name="search-radio"
          id="name"
          value="name"
          checked={searchRadio === 'name'}
          onChange={(event) => setSearchRadio(event.target.value)}
          data-testid="name-search-radio"
        />
        <label htmlFor="name">Nome</label>
        <input
          type="radio"
          name="search-radio"
          id="first-letter"
          value="first-letter"
          checked={searchRadio === 'first-letter'}
          onChange={(event) => setSearchRadio(event.target.value)}
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first-letter">Primeira letra</label>
      </div>
      <button type="submit" data-testid="exec-search-btn">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
