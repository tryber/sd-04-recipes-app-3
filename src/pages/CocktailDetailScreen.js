// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Recommendations from '../components/Recommendations/Recommendations';
// import { fetchRec } from '../actions/recRequest';

// // Função q separa as 6 primeiras recomendações caso os dados da requisição
// // inicial já tenham sido armazenados na store
// const getSixRecs = (meals, sixRecs) => {
//   for (let i = 0; i < meals.length; i += 1) {
//     if (i > 5) break;
//     sixRecs.push(meals[i]);
//   }
// };

// const CocktailDetailScreen = () => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.recommendations.loading);
//   const meals = useSelector((state) => state.recommendations.data.meals);
//   const sixRecs = [];

//   useEffect(() => {
//     dispatch(fetchRec('https://www.themealdb.com/api/json/v1/1/search.php?s='));
//   }, [dispatch]);

//   if (meals !== undefined) getSixRecs(meals, sixRecs);

//   return (
//     <div>
//       <h1>Detalhes - Bebida</h1>
//       {loading === null ? 'Loading...' : <Recommendations sixRecs={sixRecs} />}
//     </div>
//   );
// };

// export default CocktailDetailScreen;
