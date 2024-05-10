import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';
import TemperatureCard from '../../components/temperatureCard';

export default function HomePage() {
    return (
        <div>
            <TemperatureCard />
        </div>
    )
}