import React from 'react';
import { Box } from '@mui/material';
import heartImage from './images-home-page/heart.png';

const MatchMeComponent: React.FC = () => {
  return (
    <Box
      sx={{
        // Limit how wide the heart container gets and center it within the parent
        maxWidth: '400px',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#EFE3C2',
        borderRadius: '16px',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#EFE3C2',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-4px)',
          },
        }}
      >
        <Box
          component="img"
          src={heartImage}
          alt="Heart"
          sx={{
            // Let the image scale within the box boundaries
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            filter: 'grayscale(100%)',
            transition: 'filter 0.3s ease',
            '&:hover': {
              filter: 'grayscale(0%)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MatchMeComponent;
