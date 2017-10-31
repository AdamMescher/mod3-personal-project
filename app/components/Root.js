import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import Devtools from '../containers/Devtools';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './reducers/configureStore.js';

export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes />
          <Devtools />
        </div>
      </BrowserRouter>
    );
  }
}
