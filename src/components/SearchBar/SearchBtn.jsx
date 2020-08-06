import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMeals } from '../../actions/apiRequest';

const returnEndpoint = (searchInput, radioInput, location) => {
  const endpointCheck = radioInput === 'i' ? 'filter' : 'search';
  if (location.pathname.startsWith('/comidas')) {
    return `https://www.themealdb.com/api/json/v1/1/${endpointCheck}.php?${radioInput}=${searchInput}`;
  } if (location.pathname.startsWith('/bebidas')) {
    return `https://www.thecocktaildb.com/api/json/v1/1/${endpointCheck}.php?${radioInput}=${searchInput}`;
  }
  return undefined;
};

const SearchButton = ({ searchRadio, searchInput }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const meals = useSelector((state) => state.api.data.meals);
  const drinks = useSelector((state) => state.api.data.drinks);
  if (meals && meals.length === 1) {
    history.push(`/comidas/${meals[0].idMeal}`);
  }
  if (drinks && drinks.length === 1) {
    history.push(`/bebidas/${drinks[0].idDrink}`);
  }
  if (meals === null || drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <button
      type="button"
      onClick={() => {
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

SearchButton.propTypes = {
  searchRadio: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default SearchButton;
