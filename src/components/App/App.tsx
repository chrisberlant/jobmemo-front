import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Account from '../Account/Account';
import DeleteAccount from '../Account/DeleteAccount/DeleteAccount';
import ChangePassword from '../Account/ChangePassword/ChangePassword';
import Dashboard from '../Dashboard/Dashboard';
import RecycleBin from '../RecycleBin/RecycleBin';
import Contacts from '../Contacts/Contacts';
import CardForm from '../CardForm/CardForm';
import CardDetails from '../CardDetails/CardDetails';
import ContactCreation from '../ContactCreation/ContactCreation';
import ContactDetails from '../Contacts/ContactDetails/ContactDetails';
import PageNotFound from '../PageNotFound/PageNotFound';
import PrivateRoutes from '../../Utils/PrivateRoutes';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
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
