import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../../actions/apiRequest';
import IngredientsList from './IngredientsList';
import EmbeddedVideo from './EmbeddedVideo';

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

// Returns in an object the main route (comidas or bebidas) and the recipe ID
const getRouteInfo = (location) => {
  const routeInfoArr = location.pathname
    .split('/')
    .filter((item) => item !== '');
  return { mainRoute: routeInfoArr[0], recipeId: routeInfoArr[1] };
};

// Returns a string with the correct endpoint based on the URL main route
const returnEndpoint = (location) => {
  const routeDetails = getRouteInfo(location);
  return routeDetails.mainRoute === 'comidas'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${routeDetails.recipeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${routeDetails.recipeId}`;
};

const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const recipeData = useSelector((state) => state.apiRequest.data);
  const loading = useSelector((state) => state.apiRequest.loading);

  useEffect(() => {
    dispatch(fetchMeals(returnEndpoint(location)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <h1>Loading...</h1>;

  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const recipe = isFood ? recipeData.meals[0] : recipeData.drinks[0];

  return (
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
      <IngredientsList ingredients={getIngredients} recipe={recipe} />
      <div>
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <EmbeddedVideo isFood={isFood} recipe={recipe} />
      <div>
        <h2>Recomendadas</h2>
      </div>
    </div>
  );
};

export default Details;