import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

function PrivateRoutes() {
  const authenticatedUser = localStorage.getItem('authenticated'); // Stocker info loggedIn dans localstorage, l'effacer quand request failed
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
