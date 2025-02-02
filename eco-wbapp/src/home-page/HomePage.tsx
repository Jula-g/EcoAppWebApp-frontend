import { Box, Typography, Button, CssBaseline } from '@mui/material';
import MenuAppBar from '../menu-bar/MenuAppBar';
import OpeningComonent from './OpeningComonent';
import ShopElement from './ShopElement';
import DropPointElemtent from './DropPointElement';
import MatchMeElement from './MatchMeElement';
import { useAuth } from '../authContext';
import { useEffect } from 'react';

function HomePage() {
  const { user } = useAuth(); // Access the logged-in user from AuthContext

  useEffect(() => {
    if (user) {
      console.log('User still logged in:', user);
    } else {
      console.log('User session not found or logged out.');
    }
  }, [user]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#EFE3C2' }}>
        <MenuAppBar />
        <OpeningComonent />

        <Box
          sx={{
            width: '100%',
            padding: '5%',
            display: 'flex',
            flexDirection: 'column',
            gap: '100px',
            marginTop: '100px',
            backgroundColor: '#EFE3C2',
          }}
        >
          <ShopElement />
          <DropPointElemtent />
          <MatchMeElement />
        </Box>

        <Box
          sx={{
            width: '100%',
            backgroundColor: '#123524',
            color: '#ffffff',
            padding: '30px 20px',
            textAlign: 'center',
            marginTop: '60px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              color: '#85A947',
            }}
          >
            &copy; {new Date().getFullYear()} EcoStore. Crafted with care for
            our planet.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
