import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, REQUEST_LOCATIONS, SAVE_LOCATIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  locations: [],
  loading: false,
  error: '',
};

const locationsReducer = (state = INITIAL_STATE, action: IResponseAction) => {
  switch(action.type) {
  case REQUEST_LOCATIONS:
    return {
      ...state,
      loading: true,
    }
  case SAVE_LOCATIONS:
    return {
      ...state,
      locations: action.payload,
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

export default locationsReducer;