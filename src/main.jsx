import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CustomAppProvider from './CustomAppProvider.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Users from './components/user/users.jsx';
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
            path: 'meters',
            element: <div>Meters Page</div>,
          },
          {
            path: 'stations',
            element: <div>Stations Page</div>,
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
    <RouterProvider router={router}/>
  </StrictMode>,
)
