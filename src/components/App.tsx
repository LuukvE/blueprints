import React, { FC, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import useAPI from '../hooks/useAPI';

import './App.scss';
import Welcome from './Welcome';

const App: FC = () => {
  const { getTasks } = useAPI();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <nav>
        <NavLink to="/">Welcome</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
