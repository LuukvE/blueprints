import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import { Provider } from 'react-redux';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';

import './index.scss';
import store from './store';
import Welcome from './components/Welcome';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <nav>
          <NavLink to="/">Welcome</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
