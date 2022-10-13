import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import peopleReducer from './peopleReducer';
import locationsReducer from './locationsReducer';
import speciesReducer from './speciesReducer';
import vehiclesReducer from './vehiclesReducer';


const rootReducer = combineReducers({ 
  filmsReducer,
  peopleReducer,
  locationsReducer,
  speciesReducer,
  vehiclesReducer,
})

export default rootReducer;