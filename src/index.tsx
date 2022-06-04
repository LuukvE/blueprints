import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';

import './index.scss';
import store from './store';
import Crud from './components/Crud';
import Welcome from './components/Welcome';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <nav>
        <NavLink exact to="/">
          Welcome
        </NavLink>
        <NavLink to="/crud">CRUD</NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/crud">
          <Crud />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
);
