import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CustomAppProvider from './CustomAppProvider.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Users from './components/user/Users.jsx';
import Meters from './components/meter/Meters.jsx';
import Stations from './components/station/Stations.jsx';
import EnergyMeterInfo from './components/meter/MeterInfo.jsx';
import StationInfo from './components/station/StationInfo.jsx';
import MeteringPoints from './components/meteringpoint/MeteringPoints.jsx';
import MeteringPointInfo from './components/meteringpoint/MeteringPointInfo.jsx';
import Home from './pages/Home.jsx';
import App from './layouts/App.jsx';

const router = createBrowserRouter([
  {
    Component: CustomAppProvider,
    children: [
      {
        path: '/',
        Component: App,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/meters',
            element: <Meters />,
          },
          {
            path: '/meters/:id',
            element: <EnergyMeterInfo />,
          },
          {
            path: '/stations',
            element: <Stations />,
          },
          {
            path: '/stations/:id',
            element: <StationInfo />,
          },
          {
            path: '/metering-points',
            element: <MeteringPoints />,
          },
          {
            path: '/metering-points/:id',
            element: <MeteringPointInfo />,
          }
        ],
      },
    ],
  },
],
{
  future: {
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_fetcherPersist: true,
  },
}
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
