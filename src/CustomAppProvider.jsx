import React from 'react';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import User from '@mui/icons-material/Group';
import ElectricMeter from '@mui/icons-material/ElectricMeter';
import HomeMax from '@mui/icons-material/HomeMax';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Home',
    icon: <DashboardIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <User />,
  },
  {
    segment: 'meters',
    title: 'Meters',
    icon: <ElectricMeter />,
  },
  {
    segment: 'stations',
    title: 'Stations',
    icon: <HomeMax />,
  },
];

const BRANDING = {
    title: 'Energy Tracker',
    logo: (
        <Box sx={{ height: '40px', width: 'auto', display: 'flex', alignItems: 'center' }}>
          <img src="/src/assets/react.svg" alt="Energy Tracker" style={{ maxHeight: '100%', width: 'auto' }} />
        </Box>
      ),
  };

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function CustomAppProvider() {

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      theme={theme}
    >
      <Outlet />
    </AppProvider>
  );
}

export default CustomAppProvider;
