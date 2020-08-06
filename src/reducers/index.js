import { combineReducers } from 'redux';
import apiRequest from './apiRequest';
import recRequest from './recRequest';

const rootReducer = combineReducers({ api: apiRequest, recommendations: recRequest });

export default rootReducer;
