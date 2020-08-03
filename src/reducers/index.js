import { combineReducers } from 'redux';
import apiRequest from './apiRequest';

const rootReducer = combineReducers({ api: apiRequest });

export default rootReducer;
