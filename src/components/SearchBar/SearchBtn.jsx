import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../../actions/apiRequest';

const returnEndpoint = (searchInput, radioInput, location) => {
  const endpointCheck = radioInput === 'i' ? 'filter' : 'search';
  if (location.pathname.startsWith('/comidas')) {
    return `https://www.themealdb.com/api/json/v1/1/${endpointCheck}.php?${radioInput}=${searchInput}`;
  } else if (location.pathname.startsWith('/bebidas')) {
    return `https://www.thecocktaildb.com/api/json/v1/1/${endpointCheck}.php?${radioInput}=${searchInput}`;
  }
  return undefined;
};

const SearchButton = ({ searchRadio, searchInput }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
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

        return undefined;
      }}
      data-testid="exec-search-btn"
    >
      Buscar
    </button>
  );
};

export default SearchButton;
