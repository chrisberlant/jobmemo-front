/* eslint-disable import/prefer-default-export */

// Set Up React Router and Adding 2 routes for Home and Login
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Account from './components/Account/Account';
import DeleteAccount from './components/Account/DeleteAccount/DeleteAccount';
import ChangePassword from './components/Account/ChangePassword/ChangePassword';
import Dashboard from './components/Dashboard/Dashboard';
import RecycleBin from './components/RecycleBin/RecycleBin';
import Contacts from './components/Contacts/Contacts';
import Contact from './components/Contacts/Contact/Contact';
import Docs from './components/Docs/Docs';
import Doc from './components/Docs/Doc/Doc';
import CardForm from './components/CardForm/CardForm';
import CardItem from './components/CardItem/CardItem';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Upload from './components/Upload/Upload';
import CreateContact from './components/CreateContact/CreateContact';
import ContactForm from './components/Contacts/ContactForm/ContactForm';

// Add all routes to begin with
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
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
        path: 'changePassword',
        element: <ChangePassword />,
      },
      {
        path: '/recycleBin',
        element: <RecycleBin />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/contact/:id',
        element: <ContactForm />,
      },
      {
        path: '/createContact',
        element: <CreateContact />,
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
        path: '/card/:id',
        element: <CardItem />,
      },
      {
        path: '/addCard/:category',
        element: <CardForm />,
      },
      {
        path: '/upload',
        element: <Upload />,
      },
    ],
  },
]);
