import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, CssBaseline, Box } from '@mui/material';
import { Home, Group, ElectricMeter, HomeMax } from '@mui/icons-material';
import Users from './user/components/users';
import logo from './assets/logoenergytracker.png';
import background from './assets/backgroundET.png';


const drawerWidth = 240;

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Energy Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          height: '100%',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box component="img" src={logo} alt="Energy Tracker Logo" sx={{ width: '100%', maxHeight: 196, objectFit: 'contain' }} />
        </Toolbar>
        <List>
            {[{ text: 'Home', icon: <Home /> }, { text: 'Users', icon: <Group /> }, { text: 'Meters', icon: <ElectricMeter /> }, { text: 'Stations', icon: <HomeMax /> }].map((item) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingTop: 15
          }}
      >
        <Box component="img" src={background} alt="Energy Tracker Background" sx={{ width: '100%', objectFit: 'contain', maxWidth: '1280px' }} />
        <Toolbar />
        <Typography>
          Welcome to the homepage. Select an option from the menu on the left to get started.
        </Typography>
        <Users />
      </Box>
    </Box>
  );
}

export default App;
