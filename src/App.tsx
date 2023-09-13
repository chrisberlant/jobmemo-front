import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Account from './components/Account/Account';
import DeleteAccount from './components/Account/DeleteAccount/DeleteAccount';
import ChangePassword from './components/Account/ChangePassword/ChangePassword';
import Dashboard from './components/Dashboard/Dashboard';
import RecycleBin from './components/RecycleBin/RecycleBin';
import Contacts from './components/Contacts/Contacts';
import CardForm from './components/CardForm/CardForm';
import CardDetails from './components/CardDetails/CardDetails';
import ContactCreation from './components/ContactCreation/ContactCreation';
import ContactDetails from './components/Contacts/ContactDetails/ContactDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PrivateRoutes from './Utils/PrivateRoutes';
import './styles/reset.scss';
import './styles/App.scss';

function App() {
  return (
    <div className="app">
      <Router>
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
            <Route element={<CardForm />} path="/addCard/:category" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
