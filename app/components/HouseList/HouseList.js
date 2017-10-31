import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HouseList extends Component {
  constructor() {
    super();
    this.state = {
      currentView: '',
      searchInput: ''
    };
  }

  renderBills = () => {
    const { bills } = this.props.usersHouse;
    return (
      <div>
        <input type='text' placeholder='search'/>
        <h4>Title</h4>
        <h4>Due Date</h4>
        <h4>Total</h4>
        <h4>All Paid</h4>
        {bills.map(bill => {
          return (<div key={bill.parsedDuedate}>
            <Link to={`bills/${bill.id}`}>{bill.title}</Link>
            <p>{bill.duedate}</p>
            <p>{bill.total}</p>
          </div>);
        })}
      </div>
    );
  }

  renderBulletins = () => {
    const { bulletins } = this.props.usersHouse;
    const { addReaderToBulletin, currentUser, usersHouse } = this.props;
    return (
      <div>
        <input type='text' placeholder='search'/>
        <h4>Title</h4>
        <h4>Date Posted</h4>
        <h4>All Read</h4>
        {bulletins.map(bulletin => {
          let bulletinClass;
          bulletin.hasRead.includes(currentUser.id) ? bulletinClass = 'read' : bulletinClass = 'not-read';
          //set image based on if bulletin.hasRead.length === usersHouse.users.length
          return (<div key={bulletin.id} className={bulletinClass}>
            <Link
              to={`bulletins/${bulletin.id}`}
              onClick={() => addReaderToBulletin(bulletin.id, currentUser.id, usersHouse)}>
              {bulletin.title}
            </Link>
            <p>{bulletin.datePosted}</p>
          </div>);
        })}
      </div>
    );
  }

  render() {
    const bills = this.renderBills();
    const bulletins = this.renderBulletins();

    return (
      <div>
        <button
          onClick={() => { this.setState({ currentView: 'bills'}); }}>
          View Bills
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'bulletins'}); }}>
          View Bulletins
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'chores'}); }}>
          View Chores
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'summary'}); }}>
          View Summary
        </button>
        <Link to='/additem'>Add Bills, Chores, or Bulletins</Link>
        {this.state.currentView === 'bills' ? bills : null}
        {this.state.currentView === 'bulletins' ? bulletins : null}
      </div>
    );
  }

}

export default HouseList;

HouseList.propTypes = {
  usersHouse: PropTypes.object
};
