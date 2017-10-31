import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../../firebase.js';

class Dash extends Component {
  constructor() {
    super();
    this.state = {
      houseName: '',
      houseCode: '',
      allHouses: []
    };
  }

  componentDidMount () {
    const housesRef = firebase.database().ref('houses');
    housesRef.on('value', snapshot => {
      const houses = Object.entries(snapshot.val());
      const newState = houses.map(([key, value]) => Object.assign({ houseKey: key }, value));
      this.setState({ allHouses: newState });
    });
  }


  handleChange(event, type) {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const usersHouse = this.state.allHouses.find(house => {
          if (house.users) {
            const userIds = house.users.map(user => user.id);
            return userIds.includes(user.uid);
          }
        });
        this.props.loginSuccess(user, usersHouse);
      });
  }

  createHouse = () => {
    this.props.createHouse(Object.assign(
      {
        houseName: this.state.houseName,
        houseCode: this.state.houseCode,
        users: [this.props.currentUser],
        bills: [{ title: 'fake' }],
        bulletins: [{ title: 'fake' }]
      }));
  }

  getHouse = () => {
    const usersHouse = this.state.allHouses.find(house => {
      return house.houseCode === this.state.houseCode;
    });
    this.props.getHouse(this.props.currentUser, usersHouse);
  }

  invokeHouse = () => {
    return (
      <div>
        <input type='text'
          placeholder="House Code"
          onChange={ (event) => this.handleChange(event, 'houseCode' ) }/>
        <button
          onClick={this.getHouse}>
            Join a House
        </button>
        <input type="text"
          placeholder="House Name"
          onChange={ (event) => this.handleChange(event, 'houseName' ) }/>
        <input type="text"
          placeholder="House Code"
          onChange={ (event) => this.handleChange(event, 'houseCode' ) }/>
        <button
          onClick={this.createHouse}>
            Add My House
        </button>
      </div>
    );
  }

  renderBills = () => {
    const { usersHouse, currentUser, markBillPaid } = this.props;
    const mybills = usersHouse.bills.filter(bill => {
      const usersOwe = bill.allUsersTotals.map(user => user.id);
      return usersOwe.includes(currentUser.id);
    });
    const billsDue = mybills.filter(bill => {
      return bill.allUsersTotals.find(user => user.id === currentUser.id).paid === false;
    });
    if (billsDue.length) {
      return (
        <div>
          <h2>Bills I Owe</h2>
          <h4>Title</h4>
          <h4>Due Date</h4>
          <h4>My Total</h4>
          <h4>Mark as Paid</h4>
          {billsDue.map(bill => {
            const myTotal = bill.allUsersTotals.find(user => user.id === currentUser.id).total;
            return (<div key={bill.parsedDuedate}>
              <Link to={`bills/${bill.id}`}>{bill.title}</Link>
              <p>{bill.duedate}</p>
              <p>{myTotal}</p>
              <div onClick={() => markBillPaid(bill.id, currentUser.id, usersHouse)}>Mark as Paid</div>
            </div>);
          })}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  renderBulletins = () => {
    const { usersHouse, currentUser } = this.props;
    const iNeedToRead = usersHouse.bulletins.filter(bulletin => {
      return !bulletin.hasRead.includes(currentUser.id);
    });
    if (iNeedToRead.length) {
      return (
        <div>
          <h2>Bulletins I Need to Read</h2>
          <h4>Title</h4>
          <h4>Date Posted</h4>
          {iNeedToRead.map(bulletin => {
            return (<div key={bulletin.id}>
              <Link
                to={`bulletins/${bulletin.id}`}
                onClick={() => this.props.addReaderToBulletin(bulletin.id, currentUser.id, usersHouse)}>
                {bulletin.title}
              </Link>
              <p>{bulletin.datePosted}</p>
            </div>);
          })}
        </div>
      );
    }
  }

  renderDash = () => {
    const { bills, bulletins } = this.props.usersHouse;
    return (
      <div>
        {(bills.length && bills[0].title !== 'fake') ? this.renderBills() : null }
        {(bulletins.length && bulletins[0].title !== 'fake') ? this.renderBulletins(): null}
      </div>
    );
  }

  getHouseOrDash = () => {
    return this.props.usersHouse.houseName ? this.renderDash() : this.invokeHouse();
  }

  render() {
    return (
      <div>
        {this.props.currentUser.name ?
          this.getHouseOrDash()
          :
          <button onClick={this.login}>Log In</button>
        }
      </div>

    );
  }

}

export default Dash;

Dash.propTypes = {
  currentUser: PropTypes.object,
  loginSuccess: PropTypes.func,
  createHouse: PropTypes.func,
  usersHouse: PropTypes.object,
  getHouse: PropTypes.func
};
