import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App';
import app from './reducers';

const store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="*" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
