import React, { FC, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import useAPI from '../hooks/useAPI';

import './App.scss';
import Crud from './Crud';

const App: FC = () => {
  const { getPeople } = useAPI();

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <>
      <nav>
        <NavLink to="/">Crud</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Crud />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
