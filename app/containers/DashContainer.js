import Dash from '../components/Dash/Dash.js';
import { connect } from 'react-redux';
import { loginSuccess, createHouse, getHouse, addReaderToBulletin, markBillPaid } from '../actions/actions';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
  // bulletins: store.bulletins,
  // bills: store.bills,
  // chores: store.chores
});

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (user, usersHouse) => {
    dispatch(loginSuccess(user, usersHouse));
  },
  createHouse: house => {
    dispatch(createHouse(house));
  },
  getHouse: (user, usersHouse) => {
    dispatch(getHouse(user, usersHouse));
  },
  addReaderToBulletin: (bulletinId, userId, usersHouse) => {
    dispatch(addReaderToBulletin(bulletinId, userId, usersHouse));
  },
  markBillPaid: (billId, userId, usersHouse) => {
    dispatch(markBillPaid(billId, userId, usersHouse));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
