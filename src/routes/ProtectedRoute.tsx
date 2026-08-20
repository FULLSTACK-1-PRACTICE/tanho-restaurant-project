import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token") || localStorage.getItem("role");
  const currentRole = localStorage.getItem("role") || "";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}