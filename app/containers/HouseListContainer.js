import HouseList from '../components/HouseList/HouseList.js';
import { connect } from 'react-redux';
import { addReaderToBulletin } from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse,
  currentUser: store.currentUser
});

const mapDispatchToProps = dispatch => ({
  addReaderToBulletin: (bulletinId, userId, usersHouse) => {
    dispatch(addReaderToBulletin(bulletinId, userId, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseList);
