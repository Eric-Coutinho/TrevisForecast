import React from "react";

import styles from './styles.module.scss';
import { secondary } from "../../backgroundWeather";

export default function NextdaysCard({ weather }) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const nextdays = new Date(weather.datetime);
    var condition = weather.icon
    return (
        <div
            className={styles.nextdaysCard}
            style={secondary(condition)}
        >
            <div className={styles.day}>
               {days[nextdays.getDay()]}, {nextdays.toLocaleString('pt-BR').substring(0, 10)}
            </div>
            <div className={styles.information}>
                <img
                    src={`weather_types/${weather.icon}.svg`}
                    alt="Weather Icon" className={styles.icon}
                    style={{
                        width: weather.icon == 'clear-day' ? '5em' : '7em',
                        height: weather.icon == 'clear' ? '5em' : '7em',
                        filter: condition.includes('snow') ? '' :
                                condition.includes('sleet') ? '' :
                                condition.includes('thunder') ? 'invert(100%)':
                                condition.includes('hail') ? 'invert(100%)' :
                                condition.includes('rain') ? 'invert(100%)' :
                                condition.includes('showers') ? '' :
                                condition.includes('cloudy') ? '' :
                                condition.includes('night') ? 'invert(100%)' :
                                condition.includes('clear') ? 'invert(100%)' :
                                '#black'
                    }}
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