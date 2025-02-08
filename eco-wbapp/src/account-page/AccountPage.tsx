import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { useApi } from '../apiContext';

function AccountPage() {

  // const { logout } = useAuth();
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '1200px',
          }}
        >
          <Typography
            sx={{
              fontSize: '38px',
              color: 'black',
              paddingLeft: '55px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
            onClick={navigateToHomePage}
          >
            ECCOGANG
          </Typography>
          <Divider
            sx={{ marginTop: '20px', marginBottom: '20px', width: '100%' }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: '38px', color: 'black', marginTop: '20px' }}
            >
              Account
            </Typography>
            <Divider sx={{ width: '300px', marginBottom: '20px' }} />


            {/* User Info */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                Welcome, {user?.name || 'Guest'}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                Email: {user?.email || 'Not provided'}
              </Typography>

              {/* Logout Button */}
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ marginTop: '20px' }}
              >
                Log Out
              </Button>
            </Box>
            <Divider sx={{ width: '100%', marginTop: '80px' }} />
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        message="You have been logged out"
        autoHideDuration={1000} // Automatically hide after 3 seconds
        onClose={handleCloseSnackbar}
      />
    </>
  );
}

export default AccountPage;