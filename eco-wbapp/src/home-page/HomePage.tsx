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

function HomePage() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'red',
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
            backgroundColor: 'green',
            padding: '20px',
            width: '100%',
            maxWidth: '85%',
            minHeight: '100vh',
            margin: 'auto',
            display: 'flex',
            marginTop: '70px',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'yellow',
              width: '20%',
              minHeight: '100px',
            }}
          >
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
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
              </Collapse>
            </List>
          </Box>

          <Box
            sx={{
              backgroundColor: 'blue',
              width: '80%',
              padding: '20px',
            }}
          >
            <Swiper />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
