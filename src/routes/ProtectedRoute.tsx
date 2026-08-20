import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const currentRole = localStorage.getItem("role") || "";

  // Token bo'lmasa loginga jo'natadi
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Rol mos kelmasa bosh sahifaga jo'natadi
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}