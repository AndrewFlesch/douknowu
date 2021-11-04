import { v4 as uuidv4 } from 'uuid';
import { SHOW, HIDE } from './types';

export const setShow = (direction, id) => dispatch => {
  if (direction === true) {
    dispatch({
      type: SHOW,
      payload: {id:id, showing:true }
    });
  } else {
    dispatch({
      type: SHOW,
      payload: {id:id, showing:false }
    });
  }


  };
