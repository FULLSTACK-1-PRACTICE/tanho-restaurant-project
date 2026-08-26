import { Navigate, Outlet, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

export function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const location = useLocation()

  const token = localStorage.getItem("token")
  const currentRole: string | null =
    localStorage.getItem("role")

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !currentRole
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(currentRole ?? "")
  ) {
    if (currentRole === "admin") {
      return <Navigate to="/admin" replace />
    }

    if (currentRole === "manager") {
      return <Navigate to="/manager" replace />
    }

    if (currentRole === "cashier") {
      return <Navigate to="/cashier" replace />
    }

    if (currentRole === "user") {
      return <Navigate to="/user" replace />
    }

    return <Navigate to="/login" replace />
  }

  return <Outlet />
}