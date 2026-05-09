import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
