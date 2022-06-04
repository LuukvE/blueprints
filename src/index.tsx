import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';

import './index.scss';
import store from './store';
import Welcome from './components/Welcome';

const firebaseConfig = {
  apiKey: 'AIzaSyBsm2wz3ahIgqvqiLgrFPNtwblojFknJQA',
  authDomain: 'apex-software-engineering.firebaseapp.com',
  projectId: 'apex-software-engineering',
  storageBucket: 'apex-software-engineering.appspot.com',
  messagingSenderId: '572890238748',
  appId: '1:572890238748:web:a10acacea13961d19ff4d9',
  measurementId: 'G-STQ12VT7GF'
};

const history = createBrowserHistory();

const app = initializeApp(firebaseConfig);

getAnalytics(app);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <nav>
        <NavLink exact to="/">
          Welcome
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
);
