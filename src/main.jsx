import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Users from './components/user/users.jsx';
import Meters from './components/meter/Meters.jsx';
import Stations from './components/station/Stations.jsx';
import EnergyMeterInfo from './components/meter/MeterInfo.jsx';
import StationInfo from './components/station/StationInfo.jsx';
import MeteringPoints from './components/meteringpoint/MeteringPoints.jsx';
import MeteringPointInfo from './components/meteringpoint/MeteringPointInfo.jsx';
import Consumptions from './components/consumption/Consumptions.jsx';
import Home from './pages/Home.jsx';
import App from './layouts/App.jsx';
import CustomAppProviderWithAuth from './pages/CustomAppProviderWithAuth.jsx';

const router = createBrowserRouter([
  {
    element: <CustomAppProviderWithAuth/>,
    children: [
      {
        path: '/',
        element: <App/>,
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
          },
          {
            path: '/consumptions',
            element: <Consumptions />,
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
