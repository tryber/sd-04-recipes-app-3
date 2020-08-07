import * as actionType from '../actions/actionsType';

const initialState = { loading: null, data: {}, error: '' };

const recRequest = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_REC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_REC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case actionType.FETCH_REC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recRequest;
