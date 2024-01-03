import { createBrowserRouter } from 'react-router-dom';
import { Home } from 'src/pages/Home';
import { Settings } from './pages/Settings/Settings';
import { CreateEdit } from './pages/CreateEdit';
import { Layout } from './pages/layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/mesai-takip',
        element: <Home />,
      },
      {
        path: '/mesai-takip/settings',
        element: <Settings />,
      },
      {
        path: '/mesai-takip/create',
        element: <CreateEdit />,
      },
      {
        path: '/mesai-takip/edit/:editId',
        element: <CreateEdit />,
      },
    ],
  },
]);
