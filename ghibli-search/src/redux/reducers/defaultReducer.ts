import { ResponseAction } from '../../interfaces/actions';

const INITIAL_STATE = {};

const exampleReducer = (state = INITIAL_STATE, action: ResponseAction) => {
  switch(action.type) {
  default:
    return state;
  }
}

export default exampleReducer;