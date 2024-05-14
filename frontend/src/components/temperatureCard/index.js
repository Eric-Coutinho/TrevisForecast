import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KEY } from '../../env';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles.module.scss';

export default function TemperatureCard({ style }) {
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);

    function setLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
            return;
        }
        console.log("Geolocation is not available in your browser.");
    }

    async function getWeather() {
        if (position !== null) {
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${position.latitude},${position.longitude}?key=${KEY}&iconSet=icons2`);
            setWeather(response.data);
            localStorage.setItem("weather", JSON.stringify(response.data));
        }
    }

    useEffect(() => {
        setLocation();
    }, []);

    useEffect(() => {
        async function fetchData() {
            await getWeather();
        }
        fetchData();
        console.log(weather)
    }, [position]);

    return (
        <div style={ style }>
            <Container>
                <div className={styles.containerBox}>
                    <Row>
                        <Col className={styles.temperature}>
                            {weather && weather.currentConditions && `${Math.round(Math.floor(weather.currentConditions.temp - 32) * 0.55)}°C`}
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.iconCol}>
                            {weather && weather.currentConditions && <img src={`weather_types/${weather.currentConditions.icon}.svg`} alt="Weather Icon" className={styles.icon}/>}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
