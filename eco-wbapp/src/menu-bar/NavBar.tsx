import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const scrollToSection = (sectionId = '', offset = 0) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop - offset,
      behavior: 'smooth',
    });
  }
};

const NavBar = ({ visible }: { visible: boolean }) => {
  const [activeSection, setActiveSection] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const navItems = [
    { label: 'About Us', section: 'about-us' },
    { label: 'Menu', section: 'menu' },
    { label: 'Contact', section: 'contact' },
    { label: 'Find Us', section: 'find-us' },
  ];

  const handleClick = (section = '') => {
    const offset = 80;
    scrollToSection(section, offset);
    setActiveSection(section);
    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  };

  const handleScroll = () => {
    const offset = 100; // Adjust this value as needed
    let found = false;
    navItems.forEach((item) => {
      const section = document.getElementById(item.section);
      if (section) {
        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY - offset;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          setActiveSection(item.section);
          found = true;
        }
      }
    });
    if (!found) {
      setActiveSection('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderNavItems = () =>
    navItems.map((item) => (
      <Box
        key={item.section}
        sx={{
          mx: 2,
          cursor: 'pointer',
          position: 'relative',
          height: '100%',
          alignContent: 'center',
          color: 'white',
          '&:hover': {
            color: 'red',
          },
          ...(activeSection === item.section && {
            color: 'red', 
          }),
        }}
        onClick={() => handleClick(item.section)}
      >
        {item.label}
        {activeSection === item.section && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -14,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: 'red',
            }}
          />
        )}
      </Box>
    ));

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'black',
          position: 'fixed',
          height: '80px',
          paddingLeft: isSmallScreen ? '10px' : '60px',
          paddingRight: isSmallScreen ? '10px' : '60px',
          paddingBottom: '10px',
          justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      >
        <Toolbar>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: 'white', fontFamily: 'roboto' }}
            >
              BUTCHER
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ flexGrow: 1, color: 'white', fontFamily: 'roboto' }}
            >
              Steak House & Coctail Bar
            </Typography>
          </Box>
          {isSmallScreen ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                  sx: { backgroundColor: 'black', marginTop: '80px' },
                }} // Adjust paddingTop to avoid overlap with AppBar
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      key={item.section}
                      onClick={() => handleClick(item.section)}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          color:
                            activeSection === item.section ? 'red' : 'white',
                          '&:hover': {
                            color: 'red',
                          },
                          fontFamily: 'roboto',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            renderNavItems()
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
