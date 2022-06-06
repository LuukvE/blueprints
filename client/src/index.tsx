import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import { Provider } from 'react-redux';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import App from './components/App';

createRoot(document.querySelector('.App') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
