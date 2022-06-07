import 'aos/dist/aos.css';
import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/js/all';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

createRoot(document.querySelector('.App') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
