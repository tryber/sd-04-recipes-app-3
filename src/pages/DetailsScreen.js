import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../actions/apiRequest';
import IngredientsList from '../components/DetailsScreen/IngredientsList';
import EmbeddedVideo from '../components/DetailsScreen/EmbeddedVideo';
import { Recommendations } from '../components';
import { fetchRec } from '../actions/recRequest';

// Função q separa as 6 primeiras recomendações caso os dados da requisição
// inicial já tenham sido armazenados na store
const getSixRecs = (recs, sixRecs) => {
  for (let i = 0; i < recs.length; i += 1) {
    if (i > 5) break;
    sixRecs.push(recs[i]);
  }
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
  // if (operator === 'search') routeDetails.recipeId = '';
  return routeDetails.mainRoute === 'comidas'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${routeDetails.recipeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${routeDetails.recipeId}`;
};

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const recipeData = useSelector((state) => state.api.data);
  const loading = useSelector((state) => state.api.loading);
  const load = useSelector((state) => state.recommendations.loading);
  const rec = location.pathname.startsWith('/comidas') ? 'Drink' : 'Meal';
  const recs = useSelector((state) => state.recommendations.data[`${rec.toLowerCase()}s`]);
  const sixRecs = [];

  if (recs !== undefined) getSixRecs(recs, sixRecs);

  useEffect(() => {
    dispatch(fetchMeals(returnEndpoint(location)));
    (location.pathname.startsWith('/comidas')
      ? dispatch(fetchRec('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='))
      : dispatch(fetchRec('https://www.themealdb.com/api/json/v1/1/search.php?s=')))
  }, [dispatch, location]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <h1>Loading...</h1>;

  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const recipe = Object.values(recipeData)[0][0];
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
        {load === null ? 'Loading...' : <Recommendations sixRecs={sixRecs} rec={rec} />}
      </div>
    </div>
  );
};

export default DetailsScreen;
