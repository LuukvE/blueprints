import React, { FC } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import './App.scss';
import Contact from './Contact';

const App: FC = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Contact</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
