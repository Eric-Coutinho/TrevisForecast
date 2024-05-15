import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import './App.css';
import LoginPage from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
