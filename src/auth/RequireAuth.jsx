import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const isAuthenticated = localStorage.getItem('jwt_token'); // ví dụ

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
