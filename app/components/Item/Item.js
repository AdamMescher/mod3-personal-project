import React, { Component } from 'react';
import PropTypes from 'prop-types';
//link back to houselist
import { Link } from 'react-router-dom';

class  Item extends Component {
  renderBill() {
    const {usersHouse, markBillPaid } = this.props;
    const bill = usersHouse.bills.find(bill => bill.id === this.props.match.params.id);
    return (
      <div>
        <p>{`Bill: ${bill.title}`}</p>
        <p>{`Due: ${bill.duedate}`}</p>
        <p>{`Total: ${bill.total}`}</p>
        <p>{`Posted by ${bill.postedBy.name} on ${bill.datePosted}`}</p>
        <p>{`Details: ${bill.details}`}</p>
        <p>House Split:</p>
        {bill.allUsersTotals.map(user => {
          const name = usersHouse.users.find(houseMember => houseMember.id === user.id).name;
          return (<div key={`${bill.parsedDuedate}, ${user.id}`}>
            <p>{`${name}: ${user.total}`}</p>
            <p onClick={() => markBillPaid(bill.id, user.id, usersHouse)}>{user.paid ? 'Paid' : 'Mark as Paid'}</p>
          </div>);
        })}
      </div>
    );
  }

  renderBulletin() {
    const { usersHouse } = this.props;
    const bulletin = usersHouse.bulletins.find(bulletin => {
      return (parseInt(bulletin.id, 10) === parseInt(this.props.match.params.id, 10));
    });
    const needsToRead = usersHouse.users.filter(user => {
      return !bulletin.hasRead.includes(user.id);
    });
    return (
      <div>
        <p>{bulletin.title}</p>
        <p>{bulletin.details}</p>
        <p>{`Posted by ${bulletin.postedBy.name} on ${bulletin.datePosted}`}</p>
        <p>Needs to be read by ...</p>
        {needsToRead.map(user => {
          return <p key={user.id}>{user.name}</p>;
        })}
      </div>
    );
  }

  render() {
    let itemToRender;
    if (this.props.match.params.id.charAt(0) === 'b') {
      itemToRender = this.renderBill();
    } else if (this.props.match.params.id.charAt(0) === 'c') {
      itemToRender = this.renderChore();
    } else {
      itemToRender = this.renderBulletin();
    }
    return itemToRender;
  }

}

export default Item;

Item.propTypes = {
  usersHouse: PropTypes.object,
  match: PropTypes.object
};
