import React from 'react';
import { Box, CardActionArea, Divider, Typography } from '@mui/material';

// Example images (yours may differ)
import foodImage from './images-home-page/food.png';
import batteryImage from './images-home-page/battery.png';
import furnitureImage from './images-home-page/furniture.png';
import clothesImage from './images-home-page/clothes.png';
import dropPointImage from './images-home-page/drop-point.png';
import matchImage from './images-home-page/match.png';

const categories = [
  { name: 'Food', image: foodImage },
  { name: 'Battery', image: batteryImage },
  { name: 'Furniture', image: furnitureImage },
  { name: 'Clothes', image: clothesImage },
  { name: 'Drop-point', image: dropPointImage },
  { name: 'Match Me', image: matchImage },
];

const CatSelectComponent: React.FC = () => {
  const handleImageClick = (category: string) => {
    console.log(`${category} clicked!`);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#EFE3C2',
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            marginTop: '60px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '40px',
          }}
        >
          {categories.map(({ name, image }) => (
            <CardActionArea
              key={name}
              onClick={() => handleImageClick(name)}
              sx={{
                // Each item is a column in our grid
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EFE3C2',
                borderRadius: '12px',
                padding: '16px',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={name}
                sx={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  // Grayscale + hover effect
                  filter: 'grayscale(100%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#123524',
                  fontFamily: 'Poppins',
                  textAlign: 'center',
                  marginTop: '12px',
                  fontWeight: 600,
                }}
              >
                {name}
              </Typography>
            </CardActionArea>
          ))}
        </Box>
      </Box>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
    </>
  );
};

export default CatSelectComponent;
