import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  // LocalStorage'da token yoki role bor-yo'qligini tekshiramiz
  const token = localStorage.getItem("token") || localStorage.getItem("role");

  // Agar token/role bo'lmasa, majburan login sahifasiga yuboramiz va brauzer tarixini tozalaymiz (replace)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}