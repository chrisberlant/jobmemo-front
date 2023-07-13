/* eslint-disable import/prefer-default-export */

// Set Up React Router and Adding 2 routes for Home and Login
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Login from './components/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
