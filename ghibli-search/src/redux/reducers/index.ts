import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';


const rootReducer = combineReducers({ filmsReducer })

export default rootReducer;