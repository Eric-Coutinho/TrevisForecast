import React from "react";
import styles from './styles.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { secondary } from "../../backgroundWeather";

export default function WeatherCard({ weather }) {
    var current = weather.currentConditions;
    var condition = current.icon;

    return (
        <Container 
            className={styles.cardBg}
            style={secondary(condition)}
        >
            <Row style={{width: '100%'}}>
                <Col sm="6" md="4" lg="2" className={styles.location}>
                    <div>Cloud cover</div>
                    <div>{current.cloudcover}%</div>
                </Col>
                <Col sm="6" md="4" lg="2" className={styles.location}>
                    <div>Dew </div>
                    <div>{current.dew}°C</div>
                </Col>
                <Col sm="6" md="4" lg="2" className={styles.location}>
                    <div>Thermal sensation</div>
                    <div>{current.feelslike}°C</div>
                </Col>
                <Col sm="6" md="4" lg="2" className={styles.location}>
                    <div>Humidity</div>
                    <div>{current.humidity}%</div>
                </Col>
                <Col sm="6" md="4" lg="2" className={styles.location}>
                    <div>Pressure</div>
                    <div>{current.pressure} mb</div>
                </Col>
                <Col sm="6" md="4" lg="2" className={styles.location}>
                    <div>Wind speed</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {current.windspeed} km/h
                        <img src="arrow.svg" className={styles.image} style={{
                            transform: `rotate(${current.winddir + 180}deg)`,
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
                        }} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}