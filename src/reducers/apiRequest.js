import * as actionType from '../actions/actionsType';

const initialState = { loading: null, data: [], error: '' };

const apiRequest = (state = initialState, action) => {
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
        data: action.payload,
        error: '',
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
