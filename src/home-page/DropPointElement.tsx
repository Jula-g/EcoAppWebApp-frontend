import { Box, Button, Typography } from '@mui/material';
import DropPointComponent from './DropPointComonent';
import { useNavigate } from 'react-router-dom';

export default function DropPointElemtent() {
  const navigate = useNavigate(); // Hook for navigation

  const handleRedirect = () => {
    navigate('/drop-point'); // Redirect to the shop page
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
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Comfortaa',
            fontWeight: 'bold',
            fontSize: '80px',
            color: '#123524',
          }}
        >
          Drop Point
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Comfortaa',
            color: '#123524',
            fontSize: '24px',
            lineHeight: '1.6',
            marginTop: '80px',
          }}
        >
          Reduce waste by dropping off your recyclable items at thier specific
          drop points. Where wase is collected and recycled.
        </Typography>

        <Button
          variant="contained"
          onClick={handleRedirect}
          sx={{
            backgroundColor: '#123524',
            color: '#EFE3C2',
            width: '250px',
            padding: '10px 20px',
            fontSize: '25px',
            fontFamily: 'Comfortaa',
            elevation: 0,
            fontWeight: 800,
            textTransform: 'none',
            borderRadius: '8px',
            marginTop: '40px',
            boxShadow: 'none',
          }}
        >
          Drop Now
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
        }}
      >
        <DropPointComponent />
      </Box>
    </Box>
  );
}
