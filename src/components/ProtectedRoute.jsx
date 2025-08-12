import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useSelector(state => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
