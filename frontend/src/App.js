import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { SECRET } from './env';
import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
