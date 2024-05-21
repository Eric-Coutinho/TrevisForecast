import './App.css';

import React from 'react';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NotFoundPage from './pages/notFoundPage';
import LocationsPage from './pages/locationsPage';
import ProtectedRoute from './pages/protectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/locations" element={
        <ProtectedRoute
          errorPage={<NotFoundPage />}
          targetPage={<LocationsPage />}
        />
      }
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
