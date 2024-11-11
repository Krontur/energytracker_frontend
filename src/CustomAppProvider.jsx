import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import User from '@mui/icons-material/Group';
import ElectricMeter from '@mui/icons-material/ElectricMeter';
import HomeMax from '@mui/icons-material/HomeMax';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Height } from '@mui/icons-material';

// Definición de la navegación
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
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

// Definición del tema personalizado
const demoTheme = createTheme({
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

// Componente de contenido de página
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Componente principal de la aplicación
function CustomAppProvider() {
  const router = useDemoRouter('/page');

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default CustomAppProvider;
