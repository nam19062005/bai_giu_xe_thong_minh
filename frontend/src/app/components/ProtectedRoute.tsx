import { Navigate } from 'react-router';
import { useAuth, UserRole } from '../contexts/AuthContext';
import StudentDashboard from '../pages/StudentDashboard';
import StaffDashboard from '../pages/StaffDashboard';
import AdminDashboard from '../pages/AdminDashboard';

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user.role === 'staff') {
    return <StaffDashboard />;
  }

  return <StudentDashboard />;
}
