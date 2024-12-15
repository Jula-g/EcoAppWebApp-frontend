import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import MenuAppBar from '../menu-bar/MenuAppBar';
import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChairIcon from '@mui/icons-material/Chair';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MapIcon from '@mui/icons-material/Map';
import Swiper from './Swiper';
import CatSelectComponent from './CatSelectComponent';
import NavBar from '../menu-bar/NavBar';

function HomePage() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#e8e8eb',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <MenuAppBar />

        <Box
          sx={{
            padding: '20px',
            width: '100%',
            maxWidth: '85%',
            minHeight: '100vh',
            margin: 'auto',
            display: 'flex',
            marginTop: '70px',
          }}
        >
          {/* <Box
            sx={{
              width: '25%',
              minHeight: '100px',
            }}
          >
            <List
              sx={{
                width: '260px',
                bgcolor: '#e8e8eb',
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ backgroundColor: '#e8e8eb' }}
                >
                  Kategorie
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ChairIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <FastfoodIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ChairIcon />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List> */}
          {/* </Collapse>
            </List>
          </Box> */}

          <Box
            sx={{
              width: '100%',
              padding: '20px',
            }}
          >
            <CatSelectComponent />
            <Typography
              variant="h4"
              sx={{
                color: 'black',
                marginBottom: '20px',
                fontFamily: 'Poppins',
              }}
            >
              Recommended
            </Typography>
            <Swiper />
            <Typography
              variant="h4"
              sx={{
                color: 'black',
                marginBottom: '20px',
                fontFamily: 'Poppins',
              }}
            >
              Bestsellers
            </Typography>
            <Swiper />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
