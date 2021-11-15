import { SHOW } from '../actions/types';

const initialState = '';

export default function alertSwitch(state = initialState, action){
  const { type, payload } = action;

  switch(type) {
    case SHOW:
      return payload;

    default:
      return state;
  }
}
