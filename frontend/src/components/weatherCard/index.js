import React from "react";
import styles from './styles.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function WeatherCard({ weather }) {
    var current = weather.currentConditions;
    var condition = current.icon;
    console.log(condition)
    return (
        <Container 
            className={styles.cardBg}
            style={{
                backgroundColor: 
                    condition.includes('snow') ? 'white' :
                    condition.includes('thunder') ? '#3c6770':
                    condition.includes('rain') ? '#20b0cf' :
                    condition.includes('showers') ? '#14bee3' :
                    condition.includes('cloudy') ? '#a9a9a9' :
                    '#00d2ff'
            }}
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
                        <img src="arrow.svg" className={styles.image} style={{ transform: `rotate(${current.winddir + 180}deg)` }} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}