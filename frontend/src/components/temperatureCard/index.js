import React from 'react';
import styles from './styles.module.scss';
import InformationCard from '../../components/LocationCard';

export default function TemperatureCard({ position, weather }) {
    var alerts = ['Tempestades fortes chegando a noite.']
    return (
        <div style={{width: '100%'}}>
            <div className={styles.containerBox}>
                <div className={styles.insideContainer}>
                    <div className={styles.iconCol}>
                        {weather && weather.currentConditions && <img src={`weather_types/${weather.currentConditions.icon}.svg`} alt="Weather Icon" className={styles.icon} />}
                    </div>
                    <div className={styles.temperature}>
                        {weather && weather.currentConditions && `${weather.currentConditions.temp}°C`}
                    </div>
                </div>
                <div className={styles.information}>
                    {position.city}, {position.country}
                </div>
                <div className={styles.title}>Ultima atualização</div>
                <div className={styles.hour}>{weather.currentConditions.datetime.substring(0, 5)}</div>
            </div>
            {weather.alerts.length > 0 &&
                <InformationCard type="Alerts" icone="alerts" info={alerts} />
            }
        </div>
    );
}
