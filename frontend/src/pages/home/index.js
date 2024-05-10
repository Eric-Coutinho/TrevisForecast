import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { SECRET } from '../../env';

import styles from './styles.module.scss';

export default function HomePage() {
    return (
        <div>
            Pagina Home works
            <br></br>
            Temperatura: {weather == null ? 'not loaded' : weather.currentConditions.temp}°C
        </div>
    )
}