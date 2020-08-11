import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import IngredientsList from '../components/DetailsScreen/IngredientsList';
import EmbeddedVideo from '../components/DetailsScreen/EmbeddedVideo';
import { Recommendations } from '../components';
import { fetchRec } from '../actions/recRequest';
import { setLS, getLS } from '../helpers';
import '../css/DetailsScreen.css';

// Função IIFE - Immediately Invoked Function Expression
(() => {
  const aDoneRecipes = [{
    id: 0,
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  }];
  const oInProgressRecipes = {
    cocktails: { 178319: [] },
    meals: { 52771: [] },
  };
  setLS('doneRecipes', aDoneRecipes);
  return setLS('inProgressRecipes', oInProgressRecipes);
})();

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

// ===== Funções criadas para diminuir complexidade cognitiva =====
const fetchs = (dispatch, location) => {
  dispatch(fetchMeals(returnEndpoint(location)));

  // Fetch para recomendações
  if (location.pathname.startsWith('/comidas')) {
    dispatch(fetchRec('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
  } else {
    dispatch(fetchRec('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }
};

const getData = (selector, rec) =>
  ({
    recipeData: selector((state) => state.api.data),
    loading: selector((state) => state.api.loading),
    load: selector((state) => state.recommendations.loading),
    recs: selector((state) => state.recommendations.data[`${rec.toLowerCase()}s`]),
  });

const recipeInfos = (isFood, recipe) =>
  <div>
    <img
      src={isFood ? recipe.strMealThumb : recipe.strDrinkThumb}
      alt="Recipe food"
      data-testid="recipe-photo"
    />
    <h1 data-testid="recipe-title">
      {isFood ? recipe.strMeal : recipe.strDrink}
    </h1>
  </div>;
// ===== Fim =====

const redirect = (history, location) =>
  history.push(`${location.pathname}/in-progress`);

const checkProgress = (page, idPage) =>
  Object.keys(getLS('inProgressRecipes')[page])
    .map((idProgress) => idProgress === idPage)
    .includes(true);

const showBtnState = (idPage, rec) => {
  const page = (`${rec.toLowerCase()}s` === 'meals' ? 'cocktails' : 'meals');
  if (document.getElementById('btn-state') !== null) {
    const btn = document.getElementById('btn-state');
    const idDone = getLS('doneRecipes')[0].id;
    if (idDone === +(idPage)) {
      btn.style.display = 'none';
      return true;
    }
    if (checkProgress(page, idPage)) {
      btn.style.display = 'initial';
      btn.textContent = 'Continuar Receita';
      return true;
    } else {
      btn.style.display = 'initial';
      btn.textContent = 'Iniciar Receita';
      return true;
    }
  }
  return true;
};

// console.log(typeof idDone, typeof +(idPage), idDone === +(idPage))
// console.log('if 1')

const DetailsScreen = ({ match: { params: { id: idPage } } }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const rec = location.pathname.startsWith('/comidas') ? 'Drink' : 'Meal';
  const store = getData(useSelector, rec);
  const sixRecs = [];

  if (store.recs !== undefined) getSixRecs(store.recs, sixRecs);

  useEffect(() => {
    fetchs(dispatch, location);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (store.loading) return <h1>Loading...</h1>;

  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const recipe = Object.values(store.recipeData)[0][0];
  return (
    <div>
      {recipeInfos(isFood, recipe)}
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
        {store.load === null ?
          'Loading...' : <Recommendations sixRecs={sixRecs} rec={rec} />
        }
      </div>
      <button
        id="btn-state" className="btn-state" data-testid="start-recipe-btn"
        onClick={() => redirect(history, location)}
      />
      {showBtnState(idPage, rec)}
    </div>
  );
};

DetailsScreen.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DetailsScreen;
