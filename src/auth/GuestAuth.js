import { Navigate } from 'react-router-dom';
import useAuth from '../services/useAuth.js';

const GuestAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default GuestAuth;