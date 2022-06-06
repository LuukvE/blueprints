import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import { Provider } from 'react-redux';
import React, { StrictMode } from 'react';
import { initializeApp } from 'firebase/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getAnalytics } from 'firebase/analytics';

import store from './store';
import App from './components/App';

const app = initializeApp({
  apiKey: 'AIzaSyBsm2wz3ahIgqvqiLgrFPNtwblojFknJQA',
  authDomain: 'apex-software-engineering.firebaseapp.com',
  projectId: 'apex-software-engineering',
  storageBucket: 'apex-software-engineering.appspot.com',
  messagingSenderId: '572890238748',
  appId: '1:572890238748:web:a10acacea13961d19ff4d9',
  measurementId: 'G-STQ12VT7GF'
});

getAnalytics(app);

createRoot(document.querySelector('.App') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
