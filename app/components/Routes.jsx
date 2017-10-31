import React from 'react';
import { Route } from 'react-router-dom';
import DashContainer from '../containers/DashContainer.js';
import HeaderNavContainer from '../containers/HeaderNavContainer.js';
import UserListContainer from '../containers/UserListContainer.js';
import HouseListContainer from '../containers/HouseListContainer.js';
import AddItemContainer from '../containers/AddItemContainer.js';
import ItemContainer from '../containers/ItemContainer.js';

const Routes = () => {
  return (
    <div className="routes">
      <Route path="/" component={ HeaderNavContainer }/>
      <Route exact path="/" component={ DashContainer }/>
      <Route path="/additem" component={ AddItemContainer }/>
      <Route exact path='/houselist' component={ HouseListContainer }/>

      <Route path='/bills/:id' component={ ItemContainer }/>
      <Route path='/bulletins/:id' component={ ItemContainer }/>
      <Route exact path='/userlist' component={ UserListContainer }/>

    </div>
  );

};

export default Routes;
