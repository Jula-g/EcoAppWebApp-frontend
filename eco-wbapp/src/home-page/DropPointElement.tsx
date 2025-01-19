import { Box, Button, Typography } from '@mui/material';
import DropPointComponent from './DropPointComonent';

export default function DropPointElemtent() {
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
            fontFamily: 'Poppins',
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
            fontFamily: 'Poppins',
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
