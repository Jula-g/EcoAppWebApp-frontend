import { Box } from '@mui/material';
import React from 'react';
import SwipeCards from './MatchMeComponent';
import MenuAppBar from '../menu-bar/MenuAppBar';

export default function MatchMe() {
  return (
    <Box
      sx={{
        backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <MenuAppBar />

      <Box
        sx={{
          backgroundColor: 'green',
          minWidth: '85%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '70px',
          display: 'flex',
          padding: '20px',
          borderRadius: '28px',
          flexDirection: 'column',
        }}
      >
        <SwipeCards />
      </Box>
    </Box>
  );
}
