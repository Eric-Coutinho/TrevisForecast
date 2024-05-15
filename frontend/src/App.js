import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
