import * as actionType from '../actions/actionsType';

const INITIAL_STATE = { loading: true, data: [], error: '' };

const apiRequest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.FETCH_MEALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_MEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Object.values(action.payload)[0].slice(0, 12),
      };
    case actionType.FETCH_MEALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default apiRequest;
