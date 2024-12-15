import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function MenuAppBar() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <AppBar
      sx={{
        backgroundColor: 'black',
        position: 'fixed',
        height: '160px',
        paddingLeft: '60px',
        paddingRight: '60px',
        paddingBottom: '10px',
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side - Placeholder for Logo or Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EcoApp
        </Typography>

        {/* Right Side - Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Login Icon */}
          <IconButton
            color="inherit"
            aria-label="login"
            onClick={() => navigateToLogin()}
          >
            <PersonIcon />
          </IconButton>

          {/* Basket Icon */}
          <IconButton
            color="inherit"
            aria-label="basket"
            onClick={() => navigateToCart()}
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side - Placeholder for Logo or Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EcoApp
        </Typography>

        {/* Right Side - Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Login Icon */}
          <IconButton
            color="inherit"
            aria-label="login"
            onClick={() => navigateToLogin()}
          >
            <PersonIcon />
          </IconButton>

          {/* Basket Icon */}
          <IconButton
            color="inherit"
            aria-label="basket"
            onClick={() => navigateToCart()}
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar;
