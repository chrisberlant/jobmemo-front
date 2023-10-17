import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Account from './components/Account/Account';
import DeleteAccount from './components/Account/DeleteAccount/DeleteAccount';
import ChangePassword from './components/Account/ChangePassword/ChangePassword';
import Dashboard from './components/Dashboard/Dashboard';
import RecycleBin from './components/RecycleBin/RecycleBin';
import Contacts from './components/Contacts/Contacts';
import CardCreation from './components/CardCreation/CardCreation';
import CardDetails from './components/CardDetails/CardDetails';
import ContactCreation from './components/ContactCreation/ContactCreation';
import ContactDetails from './components/Contacts/ContactDetails/ContactDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import DocumentUpload from './components/DocumentUpload/DocumentUpload';
import Documents from './components/Documents/Documents';
import DocumentDetails from './components/Documents/DocumentDetails/DocumentDetails';
import { useAppDispatch } from './store/hook/redux';
import { removeNotification } from './store/reducers/app';
import Notification from './components/Notification/Notification';
import './styles/reset.scss';
import './styles/App.scss';

function AppRoutes() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Remove every information or error message on page change
    dispatch(removeNotification());
  }, [dispatch, location]);

  return (
    <>
      <div className="app">
        <Routes>
          {/* Homepage route, component not created yet */}
          <Route element={<Login />} path="/" />
          {/* Authentication route */}
          <Route element={<Login />} path="/login" />
          {/* Login creation route */}
          <Route element={<Register />} path="/register" />
          {/* Protected routes, can only be accessed by authenticated user */}
          <Route element={<PrivateRoutes />}>
            {/* See and edit account informations */}
            <Route element={<Account />} path="/account" />
            {/* Form to change the password */}
            <Route element={<ChangePassword />} path="/change-password" />
            {/* Form to definitely delete the account */}
            <Route element={<DeleteAccount />} path="/delete-account" />
            {/* Main page containing the dashboard and all its cards */}
            <Route element={<Dashboard />} path="/dashboard" />
            {/* See and modify a card's details based on its id */}
            <Route element={<CardDetails />} path="/card/:id" />
            {/* Form to create a new card using the category in url by default */}
            <Route element={<CardCreation />} path="/add-card/:categorySlug" />
            {/* Page containing all the cards sent to recycle bin */}
            <Route element={<RecycleBin />} path="/recycle-bin" />
            {/* Contacts list */}
            <Route element={<Contacts />} path="/contacts" />
            {/* See and modify a contact's details based on its id */}
            <Route element={<ContactDetails />} path="/contact/:id" />
            {/* Form to create a new contact */}
            <Route element={<ContactCreation />} path="/create-contact" />
            {/* Documents list */}
            <Route element={<Documents />} path="/documents" />
            {/* Form to upload a new document and its details */}
            <Route element={<DocumentUpload />} path="/document-upload" />
            {/* See and modify a document's details based on its id */}
            <Route element={<DocumentDetails />} path="/document/:id" />
          </Route>
          {/* If no page was found, send this error page */}
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </div>
      <Notification />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
