import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
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
import PrivateRoutes from './Utils/PrivateRoutes';
import DocumentUpload from './components/DocumentUpload/DocumentUpload';
import Documents from './components/Documents/Documents';
import { useAppDispatch } from './store/hook/redux';
import { removeNotification } from './store/reducers/app';
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
    <div className="app">
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Account />} path="/account" />
          <Route element={<DeleteAccount />} path="/delete-account" />
          <Route element={<ChangePassword />} path="/change-password" />
          <Route element={<RecycleBin />} path="/recycle-bin" />
          <Route element={<Contacts />} path="/contacts" />
          <Route element={<ContactDetails />} path="/contact/:id" />
          <Route element={<ContactCreation />} path="/create-contact" />
          <Route element={<CardDetails />} path="/card/:id" />
          <Route element={<CardCreation />} path="/add-card/:categorySlug" />
          <Route element={<Documents />} path="/documents" />
          <Route element={<DocumentUpload />} path="/document-upload" />
        </Route>
        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </div>
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
