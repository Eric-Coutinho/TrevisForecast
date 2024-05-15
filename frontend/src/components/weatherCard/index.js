import React from "react";
import styles from './styles.module.scss';

export default function WeatherCard({ weather }) {
    var current = weather.currentConditions;
    console.log(current.winddir)
    return (
        <div className={styles.cardBg}>
            <div className={styles.location}>
                <div>Cloud cover</div>
                <div>{current.cloudcover}%</div>
            </div>
            <div className={styles.location}>
                <div>Dew </div>
                <div>{current.dew}°C</div>
            </div>
            <div className={styles.location}>
                <div>Thermal sensation</div>
                <div>{current.feelslike}°C</div>
            </div>
            <div className={styles.location}>
                <div>Humidity</div>
                <div>{current.humidity}%</div>
            </div>
            <div className={styles.location}>
                <div>Pressure</div>
                <div>{current.pressure} mb</div>
            </div>
            <div className={styles.location}>
                <div>Wind speed</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {current.windspeed} km/h
                    <img src="arrow.svg" className={styles.image} style={{ transform: `rotate(${current.winddir + 180}deg)` }} />
                </div>
            </div>
        </div>
    )
}