import MapaComponent from "../../components/map";

import styles from "./styles.module.scss"

export default function LocationsPage() {
    return (
        <div className={styles.mapaContainer}>
            <MapaComponent />
        </div>
    )
}