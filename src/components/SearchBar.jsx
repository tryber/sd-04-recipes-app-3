import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../actions/apiRequest';

const returnEndpoint = (searchInput, radioInput, location) => {
  if (location.pathname.startsWith('/comidas')) {
    if (radioInput === 'i') {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?${radioInput}=${searchInput}`;
    }
    return `https://www.themealdb.com/api/json/v1/1/search.php?${radioInput}=${searchInput}`;
  } else if (location.pathname.startsWith('/bebidas')) {
    if (radioInput === 'i') {
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${radioInput}=${searchInput}`;
    }
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?${radioInput}=${searchInput}`;
  }
};

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
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
          value="i"
          checked={searchRadio === 'i'}
          onChange={(event) => setSearchRadio(event.target.value)}
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredient">Ingrediente</label>
        <input
          type="radio"
          name="search-radio"
          id="name"
          value="s"
          checked={searchRadio === 's'}
          onChange={(event) => setSearchRadio(event.target.value)}
          data-testid="name-search-radio"
        />
        <label htmlFor="name">Nome</label>
        <input
          type="radio"
          name="search-radio"
          id="first-letter"
          value="f"
          checked={searchRadio === 'f'}
          onChange={(event) => setSearchRadio(event.target.value)}
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first-letter">Primeira letra</label>
      </div>
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          if (searchRadio === 'f' && searchInput.length > 1) {
            return alert('Sua busca deve conter somente 1 (um) caracter');
          }
          dispatch(
            fetchMeals(returnEndpoint(searchInput, searchRadio, location)),
          );
        }}
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
