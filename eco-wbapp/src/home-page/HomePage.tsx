import { Box, Typography, Button, CssBaseline } from '@mui/material';
import MenuAppBar from '../menu-bar/MenuAppBar';
import OpeningComonent from './OpeningComonent';
import DropPointComponent from './DropPointComonent';
import ShopElement from './ShopElement';
import DropPointElemtent from './DropPointElement';

function HomePage() {
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

          {/* Match Finder Box */}
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
              }}
            >
              Praesent faucibus neque id eleifend scelerisque. Ut blandit nunc
              ac magna ultricies aliquam.
            </Typography>
          </Box>
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
