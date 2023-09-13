import { Outlet, Navigate } from 'react-router-dom';
import useToken from './useToken';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

function PrivateRoutes() {
  const auth = useToken();
  return auth ? (
    <div className="protected-page">
      <Navbar />
      <div className="protected-page-content">
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
