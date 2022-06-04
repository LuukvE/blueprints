import React, { FC, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import { useSelector } from '../store';
import useAPI from '../hooks/useAPI';

import './App.scss';
import Welcome from './Welcome';

const App: FC = () => {
  const { getTasks } = useAPI();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!tasks.length) getTasks();
  }, [getTasks, tasks]);

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
