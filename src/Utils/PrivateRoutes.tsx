import { Outlet, Navigate } from 'react-router-dom';
import useToken from './useToken';

function PrivateRoutes() {
  const auth = useToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
