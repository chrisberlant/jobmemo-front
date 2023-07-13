/* eslint-disable import/prefer-default-export */

// Set Up React Router and Adding 2 routes for Home and Login
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Logout from './components/LogOut/Logout';
import Account from './components/Account/Account';
import DeleteAccount from './components/Account/DeleteAccount/DeleteAccount';
import ResetPassword from './components/Account/ResetPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import RecycleBin from './components/RecycleBin/RecycleBin';
import Contacts from './components/Contacts/Contacts';
import Contact from './components/Contacts/Contact/Contact';
import Docs from './components/Docs/Docs';
import Doc from './components/Docs/Doc/Doc';
import Card from './components/Card/Card';
import Cards from './components/Card/Cards/Cards';

// Add all routes to begin with
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/account',
    element: <Account />,
  },
  {
    path: '/deleteAccount',
    element: <DeleteAccount />,
  },
  {
    path: '/account/resetPassword',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/recyclebin',
    element: <RecycleBin />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '/contact/:id',
    element: <Contact />,
  },
  {
    path: '/docs',
    element: <Docs />,
  },
  {
    path: '/doc/:id',
    element: <Doc />,
  },
  {
    path: '/card',
    element: <Card />,
  },
  {
    path: '/cards/category/:id',
    element: <Cards />,
  },
]);
