import './App.css';

import React from 'react';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import LocationsPage from './pages/locationsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/places" element={<LocationsPage />} />
    </Routes>
  );
}

export default App;
