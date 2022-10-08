import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import peopleReducer from './peopleReducer';


const rootReducer = combineReducers({ filmsReducer, peopleReducer })

export default rootReducer;