import firebase from '../firebase.js';

const currentUser = (state = {}, action) => {
  const usersRef = firebase.database().ref('users');
  let user;
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return action.currentUser;
  case 'CREATE_HOUSE':
    user = Object.assign(state, { house: action.house.houseName });
    usersRef.push(user);
    return user;
  case 'GET_HOUSE':
    user = Object.assign(state, { house: action.usersHouse.houseName });
    usersRef.push(user);
    return user;
  case 'SIGNOUT':
    return {};
  case 'LEAVE HOUSE':
    return Object.assign(action.currentUser, { house: {} });
  default:
    return state;
  }
};

export default currentUser;
