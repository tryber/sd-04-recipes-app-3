import * as actionType from './actionsType';

export const fetchFoodRequest = () => ({ type: actionType.FETCH_FOOD_REQUEST });

export const fetchFoodSuccess = (foods) => ({
  type: actionType.FETCH_FOOD_SUCCESS,
  payload: foods,
});

export const fetchFoodsFailure = (error) => ({
  type: actionType.FETCH_FOOD_FAILURE,
  payload: error,
});

export const fetchFoods = (url) => (dispatch) => {
  dispatch(fetchFoodRequest);
  return fetch(url)
    .then((response) => response.json())
    .then((json) => dispatch(fetchFoodSuccess(json)))
    .catch((error) => dispatch(fetchFoodsFailure(error)));
};
