// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Recommendations from '../components/Recommendations/Recommendations';
// import { fetchRec } from '../actions/recRequest';

// // Função q separa as 6 primeiras recomendações caso os dados da requisição
// // inicial já tenham sido armazenados na store
// const getSixRecs = (drinks, sixRecs) => {
//   for (let i = 0; i < drinks.length; i += 1) {
//     if (i > 5) break;
//     sixRecs.push(drinks[i]);
//   }
// };

// const MealDetailScreen = () => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.recommendations.loading);
//   const drinks = useSelector((state) => state.recommendations.data.drinks);
//   const sixRecs = [];

//   useEffect(() => {
//     dispatch(fetchRec('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
//   }, [dispatch]);

//   if (drinks !== undefined) getSixRecs(drinks, sixRecs);

//   return (
//     <div>
//       <h1>Detalhes - Comida</h1>
//       {loading === null ? 'Loading...' : <Recommendations sixRecs={sixRecs} />}
//     </div>
//   );
// };

// export default MealDetailScreen;
