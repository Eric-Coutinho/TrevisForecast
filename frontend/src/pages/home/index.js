import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './styles.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TemperatureCard from '../../components/temperatureCard';
import WeatherCard from '../../components/weatherCard';
import LocalCard from '../../components/localCard';
import Slider from "react-slick";

import { VisualCrossingAPI } from '../../api/visualcrossing';
import { OpenCageAPI } from '../../api/opencage';
import { KEY, KEY2 } from '../../env';
import NextdaysCard from '../../components/NextdaysCards';

export default function HomePage() {
    const [coordinates, setCoordinates] = useState(null);
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);
    const [locations, setLocations] = useState([
        { city: 'Nova York', lat: 40.7128, long: -74.0060 },
        { city: 'Tóquio', lat: 35.6895, long: 139.6917 },
        { city: 'Londres', lat: 51.5074, long: -0.1278 },
        { city: 'Sydney', lat: -33.8688, long: 151.2093 }
    ])

    function saveLocalStorage(key, item) {
        if(!localStorage.getItem(`${key}`) || localStorage.getItem(`${key}`) == null)
            localStorage.setItem(`${key}`, item);
    }

    function getCoordinates() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (coordinate) => {
                setCoordinates({
                    latitude: coordinate.coords.latitude,
                    longitude: coordinate.coords.longitude,
                });
                saveLocalStorage('coordinates', JSON.stringify(coordinates));
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
            saveLocalStorage('position', JSON.stringify(position));
        }
    }

    async function getWeather() {
        if (coordinates !== null) {
            const response = await VisualCrossingAPI.get(`${coordinates.latitude},${coordinates.longitude}?key=${KEY}&iconSet=icons2&unitGroup=metric`);
            setWeather(response.data);
        }
    }

    async function changeWeather(latitude, longitude) {
        const response = await VisualCrossingAPI.get(`${latitude},${longitude}?key=${KEY}&iconSet=icons2&unitGroup=metric`);
        setWeather(response.data);
    }

    async function changePosition(latitude, longitude) {
        const response = await OpenCageAPI.get(`json?q=${latitude}%2C${longitude}&key=${KEY2}`);
        const data = response.data.results[0].components;
        setPosition({
            city: data.city,
            state: data.state,
            country: data.country
        });
    }

    async function changeInfo(latitude, longitude) {
        await Promise.all([
            changePosition(latitude, longitude),
            changeWeather(latitude, longitude)
        ]);
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
        console.log(weather, "weather");
    }, [coordinates]);

    var settings1 = {
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false
                }
            },
            {
                breakpoint: 792,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    var settings2 = {
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    dots: false
                }
            },
            {
                breakpoint: 792,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            }
        ]
    };

    return (
        <Container className={styles.home}>
            {weather != null && position != null && locations != null &&
                <div>
                    <Row style={{ marginBottom: '1em', zIndex: 1000 }}>
                        <Col sm="12">
                            <Slider {...settings2}>
                                {locations.map((location, i) => {
                                    return (
                                        <LocalCard weather={weather} local={location} key={i} onClick={() => changeInfo(location.lat, location.long)}/>
                                    )
                                })}
                            </Slider>
                        </Col>
                    </Row>
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
                    <Row style={{ marginTop: '1em', zIndex: 1000 }}>
                        <Col sm="12">
                            <Slider {...settings1}>
                                {weather.days.map((weather, i) => {
                                    return <NextdaysCard weather={weather} key={i} />
                                })}
                            </Slider>
                        </Col>
                    </Row>
                </div>
            }
        </Container>
    )
}