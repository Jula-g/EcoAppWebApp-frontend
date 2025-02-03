import React from 'react';
import { Box, CardActionArea, Typography } from '@mui/material';

// Example images (replace with your paths)
import ClWaste from './images-home-page/clothes_waste.jpg';
import ElWaste from './images-home-page/electric_waste.jpg';
import FWaste from './images-home-page/food_waste.jpg';

const dropPointCategories = [
  { name: 'Clothes Waste', image: ClWaste },
  { name: 'Electronic Waste', image: ElWaste },
  { name: 'Food Waste', image: FWaste },
];

const DropPointComponent: React.FC = () => {
  const handleCategoryClick = (category: string) => {
    console.log(`${category} clicked!`);
  };

  return (
    <>
      {/* Wrapper Box */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#EFE3C2',
          borderRadius: '16px',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '5px',
          }}
        >
          {dropPointCategories.map(({ name, image }) => (
            <CardActionArea
              key={name}
              onClick={() => handleCategoryClick(name)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#EFE3C2',
                borderRadius: '16px',
                overflow: 'hidden',

                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transform: 'translateY(-4px)',
                },
                width: '200px',
                height: '400px', // Same tall shape
              }}
            >
              {/* Image Section */}
              <Box
                sx={{
                  width: '100%',
                  height: '90%', // 70% height for the image
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
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
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s ease',
                    '&:hover': {
                      filter: 'grayscale(0%)',
                    },
                  }}
                />
              </Box>

              {/* Text Section */}
              <Box
                sx={{
                  width: '100%',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#123524',
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </CardActionArea>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default DropPointComponent;
