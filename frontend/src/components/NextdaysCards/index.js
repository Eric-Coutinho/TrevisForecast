import React from "react";

import styles from './styles.module.scss';

export default function NextdaysCard({ weather }) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const nextdays = new Date(weather.datetime);

    return (
        <div className={styles.nextdaysCard}>
            <div className={styles.day}>
               {days[nextdays.getDay()]}, {nextdays.toLocaleString('pt-BR').substring(0, 10)}
            </div>
            <div className={styles.information}>
                <img
                    src={`weather_types/${weather.icon}.svg`}
                    alt="Weather Icon" className={styles.icon}
                    style={{ width: weather.icon == 'clear-day' ? '5em' : '7em', height: weather.icon == 'clear' ? '5em' : '7em'}}
                />
                <div className={styles.tempdata}>
                    <div>
                        {Math.round(weather.tempmax)}°C
                    </div>
                    <div className={styles.tempmin}>
                        {Math.round(weather.tempmin)}°C
                    </div>
                </div>
            </div>
        </div>
    )
}