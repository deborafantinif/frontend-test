import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, REQUEST_FILMS, SAVE_FILMS } from '../actions/actionTypes';

const INITIAL_STATE = {
  films: [],
  loading: false,
  error: '',
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
      loading: false,
    }
  case FAILED_REQUEST:
    return {
      ...state,
      loading: true,
      error: action.payload,
    }
  default:
    return state;
  }
}

export default filmsReducer;