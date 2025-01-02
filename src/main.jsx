import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Users from './components/user/users.jsx';
import Meters from './components/meter/meters.jsx';
import Stations from './components/station/Stations.jsx';
import EnergyMeterInfo from './components/meter/MeterInfo.jsx';
import StationInfo from './components/station/StationInfo.jsx';
import MeteringPoints from './components/meteringpoint/MeteringPoints.jsx';
import MeteringPointInfo from './components/meteringpoint/MeteringPointInfo.jsx';
import Consumptions from './components/consumption/Consumptions.jsx';
import Home from './pages/Home.jsx';
import App from './layouts/App.jsx';
import CustomAppProviderWithAuth from './pages/CustomAppProviderWithAuth.jsx';
import SigninForm from './components/auth/SigninForm.jsx';
import SignupForm from './components/auth/SignupForm.jsx';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    element: <CustomAppProviderWithAuth/>,
    children: [
      {
        path: '/signin',
        element: <SigninForm />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
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
            element: <ProtectedRoute element={<Users />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/meters',
            element: <ProtectedRoute element={<Meters />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/meters/:id',
            element: <ProtectedRoute element={<EnergyMeterInfo />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/stations',
            element: <ProtectedRoute element={<Stations />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/stations/:id',
            element: <ProtectedRoute element={<StationInfo />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/metering-points',
            element: <ProtectedRoute element={<MeteringPoints />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/metering-points/:id',
            element: <ProtectedRoute element={<MeteringPointInfo />} allowedRoles={['USER', 'ADMIN']} />,
          },
          {
            path: '/consumptions',
            element: <ProtectedRoute element={<Consumptions />} allowedRoles={['USER', 'ADMIN']} />,
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
