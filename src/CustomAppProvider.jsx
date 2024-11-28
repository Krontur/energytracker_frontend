import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { Dashboard, Group, ElectricMeter, HomeMax, Bolt } from '@mui/icons-material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Home',
    icon: <Dashboard />,
    path: '/',
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <Group />,
    path: '/users',
  },
  {
    segment: 'meters',
    title: 'Meters',
    icon: <ElectricMeter />,
    path: '/meters',
  },
  {
    segment: 'stations',
    title: 'Stations',
    icon: <HomeMax />,
    path: '/stations',
  },
  {
    segment: 'metering-points',
    title: 'Metering Points',
    icon: <Bolt />,
    path: '/metering-points',
  }
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



function useRouter(initialPath) {

  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  
  const navigate = useNavigate();

  useEffect(() => {
    navigate(pathname);
  }, [pathname, navigate]);


  return router;
}

function CustomAppProvider() {
  const location = useLocation();
  const router = useRouter(location.pathname);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      router={router}
      theme={theme}
    >
      <Outlet />
    </AppProvider>
  );
}

export default CustomAppProvider;
