import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, GET_FILMS_BY_TITLE, HANDLE_MORE_FILTERS, REQUEST_FILMS, SAVE_FILMS } from '../actions/actionTypes';

const INITIAL_STATE = {
  films: [],
  allFilms: [],
  loading: false,
  error: '',
  isMoreFiltersSelected: false,
};

const filmsReducer = (state = INITIAL_STATE, action: IResponseAction) => {
  switch(action.type) {
  case REQUEST_FILMS:
    return {
      ...state,
      loading: true,
    }
  case SAVE_FILMS:
    return {
      ...state,
      films: action.payload,
      allFilms: action.payload,
      loading: false,
    }
  case FAILED_REQUEST:
    return {
      ...state,
      loading: true,
      error: action.payload,
    }
  case GET_FILMS_BY_TITLE:
    return {
      ...state,
      films: action.payload,
    }
  case HANDLE_MORE_FILTERS:
    return {
      ...state,
      isMoreFiltersSelected: action.payload,
    }
  default:
    return state;
  }
}

export default filmsReducer;