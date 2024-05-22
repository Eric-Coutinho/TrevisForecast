import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import styles from "./styles.module.scss"

import Button from 'react-bootstrap/Button';

export default function MapaComponent() {
    const [popupPosition, setPopupPosition] = useState(null);
    const [newPosition, setNewPosition] = useState(null);
    const [location, setLocation] = useState(null);

    let lat = -25.426770
    let long = -49.265924

    let coordsUser = localStorage.getItem('coordinates');
    coordsUser = JSON.parse(coordsUser);
    if(coordsUser != null) {
        lat = coordsUser.latitude;
        long = coordsUser.longitude;
    }
    
    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPopupPosition(e.latlng);
                setNewPosition(e.latlng);
                console.log('new Position: ', newPosition);
            }
        });
    
        return popupPosition && (
            <Marker position={popupPosition}>
                <Popup position={popupPosition}>
                <Button variant="success" onClick={() => setLocation(newPosition)}>Adicionar Localização</Button>
                </Popup>
            </Marker>
        );
    }

    return (
        <MapContainer center={[lat, long]} zoom={13} minZoom={4} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    )
}
