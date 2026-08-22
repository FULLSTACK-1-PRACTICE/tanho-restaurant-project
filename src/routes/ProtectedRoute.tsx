import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const currentRole = localStorage.getItem("role") || "";
  const location = useLocation();

  // Login qilmagan bo'lsa
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Role ruxsati yo'q bo'lsa
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(currentRole)
  ) {
    const roleRedirects: Record<string, string> = {
      admin: "/admin",
      manager: "/manager",
      cashier: "/cashier",
      user: "/user",
    };

    const redirectPath = roleRedirects[currentRole] || "/";

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}