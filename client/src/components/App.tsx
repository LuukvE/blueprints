import React, { FC, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import useAPI from '../hooks/useAPI';

import './App.scss';
import Contact from './Contact';

const App: FC = () => {
  const { getMessages } = useAPI();

  useEffect(() => {
    getMessages();
  }, [getMessages]);

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
