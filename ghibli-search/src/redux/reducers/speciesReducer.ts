import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, REQUEST_SPECIES, SAVE_SPECIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  species: [],
  loading: false,
  error: '',
};

const speciesReducer = (state = INITIAL_STATE, action: IResponseAction) => {
  switch(action.type) {
  case REQUEST_SPECIES:
    return {
      ...state,
      loading: true,
    }
  case SAVE_SPECIES:
    return {
      ...state,
      species: action.payload,
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

export default speciesReducer;