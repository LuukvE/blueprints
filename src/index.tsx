import 'aos/dist/aos.css';
import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import AOS from 'aos';
import { Provider } from 'react-redux';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';

import './index.scss';
import store from './store';
import Scroll from './components/Scroll';
import Welcome from './components/Welcome';

AOS.init();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <nav>
          <NavLink to="/">Welcome</NavLink>
          <NavLink to="/scroll">Scroll</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/scroll" element={<Scroll />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
