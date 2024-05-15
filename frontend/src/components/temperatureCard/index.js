import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function TemperatureCard({ position, weather }) {
    return (
        <div className={styles.containerBox}>

            <div className={styles.containerBox}>
                <div>
                    <div className={styles.iconCol}>
                        {weather && weather.currentConditions && <img src={`weather_types/${weather.currentConditions.icon}.svg`} alt="Weather Icon" className={styles.icon} />}
                    </div>
                </div>
                <div>
                    <div className={styles.temperature}>
                        {weather && weather.currentConditions && `${weather.currentConditions.temp}°C`}
                    </div>
                </div>
            </div>
        </div>
    );
}
