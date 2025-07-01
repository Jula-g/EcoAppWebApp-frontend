import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../apiContext';
import MenuAppBar from '../menu-bar/MenuAppBar';

function AccountPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const apiClient = useApi();

  const user = JSON.parse(localStorage.getItem('authUser') || '{}');

  const handleLogout = () => {
    apiClient.logout();
    setOpenSnackbar(true); // Show the popup when logging out
    setTimeout(() => {
      navigate('/login'); // Redirect after the popup closes
    }, 1000);
  };

  const navigateToHomePage = () => {
    navigate('/');
  };

  const navigateToOfferedProducts = () => {
    navigate('/offered-products');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#EFE3C2',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuAppBar />
        <Box
          sx={{
            maxWidth: '100%',
            height: '100vh',
            padding: '5%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#EFE3C2',
          }}
        >

          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#EFE3C2',
              width: '100%',
              marginTop: '40px',
            }}
          >
            {/* Left side with user information */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '60%',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Poppins', color: '#123524' }}>
                Welcome, {user?.name || 'Guest'}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '24px', color: '#123524' }}>
                Email: {user?.email || 'Not provided'}
              </Typography>

              <Button
                variant="contained"
                onClick={navigateToOfferedProducts}
                sx={{
                  backgroundColor: '#123524',
                  color: '#EFE3C2',
                  marginTop: '20px',
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  '&:hover': { backgroundColor: '#85A947' },
                }}
              >
                View Your Products
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Log Out
              </Button>
            </Box>
          </Box>
          <Divider sx={{ width: '100%', marginTop: '80px' }} />
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        message="You have been logged out"
        autoHideDuration={1000} // Automatically hide after 1 second
        onClose={handleCloseSnackbar}
      />
    </>
  );
}

export default AccountPage;