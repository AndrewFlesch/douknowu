import {
  ADD_ENTRY_SUCCESS,
  GET_RECENT_ENTRIES,
  GET_ENTRY_ERROR,
  ADD_ENTRY_ERROR,
  DELETE_ENTRY,
  ENTRY_ERROR,
  END_ENTRY_SUCCESS,
  EDIT_ENTRY_SUCCESS
} from '../actions/types';

const initialState = {
  entries: [],
  loading: true,
  error: {}
}

export default function entriesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_ENTRY_SUCCESS:
      return{
        ...state,
        loading: false,
        entries: [payload, ...state.entries]
      };
      case END_ENTRY_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== payload._id),
        loading: false
      };
      case EDIT_ENTRY_SUCCESS:
      return {
        ...state,
        entries: state.entries,
        loading: false
      };
    case GET_RECENT_ENTRIES:
      return {
        ...state,
        loading:false,
        entries: payload
      };
      case ADD_ENTRY_ERROR:
      case ENTRY_ERROR:
        return {
          ...state,
        error: payload,
        loading: false
      };
      case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
