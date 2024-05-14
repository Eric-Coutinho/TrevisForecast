import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './styles.module.scss';
import TemperatureCard from '../../components/temperatureCard';
import InformationCard from '../../components/LocationCard';
import WeatherCard from '../../components/weatherCard';

export default function HomePage() {

    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        let listCondition = ["Overcast", "Cloudcover: 100", "Dew: 57.1", "Feels Like: 57.1", "Humidity: 100", "Pressure: 1021", "Wind Direction: 60", "Wind Speed: 4.7"];
        setConditions(listCondition);
      }, []);

    return (
        <Row>
            <Col sm="12" md="3" lg="3" className={styles.col}>
                <Container className={styles.container}>
                    <InformationCard type="Current Location" icone="pin" info="Curitiba - Brazil"/>
                    <InformationCard type="Alerts" icone="alerts" info="Quick and severe temperature drop." />
                </Container>
            </Col>
            <Col sm="12" md="6" lg="6" style={{ padding: '0', marginTop: '0.5em' }}>
                <TemperatureCard style={{ paddingInline: '1em' }}/>
            </Col>
            <Col sm="12" md="3" lg="3" className={styles.col}>
                <WeatherCard currentCondition={conditions}/>
            </Col>
        </Row>
    )
}