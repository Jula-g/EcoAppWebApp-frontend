import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';
import { isTokenExpired } from '../utils/authUtils';

function MenuAppBar() {
  const [elevate, setElevate] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = () => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setElevate(true);
      } else {
        setElevate(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      sx={{
        backgroundColor: '#123524', // Teal/blue-green background
        position: 'fixed',
        boxShadow: elevate ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
        padding: '0 30px', // Horizontal padding
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side - Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            onClick={() => navigate('/home-page')}
            variant="h6"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: '30px',
              color: '#85A947', // Yellow color for text/logo
              cursor: 'pointer',
            }}
          >
            ECCOGANG
          </Typography>
        </Box>

        {/* Center Menu Items */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Navigation Items */}
          <Typography
            variant="body1"
            onClick={() => navigate('/shop-page')} // Navigate to Shop page
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '25px',
              color: '#85A947',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Shop
          </Typography>
          <Typography
            variant="body1"
            onClick={() => navigate('/drop-point')} // Navigate to Drop Point page
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '25px',
              color: '#85A947',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Drop Point
          </Typography>
          <Typography
            variant="body1"
            onClick={() => navigate('/match-finder')} // Navigate to Match Finder page
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '25px',
              color: '#85A947',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Match Finder
          </Typography>
        </Box>

        {/* Right Side - Account and Cart */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Account */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            <PersonIcon sx={{ color: '#85A947' }} />
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#85A947',
              }}
            >
              Account
            </Typography>
          </Box>
          {/* Cart */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/cart')} // Navigate to Cart page
          >
            <ShoppingCartIcon sx={{ color: '#85A947' }} />
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#85A947',
              }}
            >
              Cart
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar;
