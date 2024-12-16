import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomizedSteppers from './ProgressComponent';

export default function PurchaseNavBar() {
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate('/');
  };
  return (
    <AppBar
      sx={{
        backgroundColor: 'black',
        position: 'fixed',
        height: '80px',
        paddingLeft: '60px',
        paddingRight: '60px',
        paddingBottom: '10px',
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side - Placeholder for Logo or Title */}
        <Typography sx={{ cursor: 'pointer' }} onClick={navigateToHomePage}>
          EcoApp
        </Typography>
        {/* Yellow box at the top */}
        <Box
          sx={{
            backgroundColor: 'yellow',
            width: '80%',
            minHeight: '80px',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomizedSteppers />
        </Box>

        {/* Right Side - Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
      </Toolbar>
    </AppBar>
  );
}
