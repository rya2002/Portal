import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = false,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Se a rota exige login e o usuário não está autenticado → redireciona para login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota exige um perfil específico e o usuário não corresponde → volta pro Home
  if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
