import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';

import styles from "./styles.module.scss"

import Button from 'react-bootstrap/Button';

import { OpenCageAPI } from '../../api/opencage';
import { KEY, KEY2 } from '../../env';
import { BackAPI } from '../../api/api';

export default function MapaComponent() {
    const [popupPosition, setPopupPosition] = useState(null);
    const [newPosition, setNewPosition] = useState(null);
    const [position, setPosition] = useState(null);
    const navigate = useNavigate();

    let lat = -25.426770
    let long = -49.265924

    let coordsUser = localStorage.getItem('coordinates');
    coordsUser = JSON.parse(coordsUser);
    if (coordsUser != null) {
        lat = coordsUser.latitude;
        long = coordsUser.longitude;
    }

    async function getPosition(lat, long) {
        const response = await OpenCageAPI.get(`json?q=${lat}%2C${long}&key=${KEY2}`);
        const data = response.data.results[0].components;
        setPosition({
            city: data.city,
            state: data.state,
            country: data.country
        });
    }

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPopupPosition(e.latlng);
                setNewPosition(e.latlng);
                getPosition(e.latlng.lat, e.latlng.lng);
            }
        });

        return popupPosition && (
            <Marker position={popupPosition}>
                <Popup position={popupPosition}>
                    <Button variant="success" onClick={async () => {
                        setNewPosition(JSON.stringify(newPosition))
                        var location = {
                            'city': position.city,
                            'country': position.country,
                            'lat': newPosition.lat,
                            'long': newPosition.lng
                        }
                        console.log(location);
                        const id = sessionStorage.getItem('token')

                        const response = await BackAPI.post(`/user/newLocation/${id}`, {
                            location
                        });
                        alert('Localização adicionada com sucesso.');
                        navigate('/locations');
                        
                    }}>Adicionar Localização</Button>
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
