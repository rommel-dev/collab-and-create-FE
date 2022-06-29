import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../state/user.store';

const PublicRoutes = () => {
  const { isAuth } = useUserStore();
  return !isAuth ? <Outlet /> : <Navigate to="/projects/ongoing" />;
};

export default PublicRoutes;
