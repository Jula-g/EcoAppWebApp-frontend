import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

        {/* Right Side - Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
      </Toolbar>
    </AppBar>
  );
}
