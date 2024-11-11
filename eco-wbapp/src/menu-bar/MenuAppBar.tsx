import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function MenuAppBar() {
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
        <div>{/* Add your logo or title here */}</div>

        {/* Right Side - Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Login Icon */}
          <IconButton
            color="inherit"
            aria-label="login"
            onClick={() => console.log('Login clicked')}
          >
            <PersonIcon />
          </IconButton>

          {/* Basket Icon */}
          <IconButton
            color="inherit"
            aria-label="basket"
            onClick={() => console.log('Basket clicked')}
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar;
