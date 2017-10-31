import HeaderNav from '../components/HeaderNav/HeaderNav.js';
import { connect } from 'react-redux';
import { signOut, leaveHouse } from '../actions/actions.js';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(signOut());
  },
  leaveHouse: (currentUser, usersHouse) => {
    dispatch(leaveHouse(currentUser, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
