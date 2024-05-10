import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KEY } from '../../env';
import styles from './styles.module.scss';

export default function TemperatureCard() {
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
        <>
            Temperatura: {weather == null ? '' : (weather.currentConditions ? `${weather.currentConditions.temp}` : 'not available')}
            {weather && weather.currentConditions && <img src={`weather_types/${weather.currentConditions.icon}.png`} alt="Weather Icon" />}
        </>
    );
}
