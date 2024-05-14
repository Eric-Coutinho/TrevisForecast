import { useEffect, useState } from "react";

import styles from './styles.module.scss';

export default function WeatherCard({ currentCondition }) {

    return (
        <div className={styles.cardBg}>
            {currentCondition.map((condition, i) => (
                <div className={styles.location} key={i}>
                    {condition}
                </div>
            ))}
        </div>
    )
}