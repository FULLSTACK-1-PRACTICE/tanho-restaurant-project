import { createBrowserRouter, Outlet } from "react-router-dom"
import { AuthModalProvider } from "../features/auth/context/AuthModalContext"
import { ProtectedRoute } from "./ProtectedRoute"
import ScrollToTop from "./ScrollToTop"
import { Toaster } from "../components/ui/sonner" // Sonner toaster importi
import { toast } from "sonner" // Toast funksiyasi uchun

import PublicLayout from "../components/shared/Layout/PageTransition"

import HomePage from "../pages/public/Home/HomePage"
import MenuPage from "../pages/public/Menu/MenuPage"
import AboutPage from "../pages/public/About/AboutPage"
import EventsPage from "../pages/public/Blog/BlogPage"
import BlogDetailsPage from "../pages/public/Blog/BlogDetailsPage"
import ContactPage from "../pages/public/Contact/ContactPage"
import ReservationPage from "../pages/public/Reservation/ReservationPage"

import NewsPage from "../pages/public/News/NewsPage"
import NewsDetailsPage from "../pages/public/News/NewsDetailsPage"

import LoginPage from "../features/auth/components/AuthModal"

import AdminLayout from "../layouts/AdminLayout/AdminLayout"
import CashierLayout from "../layouts/CashierLayout/CashierLayout"
import UserLayout from "../layouts/UserLayout/UserLayout"

import ManagerLayout from "../features/manager/components/ManagerDashboard"
import CashierPage from "../features/cashier/components/CashierPage"
import { NewOrder } from "../features/cashier/components/NewOrder"
import { Orders } from "../features/cashier/components/Orders"
import { Payments } from "../features/cashier/components/Payments"
import { CashierTable } from "../features/cashier/components/CashierTable"
import { ReceiptsView } from "../features/cashier/components/ReceiptsView"
import { CashierReports } from "../features/cashier/components/CashierReports"
import CashierMenuPage from "../features/cashier/components/CashierMenuPage"
import CashierSettingsSection from "../features/cashier/components/SettingsSection"
import CashierProfile from "../features/cashier/components/CashierProfile"

import BoshSahifa from "../layouts/UserLayout/Userpanel/BoshSahifa"
import Meningprofilim from "../layouts/UserLayout/Userpanel/Meningprofilim"
import MeningBuyurtmalarim from "../layouts/UserLayout/Userpanel/MeningBuyurtmalarim"
import Sevimlilarim from "../layouts/UserLayout/Userpanel/Sevimlilarim"
import StolBandQilish from "../layouts/UserLayout/Userpanel/StolBandQilish"
import Takliflarim from "../layouts/UserLayout/Userpanel/Takliflarim"
import Sozlamalar from "../layouts/UserLayout/Userpanel/Sozlamalar"

import NotFoundPage from "../pages/public/NotFound/NotFoundPage"

export const triggerLogout = (navigateFn?: (path: string) => void) => {
  toast.info("Tizimdan chiqildi", {
    description: "Xayr, sog' bo'ling!",
    duration: 1500,
  })
  setTimeout(() => {
    localStorage.clear()
    if (navigateFn) {
      navigateFn("/")
    } else {
      window.location.href = "/"
    }
  }, 1200)
}

const routes = createBrowserRouter([
  {
    element: (
      <AuthModalProvider>
        <ScrollToTop />
        <Toaster position="top-right" richColors />
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
          { path: "/blog/:id", element: <BlogDetailsPage /> },
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
              { path: "new-order", element: <NewOrder /> },
              { path: "orders", element: <Orders /> },
              { path: "payments", element: <Payments /> },
              { path: "tables", element: <CashierTable /> },
              { path: "menu", element: <CashierMenuPage /> },
              { path: "checks", element: <ReceiptsView /> },
              { path: "reports", element: <CashierReports /> },
              { path: "settings", element: <CashierSettingsSection /> },
              { path: "profile", element: <CashierProfile /> },
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
        element: <NotFoundPage />,
      },
    ],
  },
])

export default routes