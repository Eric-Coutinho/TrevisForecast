import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { SECRET } from '../../env';

import styles from './styles.module.scss';
import TemperatureCard from '../../components/temperatureCard';

export default function HomePage() {
    return (
        <div>
            Pagina Home works
            <br></br>
            <TemperatureCard />
        </div>
    )
}