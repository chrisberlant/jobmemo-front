import { Outlet, Navigate } from 'react-router-dom';
import useToken from '../../Utils/useToken';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './ProtectedRoute.scss';

function ProtectedRoute() {
  const auth = useToken();
  if (auth) {
    return (
      <div className="protected-page">
        <Navbar />
        <div className="protected-page-content">
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
