import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import { AuthModalProvider } from "../features/auth/context/AuthModalContext"
import { ProtectedRoute } from "./ProtectedRoute"

import PublicLayout from "../components/shared/Layout/PageTransition"

import HomePage from "../pages/public/Home/HomePage"
import MenuPage from "../pages/public/Menu/MenuPage"
import AboutPage from "../pages/public/About/AboutPage"
import EventsPage from "../pages/public/Blog/Blog"
import ContactPage from "../pages/public/Contact/ContactPage"
import ReservationPage from "../pages/public/Reservation/ReservationPage"

import NewsPage from "../pages/public/News/ NewsPage"
import NewsDetailsPage from "../pages/public/News/NewsDetailsPage"

import LoginPage from "../features/auth/components/AuthModal"

import AdminLayout from "../layouts/AdminLayout/AdminLayout"
import CashierLayout from "../layouts/CashierLayout/CashierLayout"
import UserLayout from "../layouts/UserLayout/UserLayout"

import ManagerLayout from "../features/manager/components/ManagerDashboard"
import CashierPage from "../features/cashier/components/CashierPage"

import BoshSahifa from "../layouts/UserLayout/Userpanel/BoshSahifa"
import Meningprofilim from "../layouts/UserLayout/Userpanel/Meningprofilim"
import MeningBuyurtmalarim from "../layouts/UserLayout/Userpanel/MeningBuyurtmalarim"
import Sevimlilarim from "../layouts/UserLayout/Userpanel/Sevimlilarim"
import StolBandQilish from "../layouts/UserLayout/Userpanel/StolBandQilish"
import Takliflarim from "../layouts/UserLayout/Userpanel/Takliflarim"
import Sozlamalar from "../layouts/UserLayout/Userpanel/Sozlamalar"

const routes = createBrowserRouter([
  {
    element: (
      <AuthModalProvider>
        <Outlet />
      </AuthModalProvider>
    ),
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/menu", element: <MenuPage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/reservation", element: <ReservationPage /> },
          { path: "/events", element: <EventsPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/news", element: <NewsPage /> },
          { path: "/news/:id", element: <NewsDetailsPage /> },
        ],
      },

      {
        path: "/login",
        element: (
          <LoginPage
            isOpen={true}
            onClose={() => {
              window.location.href = "/"
            }}
          />
        ),
      },

      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ path: "/admin", element: <AdminLayout /> }],
      },

      {
        element: <ProtectedRoute allowedRoles={["manager"]} />,
        children: [
          {
            path: "/manager",
            element: <ManagerLayout />,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={["cashier"]} />,
        children: [
          {
            path: "/cashier",
            element: <CashierLayout />,
            children: [
              { index: true, element: <CashierPage /> },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "/user",
            element: <UserLayout />,
            children: [
              { index: true, element: <BoshSahifa /> },
              { path: "profil", element: <Meningprofilim /> },
              { path: "buyurtmalar", element: <MeningBuyurtmalarim /> },
              { path: "sevimlilar", element: <Sevimlilarim /> },
              { path: "stollar", element: <StolBandQilish /> },
              { path: "takliflar", element: <Takliflarim /> },
              { path: "sozlamalar", element: <Sozlamalar /> },
            ],
          },
        ],
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

export default routes