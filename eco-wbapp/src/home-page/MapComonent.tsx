import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';

const MapComponent = () => {
  const [markers, setMarkers] = useState<any[]>([]);

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        setMarkers((current) => [...current, e.latlng]);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={{ lat: 52.229676, lng: 21.012229 }} // Centrum mapy (Warszawa)
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      {/* Warstwa kafelków mapy */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Obsługa kliknięcia i dodawania pinezek */}
      <AddMarkerOnClick />
      {/* Wyświetlanie markerów */}
      {markers.map((position, index) => (
        <Marker key={index} position={position} />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
