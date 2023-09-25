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
import { useAppDispatch } from './store/hook/redux';
import { removeAllMessages } from './store/reducers/user';
import './styles/reset.scss';
import './styles/App.scss';

function AppRoutes() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Remove every information or error message on page change
    dispatch(removeAllMessages());
  }, [dispatch, location]);

  return (
    <div className="app">
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<ForgotPassword />} path="/forgotPassword" />
        <Route element={<PageNotFound />} path="/404" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Account />} path="/account" />
          <Route element={<DeleteAccount />} path="/deleteAccount" />
          <Route element={<ChangePassword />} path="/changePassword" />
          <Route element={<RecycleBin />} path="/recycleBin" />
          <Route element={<Contacts />} path="/contacts" />
          <Route element={<ContactDetails />} path="/contact/:id" />
          <Route element={<ContactCreation />} path="/createContact" />
          <Route element={<CardDetails />} path="/card/:id" />
          <Route element={<CardCreation />} path="/addCard/:categorySlug" />
        </Route>
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
