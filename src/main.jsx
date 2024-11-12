import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CustomAppProvider from './CustomAppProvider.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './layouts/dashboard.jsx';
import Users from './components/user/users.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    Component: CustomAppProvider,
    children: [
      {
        path: '/',
        Component: Dashboard,
        children: [
          {
            path: '',
            Component: Home,
          },
          {
            path: '/users',
            Component: Users,
          },
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
    <RouterProvider router={router} />
  </StrictMode>,
)
