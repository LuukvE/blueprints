import React, { FC, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import useAPI from '../hooks/useAPI';

import './App.scss';
import Chat from './Chat';

const App: FC = () => {
  const { setMessage } = useAPI();

  useEffect(() => {
    setMessage();
  }, [setMessage]);

  return (
    <>
      <nav>
        <NavLink to="/">Chat</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
