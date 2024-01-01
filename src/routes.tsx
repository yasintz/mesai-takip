import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Settings } from './pages/Settings/Settings';
import { CreateEdit } from './pages/CreateEdit';
import { Layout } from './pages/layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/mesai-takip',
        element: <App />,
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
