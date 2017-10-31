import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HeaderNav extends Component {
  render() {
    const { currentUser, usersHouse, signOut, leaveHouse } = this.props;
    const userStuff = <div className='user-stuff'>
      <p className='greeting'>{`Welcome to ${usersHouse.houseName},  ${currentUser.name}.`}</p>
      <Link to="/houselist">Manage House</Link>
      <Link to="/userlist">My Lists</Link>
      <Link to='/' onClick={() => { leaveHouse(currentUser, usersHouse); }}>Leave House</Link>
      <Link to='/' onClick={signOut}>Sign Out</Link>
    </div>;
    return (
      <div>
        <Link to="/">
          <h1>Tribe</h1>
        </Link>
        <h3>A Communal Living Management App</h3>
        {usersHouse.houseName ? userStuff : null}
      </div>
    );
  }
}

export default HeaderNav;

HeaderNav.propTypes = {
  currentUser: PropTypes.object,
  usersHouse: PropTypes.object,
  signOut: PropTypes.func,
  leaveHouse: PropTypes.func
};
