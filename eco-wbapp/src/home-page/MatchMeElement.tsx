import { Box, Typography } from '@mui/material';
import MatchMeComponent from './MatchMeComponent';

export default function MatchMeElement() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        gap: '120px',
        marginTop: '100px',
        backgroundColor: '#EFE3C2',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Poppins',
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
          fontFamily: 'Poppins',
          color: '#555555',
          lineHeight: '1.6',
          width: '80%',
        }}
      >
        Praesent faucibus neque id eleifend scelerisque. Ut blandit nunc ac
        magna ultricies aliquam.
      </Typography>
      <MatchMeComponent />
    </Box>
  );
}
