import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './styles.module.scss';
import TemperatureCard from '../../components/temperatureCard';
import WeatherCard from '../../components/weatherCard';

import { VisualCrossingAPI } from '../../api/visualcrossing';
import { OpenCageAPI } from '../../api/opencage';
import { KEY, KEY2 } from '../../env';

export default function HomePage() {
    const [coordinates, setCoordinates] = useState(null);
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);

    function getCoordinates() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (coordinate) => {
                setCoordinates({
                    latitude: coordinate.coords.latitude,
                    longitude: coordinate.coords.longitude,
                });
            });
            return;
        }
        console.log("Geolocation is not available in your browser.");
    }

    async function getPosition() {
        if (coordinates !== null) {
            const response = await OpenCageAPI.get(`json?q=${coordinates.latitude}%2C${coordinates.longitude}&key=${KEY2}`);
            const data = response.data.results[0].components;
            setPosition({
                city: data.city,
                state: data.state,
                country: data.country
            });
        }
    }

    async function getWeather() {
        if (coordinates !== null) {
            const response = await VisualCrossingAPI.get(`${coordinates.latitude},${coordinates.longitude}?key=${KEY}&iconSet=icons2&unitGroup=metric`);
            setWeather(response.data);
            localStorage.setItem("weather", JSON.stringify(response.data));
        }
    }

    useEffect(() => {
        getCoordinates();
    }, [])

    useEffect(() => {
        async function fetchData() {
            await getPosition();
        }
        fetchData();
    }, [coordinates]);

    useEffect(() => {
        async function fetchData() {
            await getWeather();
        }
        fetchData();
        console.log(weather)
    }, [coordinates]);

    return (
        <Container style={{ marginTop: '3%' }}>
            {weather != null && position != null &&
                <div>
                    <Row className={styles.row}>
                        <Col sm="12" md="12" lg="12" className={styles.col}>
                            <TemperatureCard position={position} weather={weather} />
                        </Col>
                    </Row>
                    <Row className={styles.row}>
                        <Col sm="12" md="12" lg="12" className={styles.col}>
                            <WeatherCard weather={weather} />
                        </Col>
                    </Row>
                </div>
            }
        </Container>
    )
}