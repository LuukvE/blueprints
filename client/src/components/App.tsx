import React, { FC } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import './App.scss';
import Scroll from './Scroll';

const App: FC = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Scroll</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Scroll />} />
        <Route path="/test" />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
