import firebase from '../firebase.js';

const usersHouse = (state = {}, action) => {
  const housesRef = firebase.database().ref('houses');
  switch (action.type) {
  case 'CREATE_HOUSE':
    housesRef.push(action.house);
    return action.house;
  case 'GET_HOUSE':
    const updatedHouse = {
      houseName: action.usersHouse.houseName,
      houseCode: action.usersHouse.houseCode,
      users: [...action.usersHouse.users, action.user],
      bills: [...action.usersHouse.bills],
      houseKey: action.usersHouse.houseKey,
      bulletins: [...action.usersHouse.bulletins]
    };
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(updatedHouse);
    return updatedHouse;
  case 'LOGIN_SUCCESS':
    return action.usersHouse;
  case 'SIGNOUT':
    return {};
  case 'LEAVE_HOUSE':
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set({
      houseName: action.usersHouse.houseName,
      houseCode: action.usersHouse.houseCode,
      users: action.usersHouse.users.filter(user => user.id !== action.currentUser.id),
      bills: [...action.usersHouse.bills],
      houseKey: action.usersHouse.houseKey,
      bulletins: [...action.usersHouse.bulletins]
    });
    return {};
  case 'ADD_BILL':
    const houseWithBill = {
      houseName: action.usersHouse.houseName,
      houseCode: action.usersHouse.houseCode,
      users: action.usersHouse.users,
      bills: [...action.usersHouse.bills.filter(bill => bill.title !== 'fake'), action.bill],
      houseKey: action.usersHouse.houseKey,
      bulletins: [...action.usersHouse.bulletins]
    };
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(houseWithBill);
    return houseWithBill;
  case 'ADD_BULLETIN':
    const houseWithBulletin = {
      houseName: action.usersHouse.houseName,
      houseCode: action.usersHouse.houseCode,
      users: action.usersHouse.users,
      bills: [...action.usersHouse.bills],
      houseKey: action.usersHouse.houseKey,
      bulletins: [...action.usersHouse.bulletins.filter(bulletin => bulletin.title !== 'fake'), action.bulletin]
    };
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(houseWithBulletin);
    return houseWithBulletin;
  case 'ADD_READER':
    const oldBulletin = action.usersHouse.bulletins.find(bulletin => bulletin.id === action.bulletinId);
    if (oldBulletin.hasRead.includes(action.userId)) {
      return action.usersHouse;
    }
    const newBulletin = Object.assign(oldBulletin, { hasRead: [...oldBulletin.hasRead, action.userId] });
    const updateBulletins = action.usersHouse.bulletins.filter(bulletin => {
      return bulletin.id !== action.bulletinId;
    });
    const updateWithBulletin = Object.assign(action.usersHouse, { bulletins: [...updateBulletins, newBulletin] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(updateWithBulletin);
    return updateWithBulletin;
  case 'MARK_PAID':
    const oldBill = action.usersHouse.bills.find(bill => bill.id === action.billId);
    const user = oldBill.allUsersTotals.find(user => user.id === action.userId);
    if (user.paid === true) {
      return action.usersHouse;
    }
    const newUser = Object.assign(user, { paid: true });
    const newAllUsersTotals = oldBill.allUsersTotals.filter(user => user.id !== action.userId);
    const newBill = Object.assign(oldBill, { allUsersTotals: [...newAllUsersTotals, newUser] });
    const updatedBills = action.usersHouse.bills.filter(bill => {
      return bill.id !== action.billId;
    });
    const updateWithBill = Object.assign(action.usersHouse, { bills: [...updatedBills, newBill] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(updateWithBill);
    return updateWithBill;
  default:
    return state;
  }
};

export default usersHouse;
