import { Box, Button, Typography } from '@mui/material';
import forestImage from './images-home-page/Ecology-Header.jpg';

export default function OpeningComonent() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5%',
        backgroundColor: '#123524',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: 'center', md: 'left' },
          paddingRight: { md: '20px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Comfortaa',
            fontSize: '80px',
            fontWeight: 700,
            color: '#85A947',
            marginBottom: '20px',
          }}
        >
          Grow with Nature
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#85A947',
            fontSize: '22px',
            fontFamily: 'Comfortaa',

            lineHeight: '1.8',
            marginBottom: '30px',
          }}
        >
          Shop our curated collection of eco-friendly products to create a more
          sustainable lifestyle. Together, we can make a difference.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#EFE3C2',
            color: '#123524',
            width: '250px',
            padding: '10px 20px',
            fontSize: '25px',
            fontFamily: 'Comfortaa',
            fontWeight: 800,
            textTransform: 'none',
            marginTop: '20px',
            borderRadius: '8px',
          }}
        >
          Explore Now
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={forestImage}
          alt="Eco-friendly products"
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '16px',
          }}
        />
      </Box>
    </Box>
  );
}
