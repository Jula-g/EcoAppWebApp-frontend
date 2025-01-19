import { Box, Card, CardActionArea, Typography } from '@mui/material';
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
          {dropPointCategories.map(({ name, image }) => (
            <CardActionArea
              key={name}
              onClick={() => handleCategoryClick(name)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '200px', // Keeps the card narrower
                  height: '350px', // Makes the card taller
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    width: '100%',
                    height: '70%', // Allocates 70% of the card height for the image
                    overflow: 'hidden',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    backgroundColor: '#f0f0f0', // Placeholder background
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

                {/* Text Section */}
                <Typography
                  variant="h6"
                  sx={{
                    color: '#123524',
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    marginTop: '10px',
                    padding: '0 10px', // Adds horizontal padding for better readability
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </CardActionArea>
          ))}
        </Box>
      </Card>
    </>
  );
};

export default DropPointComponent;
