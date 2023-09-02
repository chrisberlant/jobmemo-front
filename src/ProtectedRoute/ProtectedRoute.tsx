import { Outlet, Navigate } from 'react-router-dom';
import useToken from '../Utils/useToken';
import Navbar from '../components/Navbar/Navbar';
import './ProtectedRoute.scss';
import Footer from '../components/Footer/Footer';

function ProtectedRoute() {
  const auth = useToken();
  if (auth) {
    return (
      <div className="protected-page">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
