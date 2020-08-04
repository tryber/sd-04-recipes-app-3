import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../../actions/apiRequest';

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
  }, []);

  const isFood = getRouteInfo(location).mainRoute === 'comidas' ? true : false;

  if (loading) return <h1>Loading...</h1>;

  const recipe = isFood ? recipeData.meals[0] : recipeData.drinks[0];

  return <div>Test</div>;
};

export default Details;
