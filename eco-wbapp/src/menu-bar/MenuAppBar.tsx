import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function MenuAppBar() {
  return (
    <AppBar
      sx={{
        backgroundColor: '#03fbff',
        position: 'fixed',
        height: '80px',
        paddingLeft: '60px',
        paddingRight: '60px',
        paddingBottom: '10px',
        justifyContent: 'center',
      }}
    ></AppBar>
  );
}

export default MenuAppBar;
