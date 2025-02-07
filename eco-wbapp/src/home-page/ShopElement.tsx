import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CatSelectComponent from './CatSelectComponent';

export default function ShopElement() {
  const navigate = useNavigate(); // Hook for navigation

  const handleRedirect = () => {
    navigate('/shop-page'); // Redirect to the shop page
  };

  return (
    <Box
      sx={{
        padding: '30px',
        backgroundColor: '#EFE3C2',
        borderRadius: '16px',
        minWidth: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '20px',
      }}
    >
      {/* Text Content */}
      <Box sx={{ flex: 1, width: '40%' }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            fontSize: '80px',
            color: '#123524',
          }}
        >
          Shop
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins',
            color: '#123524',
            fontSize: '24px',
            lineHeight: '1.6',
            marginTop: '80px',
          }}
        >
          You can shop local products or get them for free, simply find what you
          are interested in, order the products, and pick them up at the given
          location.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#123524',
            color: '#EFE3C2',
            width: '250px',
            padding: '10px 20px',
            fontSize: '25px',
            fontFamily: 'Poppins',
            elevation: 0,
            fontWeight: 800,
            textTransform: 'none',
            borderRadius: '8px',
            marginTop: '40px',
            boxShadow: 'none',
          }}
          onClick={handleRedirect} // Add click event
        >
          Shop Now
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
        }}
      >
        <CatSelectComponent />
      </Box>
    </Box>
  );
}
