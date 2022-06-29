import { Navigate } from 'react-router-dom';
import { useUserStore } from '../state/user.store';

const CatchAllRoutes = () => {
  const { isAuth } = useUserStore();

  return isAuth ? (
    <Navigate to="/projects/ongoing" />
  ) : (
    <Navigate to="/welcome" />
  );
};

export default CatchAllRoutes;
