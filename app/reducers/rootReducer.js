import { combineReducers } from 'redux';
import currentUser from './currentUser';
import usersHouse from './usersHouse';


const rootReducer = combineReducers({
  currentUser,
  usersHouse
});

export default rootReducer;
