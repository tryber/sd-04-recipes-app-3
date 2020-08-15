import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import {
  IngredientsList,
  EmbeddedVideo,
  FavoriteBtn,
  ShareBtn,
} from '../components';
import { fetchRec } from '../actions/recRequest';
import { setLS, getRouteInfo } from '../helpers';
import Recommendations from '../components/Recommendations/Recommendations';
import StateRecipeBtn from '../components/DetailsScreen/StateRecipeBtn';

const keysLS = () => {
  const aDoneRecipes = [
    {
      id: 0,
      type: '',
      area: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: '',
      tags: [],
    },
  ];
  const oInProgressRecipes = {
    cocktails: { 178319: [] },
    meals: { 52771: [] },
  };
  setLS('doneRecipes', aDoneRecipes);
  return setLS('inProgressRecipes', oInProgressRecipes);
};

// Função q separa as 6 primeiras recomendações caso os dados da requisição
// inicial já tenham sido armazenados na store
const getSixRecs = (recs, sixRecs) => {
  for (let i = 0; i < recs.length; i += 1) {
    if (i > 5) break;
    sixRecs.push(recs[i]);
  }
  return sixRecs;
};

// Get the desired object key from the recipe and returns an array
const recipeKeysToArray = (recipe, key) =>
  Object.keys(recipe)
    .filter((item) => item.startsWith(key))
    .map((item) => recipe[item])
    .filter((item) => item !== '' && item !== null);

// Returns an array of objects with ingredient/measure pairs
const getIngredients = (recipe) => {
  const ingredientsKeys = recipeKeysToArray(recipe, 'strIngredient');
  const measuresKeys = recipeKeysToArray(recipe, 'strMeasure');

  return ingredientsKeys.map((item, index) => ({
    ingredient: item,
    measure: measuresKeys[index],
  }));
};

// Returns a string with the correct endpoint based on the URL main route
const returnEndpoint = (location) => {
  const routeDetails = getRouteInfo(location);
  return routeDetails.mainRoute === 'comidas'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${routeDetails.recipeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${routeDetails.recipeId}`;
};

// ===== Funções criadas para diminuir complexidade cognitiva =====
const fetchs = (dispatch, location) => {
  dispatch(fetchMeals(returnEndpoint(location)));

  // Fetch para recomendações
  if (location.pathname.startsWith('/comidas')) {
    dispatch(
      fetchRec('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='),
    );
  } else {
    dispatch(fetchRec('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }
};

const mealsData = (isFood, recipe) => (
  <div>
    <img
      src={isFood ? recipe.strMealThumb : recipe.strDrinkThumb}
      alt="Recipe food"
      data-testid="recipe-photo"
    />
    <h1 data-testid="recipe-title">
      {isFood ? recipe.strMeal : recipe.strDrink}
    </h1>
    <h3 data-testid="recipe-category">
      {isFood ? recipe.strCategory : recipe.strAlcoholic}
    </h3>
  </div>
);

const getData = (selector, rec) => ({
  recipeData: selector((state) => state.api.data),
  loading: selector((state) => state.api.loading),
  load: selector((state) => state.recommendations.loading),
  recs: selector(
    (state) => state.recommendations.data[`${rec.toLowerCase()}s`],
  ),
});
// ===== Fim =====

const DetailsScreen = ({
  match: {
    params: { id: idPage },
  },
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const rec = location.pathname.startsWith('/comidas') ? 'Drink' : 'Meal';
  const store = getData(useSelector, rec);
  const sixRecs = [];

  if (store.recs !== undefined) getSixRecs(store.recs, sixRecs);

  useEffect(() => {
    fetchs(dispatch, location);
    keysLS();
  }, []); // eslint-disable-line

  if (store.loading) return <h1>Loading...</h1>;

  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const recipe = Object.values(store.recipeData)[0][0];

  return (
    <div>
      {mealsData(isFood, recipe)}
      <ShareBtn />
      <FavoriteBtn />
      <IngredientsList ingredients={getIngredients} recipe={recipe} />
      <div>
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <EmbeddedVideo isFood={isFood} recipe={recipe} />
      <div>
        {store.load === null ? (
          'Loading...'
        ) : (
          <Recommendations sixRecs={sixRecs} rec={rec} />
        )}
      </div>
      <StateRecipeBtn idPage={idPage} rec={rec} />
    </div>
  );
};

DetailsScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsScreen;
