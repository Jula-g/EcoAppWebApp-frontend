import React from 'react';
import { Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import foodImage from './images-home-page/food.png';
import batteryImage from './images-home-page/battery.png';
import furnitureImage from './images-home-page/furniture.png';
import clothesImage from './images-home-page/clothes.png';

const categories = [
  { name: 'Food', image: foodImage },
  { name: 'Battery', image: batteryImage },
  { name: 'Furniture', image: furnitureImage },
  { name: 'Clothes', image: clothesImage },
];

const CatSelectComponent: React.FC = () => {
  const handleImageClick = (category: string) => {
    console.log(`${category} clicked!`);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: '100%',
          padding: '30px',
          margin: 'auto',
          backgroundColor: '#c9c9c9',
          boxShadow: 'none',
          borderRadius: '20px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'BLACK',
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'Poppins',
          }}
        >
          Categories
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {categories.map(({ name, image }) => (
            <CardActionArea
              key={name}
              onClick={() => handleImageClick(name)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'black',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontFamily: 'Poppins',
                }}
              >
                {name}
              </Typography>
            </CardActionArea>
          ))}
        </Box>
      </Card>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
    </>
  );
};

export default CatSelectComponent;
