import Item from '../components/Item/Item.js';
import { connect, bindActionCreators } from 'react-redux';
import { markBillPaid } from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
  markBillPaid: (billId, userId, usersHouse) => {
    dispatch(markBillPaid(billId, userId, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
