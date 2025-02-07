import { Box, Button, Typography } from '@mui/material';
import MatchMeComponent from './MatchMeComponent';
import { useNavigate } from 'react-router-dom';

export default function MatchMeElement() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/match-finder'); // Redirect to the shop page
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: '30px',
        display: 'flex',
        borderRadius: '16px',
        // Change flexDirection to row
        flexDirection: 'row',
        // Adjust gap as needed
        gap: '80px',
        marginTop: '100px',
        backgroundColor: '#EFE3C2',
      }}
    >
      {/* Left side: Text */}
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
          Match Finder
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Comfortaa',
            color: '#555555',
            lineHeight: '1.6',
            width: '80%',
          }}
        >
          Praesent faucibus neque id eleifend scelerisque. Ut blandit nunc ac
          magna ultricies aliquam.
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
          Find Match
        </Button>
      </Box>

      {/* Right side: Heart image */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <MatchMeComponent />
      </Box>
    </Box>
  );
}
