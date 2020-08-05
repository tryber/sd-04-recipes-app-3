import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../../actions/apiRequest';
import IngredientsList from './IngredientsList';
import EmbeddedVideo from './EmbeddedVideo';

const recipeKeysToArray = (recipe, key) => {
  return Object.keys(recipe)
    .filter((item) => item.startsWith(key))
    .map((item) => recipe[item])
    .filter((item) => item !== '' && item !== null);
};

const getIngredients = (recipe) => {
  const ingredientsKeys = recipeKeysToArray(recipe, 'strIngredient');
  console.log(ingredientsKeys);
  const measuresKeys = recipeKeysToArray(recipe, 'strMeasure');

  return ingredientsKeys.map((item, index) => ({
    ingredient: item,
    measure: measuresKeys[index],
  }));
};

const getRouteInfo = (location) => {
  const routeInfoArr = location.pathname
    .split('/')
    .filter((item) => item !== '');
  return { mainRoute: routeInfoArr[0], recipeId: routeInfoArr[1] };
};

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

  const isFood = getRouteInfo(location).mainRoute === 'comidas' ? true : false;
  const recipe = isFood ? recipeData.meals[0] : recipeData.drinks[0];

  return (
    <div>
      <img src={isFood ? recipe.strMealThumb : recipe.strDrinkThumb} alt="" />
      <h1>{isFood ? recipe.strMeal : recipe.strDrink}</h1>
      <h3>{isFood ? recipe.strCategory : recipe.strAlcoholic}</h3>
      <div>
        <h2>Ingredientes</h2>
        <IngredientsList ingredients={getIngredients} recipe={recipe} />
      </div>
      <div>
        <h2>Instruções</h2>
        <p>{recipe.strInstructions}</p>
      </div>
      <EmbeddedVideo isFood={isFood} recipe={recipe} />
      <div>
        <h2>Recomendadas</h2>
      </div>
    </div>
  );
};

export default Details;
