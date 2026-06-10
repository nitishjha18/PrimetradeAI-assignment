import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  useAuth();

  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
