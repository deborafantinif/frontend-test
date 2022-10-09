import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, GET_PEOPLE_BY_FILTERS, GET_PEOPLE_BY_NAME, REQUEST_PEOPLE, SAVE_PEOPLE } from '../actions/actionTypes';

const INITIAL_STATE = {
  people: [],
  allPeople: [],
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
      allPeople: action.payload,
      loading: false,
    }
  case FAILED_REQUEST:
    return {
      ...state,
      loading: true,
      error: action.payload,
    }
  case GET_PEOPLE_BY_NAME:
    return {
      ...state,
      people: action.payload,
    }
  case GET_PEOPLE_BY_FILTERS:
    return {
      ...state,
      people: action.payload,
    }
  default:
    return state;
  }
}

export default peopleReducer;