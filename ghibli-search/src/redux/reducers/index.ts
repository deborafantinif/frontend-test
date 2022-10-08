import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import peopleReducer from './peopleReducer';
import locationsReducer from './locationsReducer';
import speciesReducer from './speciesReducer';


const rootReducer = combineReducers({ 
  filmsReducer,
  peopleReducer,
  locationsReducer,
  speciesReducer,
})

export default rootReducer;