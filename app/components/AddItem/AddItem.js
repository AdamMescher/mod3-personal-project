import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      item: '',
      split: '',
      equalSelect: [],
      title: '',
      duedate: '',
      total: '',
      allUsersTotals: [],
      details: ''
    };
  }

  handleChange(event, type) {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
  }

  updateSplit = (val) => {
    this.setState({ split: val });
  }

  updateItem = val => {
    this.setState({ item: val });
  }

  addBill = () => {
    const { title, duedate, total, allUsersTotals, details } = this.state;
    const bill = {
      title,
      duedate,
      total,
      allUsersTotals,
      details,
      postedBy: this.props.currentUser,
      parsedDuedate: Date.parse(duedate),
      datePosted: this.getTodaysDate(),
      id: `b${Date.parse(duedate) + Date.now()}`
    };
    this.props.addBill(bill, this.props.usersHouse);
    this.updateItem('');
  }

  getTodaysDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if ( mm < 10) {
      mm='0'+mm;
    }
    return `${mm}/${dd}/${yyyy}`;
  }

  updateCustomPSplit = (event, id) => {
    const percentage = parseInt(event.target.value, 10);
    const total = parseInt(this.state.total, 10) * (percentage / 100);
    const userTotalObj = {
      id,
      total,
      paid: false
    };
    const removeUser = this.state.allUsersTotals.filter(user => user.id !== id);
    const newState = [...removeUser, userTotalObj];
    this.setState({ allUsersTotals: newState });
  }

  updateCustomDSplit = (event, id) => {
    const removeUser = this.state.allUsersTotals.filter(user => user.id !== id);
    const newState = [...removeUser, { id: id, total: event.target.value, paid: false }];
    this.setState({ allUsersTotals: newState });
  }

  splitEqually = () => {
    const { users } = this.props.usersHouse;
    const userTotal = this.state.total / users.length;
    const newState = users.map(user => ({
      id: user.id,
      total: userTotal,
      paid: false
    }));
    this.setState({ split: 'equalAll', allUsersTotals: newState });
  }

  equalSelectSplit = (id) => {
    const { equalSelect } = this.state;
    let newState;
    if (equalSelect.includes(id)) {
      newState = equalSelect.filter(userId => userId !== id);
    } else {
      newState = [...equalSelect, id];
    }
    this.setState({ equalSelect: newState });
  }

  updateEqualSplit = () => {
    const { equalSelect } = this.state;
    const total = this.state.total / equalSelect.length;
    const newState = equalSelect.map(id => ({ id, total, paid: false }));
    this.setState({ split: 'calculated', allUsersTotals: newState });
  }

  addBulletin = () => {
    const bulletin = {
      id: Date.now(),
      title: this.state.title,
      details: this.state.details,
      hasRead: [this.props.currentUser.id],
      postedBy: this.props.currentUser,
      datePosted: this.getTodaysDate()
    };

    this.props.addBulletin(bulletin, this.props.usersHouse);
    this.updateItem('');
  }

  renderWithButton = elements => {
    return (<div>
      {elements}
      <button
        onClick={this.state.split === 'equal' ? this.updateEqualSplit : () => this.updateSplit('calculated')}>
        Calculate
      </button>
    </div>);
  }

  renderAddBill() {
    const { usersHouse } = this.props;
    const equalCalc = usersHouse.users.map(user => {
      return <div key={user.id}>
        <input type="checkbox" id={user.id} onChange={() => { this.equalSelectSplit(user.id); }}/>
        <label htmlFor={user.id}>{user.name}</label>
      </div>;
    });
    const equalAll = this.state.allUsersTotals.map(userBill => {
      const userName = usersHouse.users.find(user => user.id === userBill.id).name;
      return <div key={userBill.id}>
        <p>{userName}</p><p>{userBill.total}</p>
      </div>;
    });
    const customPCalc = usersHouse.users.map(user => {
      const customPFunc = (event) => this.updateCustomPSplit(event, user.id);
      const customDFunc = (event) => this.updateCustomDSplit(event, user.id);
      return <div key={user.id}>
        <input type="text"
          id={user.id}
          placeholder={this.state.split === 'customP' ? "percentage" : "dollar amount" }
          onChange={this.state.split === 'customP' ? customPFunc : customDFunc}/>
        <label htmlFor={user.id}>{user.name}</label>
      </div>;
    });
    return (
      <div>
        <input type='text' placeholder='Title' onChange={(event) => this.handleChange(event, 'title')}/>
        <input type='text' placeholder='Due Date' onChange={(event) => this.handleChange(event, 'duedate')}/>
        <input type='text' placeholder='Total' onChange={(event) => this.handleChange(event, 'total')}/>
        <button onClick={this.splitEqually}>Equal Split with All House Members</button>
        <button onClick={() => this.updateSplit('equal')}>Equal Split with Select House Members</button>
        <button onClick={() => this.updateSplit('customP')}>Custom Split by Percentage</button>
        <button onClick={() => this.updateSplit('customD')}>Custom Split by Dollar Amount</button>
        {this.state.split === 'equalAll' ? equalAll : null}
        {this.state.split === 'calculated' ? equalAll : null}
        {this.state.split === 'equal' ? this.renderWithButton(equalCalc) : null}
        {this.state.split === 'customP' ? this.renderWithButton(customPCalc) : null}
        {this.state.split === 'customD' ? customPCalc : null}
        <textarea type='text' placeholder='Details' onChange={(event) => this.handleChange(event, 'details')}/>
        <button onClick={() => this.addBill()}>Submit</button>
        {/* button to clear all input fiels and state related to bills */}

      </div>
    );
  }

  renderAddBulletin = () => {
    return (
      <div>
        <input type='text' placeholder='Title' onChange={(event) => this.handleChange(event, 'title')}/>
        <textarea type='text' placeholder='Details' onChange={(event) => this.handleChange(event, 'details')}/>
        <button onClick={() => this.addBulletin()}>Submit</button>
      </div>
    );
  }

  renderButtons = () => {
    return (
      <div>
        <button onClick={() => this.updateItem('bill')}>Add Bill</button>
        <button onClick={() => this.updateItem('chore')}>Add Chore</button>
        <button onClick={() => this.updateItem('bulletin')}>Add Bulletin</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.usersHouse.users ? this.renderButtons() : null}
        {this.state.item === 'bill' ? this.renderAddBill() : null}
        {this.state.item === 'bulletin' ? this.renderAddBulletin() : null}
      </div>
    );
  }
}

export default AddItem;

AddItem.propTypes = {
  usersHouse: PropTypes.object
};
