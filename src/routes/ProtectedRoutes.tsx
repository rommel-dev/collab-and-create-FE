import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../state/user.store';

const ProtectedRoutes = () => {
  const { isAuth } = useUserStore();
  return isAuth ? <Outlet /> : <Navigate to="/welcome" />;
};

export default ProtectedRoutes;
