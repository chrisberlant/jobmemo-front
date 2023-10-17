import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function PrivateRoutes() {
  // If there is the firstName in localstorage, we assume user is logged in
  const authenticatedUser = localStorage.getItem('firstName');
  return authenticatedUser ? (
    <>
      <Navbar />
      <div className="protected-page-content">
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
