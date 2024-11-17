import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const MapComponent = () => {
  const [markers, setMarkers] = useState<any[]>([]);

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        setMarkers((current) => [...current, e.latlng]);
      },
    });
    return null;
  };

  const handleResetMarkers = () => {
    setMarkers([]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <MapContainer
        center={[52.229676, 21.012229]} // Centrum mapy (Warszawa)
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddMarkerOnClick />
        {markers.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </MapContainer>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleResetMarkers}
      >
        Reset Markers
      </Button>
    </Box>
  );
};

export default MapComponent;
