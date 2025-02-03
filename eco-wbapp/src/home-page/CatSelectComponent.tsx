import React from 'react';
import { Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import foodImage from './images-home-page/food.png';
import batteryImage from './images-home-page/battery.png';
import furnitureImage from './images-home-page/furniture.png';
import clothesImage from './images-home-page/clothes.png';
import dropPointImage from './images-home-page/drop-point.png';
import matchImage from './images-home-page/match.png';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Food', image: foodImage },
  { name: 'Battery', image: batteryImage },
  { name: 'Furniture', image: furnitureImage },
  { name: 'Clothes', image: clothesImage },
  { name: 'Drop-point', image: dropPointImage },
  { name: 'Match Me', image: matchImage },
];

const CatSelectComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleImageClick = (category: string) => {
    console.log(`${category} clicked!`);

    if (category == 'Drop-point') {
      navigate('/drop-point');
    } else {
      console.log(`${category} clicked!`);
    }


  };

  return (
    <>
      <Card
        sx={{
          maxWidth: '100%',
          padding: '30px',
          margin: 'auto',
          backgroundColor: '#85A947',
          borderRadius: '20px',
        }}
      >
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
              }}
            >
              <Box
                sx={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
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
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </CardActionArea>
          ))}
        </Box>
      </Card>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
    </>
  );
};

export default CatSelectComponent;
