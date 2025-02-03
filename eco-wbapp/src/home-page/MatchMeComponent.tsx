import React from 'react';
import { Box, Typography } from '@mui/material';

const MatchMeComponent: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        gap: '100px',
        marginTop: '100px',
        backgroundColor: '#EFE3C2', // Matches your overall design
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          width: '100%',
          height: '500px', // Fixed height for the big image
          borderRadius: '16px',
          overflow: 'hidden', // Ensures rounded corners
          position: 'relative',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Subtle shadow
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src="https://via.placeholder.com/1600x900" // Replace with your image source
          alt="Placeholder"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the image covers the box
          }}
        />
      </Box>

      {/* Text Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            fontSize: { xs: '40px', md: '80px' }, // Responsive font size
            color: '#123524',
            textAlign: 'center',
          }}
        >
          Big Image Section
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins',
            color: '#555555',
            fontSize: { xs: '16px', md: '20px' }, // Responsive font size
            lineHeight: '1.6',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          This is where your descriptive text goes. Add some details about the
          big image above and its significance. Keep the message engaging and
          concise to maintain focus.
        </Typography>
      </Box>
    </Box>
  );
};

export default MatchMeComponent;
