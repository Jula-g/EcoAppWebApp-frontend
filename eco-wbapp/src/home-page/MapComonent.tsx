import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import MenuAppBar from '../menu-bar/MenuAppBar';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import LunchDiningSharpIcon from '@mui/icons-material/LunchDiningSharp';
import HeadphonesBatteryIcon from '@mui/icons-material/HeadphonesBattery';
import CheckroomIcon from '@mui/icons-material/Checkroom';


const foodIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <LunchDiningSharpIcon style={{ fontSize: '30px', color: 'red' }} />
  ),
  className: '',
  iconSize: [30, 30],
});

const electronicsIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <HeadphonesBatteryIcon style={{ fontSize: '30px', color: 'green' }} />
  ),
  className: '',
  iconSize: [30, 30],
});

const clothesIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <CheckroomIcon style={{ fontSize: '30px', color: 'blue' }} />
  ),
  className: '',
  iconSize: [30, 30],
});
const MapComponent = () => {
  const mockMarkersFood = [
    { lat: 52.229676, lng: 21.012229 }, // Warsaw
    { lat: 52.406374, lng: 16.9251681 }, // Poznań
    { lat: 50.0646501, lng: 19.9449799 }, // Kraków
    { lat: 51.1078852, lng: 17.0385376 }, // Wrocław
  ];

  const mockMarkersElectronics = [
    { lat: 51.246454, lng: 22.568446 }, // Lublin
    { lat: 53.013799, lng: 18.600178 }, // Bydgoszcz
    { lat: 50.675106, lng: 17.921287 }, // Opole
    { lat: 54.372158, lng: 18.638155 }, // Gdańsk
  ];

  const mockMarkersClothes = [
    { lat: 51.107885, lng: 17.038537 }, // Wrocław
    { lat: 54.352025, lng: 18.646638 }, // Gdańsk
    { lat: 52.229217, lng: 21.011796 }, // Warsaw
    { lat: 53.013798, lng: 18.596223 }, // Bydgoszcz
  ];

  const [foodMarkers] = useState(
    mockMarkersFood.map((m) => ({ position: L.latLng(m.lat, m.lng), icon: foodIcon }))
  );
  const [electronicsMarkers] = useState(
    mockMarkersElectronics.map((m) => ({ position: L.latLng(m.lat, m.lng), icon: electronicsIcon }))
  );
  const [clothesMarkers] = useState(
    mockMarkersClothes.map((m) => ({ position: L.latLng(m.lat, m.lng), icon: clothesIcon }))
  );

  const categoryMarkersMap: { [key: string]: { position: L.LatLng; icon: L.DivIcon }[] } = {
    Food: foodMarkers,
    Electronics: electronicsMarkers,
    Clothes: clothesMarkers,
  };

  const renderMarkers = (
    markers: { position: L.LatLng; icon: L.DivIcon }[]
  ) => {
    return markers.map((marker, index) => (
      <Marker key={index} position={marker.position} icon={marker.icon} />
    ));
  };

  const categories: (keyof typeof categoryMarkersMap)[] = ['Food', 'Electronics', 'Clothes'];

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({ ...acc, [category]: false }), {})
  );

  const areAllUnchecked = Object.values(checkedState).every((isChecked) => !isChecked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <MenuAppBar />

      <Box
        sx={{
          backgroundColor: 'green',
          minWidth: '85%',
          minHeight: '80%',
          marginTop: '75px',
          marginBottom: '10px',
          flexGrow: 1,
          display: 'flex',
          padding: '20px',
          borderRadius: '28px',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'top',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'lightgreen',
            display: 'flex',
            borderRadius: '28px',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'top',
            minWidth: '20%',
            minHeight: '80%',
            paddingLeft: '20px',
          }}
        >

          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins',
              color: '#123524',
              fontSize: '48px',
              fontStyle: 'bold',
              lineHeight: '1.6',
            }}
          >
            Category
          </Typography>

          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={checkedState[category]}
                    onChange={handleCheckboxChange}
                    name={category.toString()}
                    color="primary"
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Box>

        <Box
          sx={{
            flex: 3,
            backgroundColor: 'lightgreen',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '28px',
            }}
          >
            <MapContainer
              center={{ lat: 52.229676, lng: 21.012229 }} // Center of the map (Warsaw)
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              {/* Warstwa kafelków mapy */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Wyświetlanie markerów */}

              {categories.map((category) => {
                if (checkedState[category]) {
                  return renderMarkers(categoryMarkersMap[category]);
                } else if (areAllUnchecked) {
                  return Object.values(categoryMarkersMap).map((categoryMarkers) =>
                    renderMarkers(categoryMarkers)
                  );
                }
              })};

              {/* // {renderMarkers(foodMarkers)}
              // {renderMarkers(electronicsMarkers)}
              // {renderMarkers(clothesMarkers)} */}
            </MapContainer>
          </Box>
        </Box>
      </Box>
    </Box >
  );

};

export default MapComponent;
