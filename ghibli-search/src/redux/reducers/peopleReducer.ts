import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, REQUEST_PEOPLE, SAVE_PEOPLE } from '../actions/actionTypes';

const INITIAL_STATE = {
  people: [],
  loading: false,
  error: '',
};

const peopleReducer = (state = INITIAL_STATE, action: IResponseAction) => {
  switch(action.type) {
  case REQUEST_PEOPLE:
    return {
      ...state,
      loading: true,
    }
  case SAVE_PEOPLE:
    return {
      ...state,
      people: action.payload,
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

export default peopleReducer;