import { useAuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element }: { element: JSX.Element }) {
  const { authHeader } = useAuthContext();

  // If no credentials are set, redirect to the login page
  if (authHeader === '') {
    return <Navigate to="/login" />;
  }

  return element;
};