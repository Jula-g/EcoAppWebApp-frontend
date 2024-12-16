import { Box } from '@mui/material';
import React from 'react';
import SwipeCards from './MatchMeComponent';
import MenuAppBar from '../menu-bar/MenuAppBar';

export default function MatchMe() {
  return (
    <Box>
      <Box sx={{ position: 'fixed' }}>
        <MenuAppBar />
      </Box>
      <Box>
        <SwipeCards />
      </Box>
    </Box>
  );
}
