import { Outlet, Navigate } from 'react-router-dom';
import { useToken } from '../Utils/useToken';

function ProtectedRoute() {
  const auth = useToken();
  if (auth) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
