import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      currentView: ''
    };
  }

  renderBills = () => {
    const { usersHouse, currentUser } = this.props;
    const mybills = usersHouse.bills.filter(bill => {
      const usersOwe = bill.allUsersTotals.map(user => user.id);
      return usersOwe.includes(currentUser.id);
    });
    return (
      <div>
        <h4>Title</h4>
        <h4>Due Date</h4>
        <h4>My Total</h4>
        <h4>Paid</h4>
        {mybills.map(bill => {
          const myTotal = bill.allUsersTotals.find(user => user.id === currentUser.id).total;
          return (<div key={bill.parsedDuedate}>
            <Link to={`bills/${bill.id}`}>{bill.title}</Link>
            <p>{bill.duedate}</p>
            <p>{myTotal}</p>
          </div>);
        })}
      </div>
    );
  }

  render() {
    const bills = this.renderBills();
    return (
      <div>
        <h2>My Lists</h2>
        <button
          onClick={() => { this.setState({ currentView: 'bills'}); }}>
          View Bills
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'chores'}); }}>
          View Chores
        </button>
        {this.state.currentView === 'bills' ? bills : null}
      </div>
    );
  }
}

export default UserList;

UserList.propTypes = {

};
