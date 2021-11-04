import {
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR
} from '../actions/types';

const initialState = {
  categories: '',
  loading: true,
  error: {}
}

export default function categoriesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_CATEGORIES:
      return{
        ...state,
        loading: false,
        categories: payload
      };
      case GET_CATEGORIES_ERROR:
      return {
        ...state,
        categories: null,
        loading: false
      };
    default:
      return state;
  }
}
