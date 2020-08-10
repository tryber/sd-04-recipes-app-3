import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../actions/apiRequest';
import IngredientsList from '../components/DetailsScreen/IngredientsList';
import EmbeddedVideo from '../components/DetailsScreen/EmbeddedVideo';
import FavoriteBtn from '../components/DetailsScreen/FavoriteBtn';
import ShareBtn from '../components/DetailsScreen/ShareBtn';
import { getRouteInfo } from '../helpers';

// Get the desired object key from the recipe and returns an array
const recipeKeysToArray = (recipe, key) => Object.keys(recipe)
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

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const recipeData = useSelector((state) => state.api.data);
  const loading = useSelector((state) => state.api.loading);

  useEffect(() => {
    dispatch(fetchMeals(returnEndpoint(location)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <h1>Loading...</h1>;

  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const recipe = recipeData[0];

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
      <ShareBtn />
      <FavoriteBtn />
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

export default DetailsScreen;
