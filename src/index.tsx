import 'aos/dist/aos.css';
import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import AOS from 'aos';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';

import './index.scss';
import store from './store';
import Scroll from './components/Scroll';
import Welcome from './components/Welcome';

AOS.init();

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <nav>
        <NavLink exact to="/">
          Welcome
        </NavLink>
        <NavLink to="/scroll">Scroll</NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/scroll">
          <Scroll />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
);
