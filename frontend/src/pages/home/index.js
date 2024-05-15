import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './styles.module.scss';
import TemperatureCard from '../../components/temperatureCard';
import InformationCard from '../../components/LocationCard';
import WeatherCard from '../../components/weatherCard';

import axios from 'axios';
import { KEY } from '../../env';

export default function HomePage() {
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);

    function setLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
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
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${position.latitude},${position.longitude}?key=${KEY}&iconSet=icons2&unitGroup=metric`);
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
    }, [position]);

    return (
        <Container>
            {weather != null &&
                <div>
                    <Row className={styles.row}>
                        <Col sm="12" md="12" lg="12" className={styles.col}>
                            <TemperatureCard weather={weather} />
                        </Col>
                    </Row>
                    <Row className={styles.row}>
                        <Col sm="12" md="12" lg="12" className={styles.col}>
                            <WeatherCard weather={weather} />
                        </Col>
                    </Row>
                </div>
            }
            {weather != null && weather.alerts.length > 0 &&
                <Row className={styles.row}>
                    <Col sm="12" md="12" lg="12" className={styles.col}>
                        <InformationCard type="Alerts" icone="alerts" info={weather.alerts} />
                    </Col>
                </Row>
            }
        </Container>
    )
}