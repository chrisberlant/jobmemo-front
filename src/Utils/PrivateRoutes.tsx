import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

function PrivateRoutes() {
  // If there is the firstName in localstorage, we assume user is logged in
  const authenticatedUser = localStorage.getItem('firstName');
  console.log('Route privée');
  return authenticatedUser ? (
    <>
      <Navbar />
      <div className="protected-page-content">
        <Outlet />
        <Footer />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
