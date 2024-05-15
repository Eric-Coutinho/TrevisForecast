import { useEffect, useState } from "react";

import styles from './styles.module.scss';

import { GoAlertFill } from "react-icons/go";
import { FaLocationPin } from "react-icons/fa6";

export default function InformationCard({ type, icone, info, style }) {
    const [icon, setIcon] = useState(null);
    const [bg, setBg] = useState("rgb(204, 204, 204)");

    useEffect(() => {
        switch (icone) {
            case "pin":
                setIcon(<FaLocationPin />);
                break;
            case "alerts":
                setIcon(<GoAlertFill />);
                setBg("orange");
                break;
            default:
                setIcon(null);
        }
    }, [icone]);

    return (
        <div className={styles.cardBg} style={{ ...style, backgroundColor: bg }}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.location}>
                <ul>
                    {info.map((information, i) => {
                        return <li key={i}>{information}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}