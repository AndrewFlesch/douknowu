import { SHOW } from './types';

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
