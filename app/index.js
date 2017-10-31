import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
// import Devtools from './containers/Devtools';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/configureStore.js';
// require('./main.scss');

ReactDOM.render(
  <Provider store={store}>
    <Root store={store}/>
  </Provider>,
  document.getElementById('main')
);
