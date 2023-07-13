// Set Up React Router (no Outlet yet)
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';
import { router } from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
