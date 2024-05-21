import React from 'react';
import styles from './styles.module.scss';
import InformationCard from '../../components/LocationCard';
import { primary } from '../../backgroundWeather';

export default function TemperatureCard({ position, weather }) {
    var alerts = ['Tempestades fortes chegando a noite.']
    var condition = weather.currentConditions.icon;
    return (
        <div className={styles.temperatureCard} 
        style={primary(condition)}>
            <div className={styles.containerBox}>
                <div className={styles.insideContainer}>
                    <div className={styles.iconCol}>
                        <img
                            src={`weather_types/${condition}.svg`}
                            alt="Weather Icon"
                            style={{
                                width: condition == 'clear-day' || condition == 'clear-night' ? '60%' : '100%',
                                height: condition == 'clear-day' || condition == 'clear-night' ? '60%' : '100%',
                                filter: condition.includes('night') ? 'invert(100%)' : condition.includes('day') ? 'invert(100%)' : ''
                            }}
                        />
                    </div>
                    <div className={styles.temperature}>
                        {`${Math.round(weather.currentConditions.temp)}°C`}
                    </div>
                </div>
                <div className={styles.information}>
                    {position.city}, {position.country}
                </div>
                <div className={styles.title}>Ultima atualização</div>
                <div className={styles.hour}>{weather.currentConditions.datetime.substring(0, 5)}</div>
            </div>
            {weather.alerts.length > 0 &&
                <InformationCard style={{marginTop: '10px'}} type="Alerts" icone="alerts" info={alerts} />
            }
        </div>
    );
}
