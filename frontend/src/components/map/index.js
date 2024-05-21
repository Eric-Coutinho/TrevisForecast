import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import styles from "./styles.module.scss"

function LocationMarker() {
    const [popupPosition, setPopupPosition] = useState(null);

    useMapEvents({
        click(e) {
            setPopupPosition(e.latlng);
        }
    });

    return popupPosition && (
        <Marker position={popupPosition}>
            <Popup position={popupPosition}>
                <button className={styles.btn}>
                    Adicionar Localização
                </button>
            </Popup>
        </Marker>
    );
}

export default function MapaComponent() {
    return (
        <MapContainer center={[-25.45, -49.298]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    )
}
