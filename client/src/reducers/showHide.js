import { SHOW, HIDE } from '../actions/types';

const initialState = '';

export default function alertSwitch(state = initialState, action){
  const { type, payload } = action;

  switch(type) {
    case SHOW:
      return payload;

    case HIDE:
      return payload;

    default:
      return state;
  }
}
