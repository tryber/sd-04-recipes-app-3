import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recommendations from '../components/Recommendations/Recommendations';
import { fetchRec } from '../actions/recRequest';

const MealDetailScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.recommendations.loading);
  const drinks = useSelector(state => state.recommendations.data.drinks);
  let sixRecs = [];

  useEffect(() => {
    dispatch(fetchRec('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
  }, [dispatch]);

  if (drinks !== undefined) {
    for (let i = 0; i < drinks.length; i += 1) {
      if (i > 5) break;
      sixRecs.push(drinks[i]);
    }
  }

  return (
    <div>
      <h1>Detalhes - Comida</h1>
      {loading === null ? 'Loading...' : <Recommendations sixRecs={sixRecs} />}
    </div>
  );
};

export default MealDetailScreen;
