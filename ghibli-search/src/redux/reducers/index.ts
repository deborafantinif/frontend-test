import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import peopleReducer from './peopleReducer';
import locationsReducer from './locationsReducer';


const rootReducer = combineReducers({ 
  filmsReducer,
  peopleReducer,
  locationsReducer,
})

export default rootReducer;