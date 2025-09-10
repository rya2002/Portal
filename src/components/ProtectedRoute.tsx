import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = false, 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && (!user || user.userType !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}