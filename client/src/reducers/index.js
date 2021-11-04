import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import entries from './entries';
import categories from './categories';
import showHide from './showHide';


export default combineReducers({
  alert,
  auth,
  profile,
  entries,
  categories,
  showHide
});
