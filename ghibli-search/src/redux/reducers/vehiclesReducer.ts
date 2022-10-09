import { IResponseAction } from '../../interfaces/actions';
import { FAILED_REQUEST, GET_VEHICLES_BY_FILTERS, GET_VEHICLES_BY_NAME, REQUEST_VEHICLES, SAVE_VEHICLES } from '../actions/actionTypes';

const INITIAL_STATE = {
  vehicles: [],
  allVehicles: [],
  loading: false,
  error: '',
};

const vehiclesReducer = (state = INITIAL_STATE, action: IResponseAction) => {
  switch(action.type) {
  case REQUEST_VEHICLES:
    return {
      ...state,
      loading: true,
    }
  case SAVE_VEHICLES:
    return {
      ...state,
      vehicles: action.payload,
      allVehicles: action.payload,
      loading: false,
    }
  case FAILED_REQUEST:
    return {
      ...state,
      loading: true,
      error: action.payload,
    }
  case GET_VEHICLES_BY_NAME:
    return {
      ...state,
      vehicles: action.payload,
    }
  case GET_VEHICLES_BY_FILTERS:
    return {
      ...state,
      vehicles: action.payload,
    }
  default:
    return state;
  }
}

export default vehiclesReducer;