import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Modal from 'react-modal';
import { router } from './routes.tsx';

import 'react-spring-bottom-sheet/dist/style.css';
import './app.scss';

Modal.setAppElement('#modal-root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
