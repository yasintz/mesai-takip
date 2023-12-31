import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Settings } from './pages/Settings/Settings';

export const router = createBrowserRouter([
  {
    path: '/mesai-takip',
    element: <App />,
  },
  {
    path: '/mesai-takip/settings',
    element: <Settings />,
  },
]);
