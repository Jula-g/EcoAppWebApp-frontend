import { Box, Typography } from '@mui/material';
import React from 'react';
import SwipeCards from './MatchMeComponent';
import MenuAppBar from '../menu-bar/MenuAppBar';

export default function MatchMe() {
  return (
    <Box
      sx={{
        backgroundColor: '#EFE3C2', // Matches your site background
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MenuAppBar />

      {/* Container to center content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '70px',
          px: '20px',
        }}
      >
        {/* Wider white box with two-column layout */}
        <Box
          sx={{
            width: '90%',
            maxWidth: '1200px', // Adjust for how wide you want the box
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            p: '40px 20px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, side-by-side on desktop
            gap: '20px',
          }}
        >
          {/* LEFT SIDE: Information Text */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Poppins',
                color: '#123524',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Product Information
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Poppins',
                color: '#555555',
                mb: 2,
              }}
            >
              Here you can display additional details about the product,
              including location, price, or materials. This text can dynamically
              update based on the currently swiped card if you wish to pass data
              to this component.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Poppins',
                color: '#7A7A7A',
              }}
            >
              For instance, when you swipe a card on the right, you could show
              more info here (category, rating, stock availability, etc.).
              Customize this section as needed.
            </Typography>
          </Box>

          {/* RIGHT SIDE: Swipe Component */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SwipeCards />
          </Box>
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
          &copy; {new Date().getFullYear()} EcoStore. Crafted with care for our
          planet.
        </Typography>
      </Box>
    </Box>
  );
}
