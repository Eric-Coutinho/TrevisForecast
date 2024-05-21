import React from "react";
import styles from './styles.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { secondary } from "../../backgroundWeather";

export default function LocalCard({ weather, local, onClick }) {
    var condition = weather.currentConditions.icon

    return (
        <div
            className={styles.cardLocation}
            style={secondary(condition)}
        >
            <Container className={styles.cardBg} onClick={onClick}>
                <Row style={{width: '100%'}}>
                    <Col sm="12" className={styles.location}>
                        {local.city}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}