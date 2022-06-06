import React, { FC, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import useAPI from '../hooks/useAPI';

import './App.scss';
import Scroll from './Scroll';

const App: FC = () => {
  const { getTasks } = useAPI();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <nav>
        <NavLink to="/">Scroll</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Scroll />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
