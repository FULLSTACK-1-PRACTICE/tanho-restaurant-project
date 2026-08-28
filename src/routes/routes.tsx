import { lazy, Suspense, useState, useEffect } from "react"
import { createBrowserRouter, Outlet, useNavigate, useLocation } from "react-router-dom"
import { AuthModalProvider } from "../features/auth/context/AuthModalContext"
import { ProtectedRoute } from "./ProtectedRoute"
import ScrollToTop from "./ScrollToTop"
import { Toaster } from "../components/ui/sonner"
import { toast } from "sonner"

import PublicLayout from "../components/shared/Layout/PageTransition"

const HomePage = lazy(() => import("../pages/public/Home/HomePage"))
const MenuPage = lazy(() => import("../pages/public/Menu/MenuPage"))
const MenuDetailsPage = lazy(() => import("../pages/public/Menu/MenuDetailsPage"))
const AboutPage = lazy(() => import("../pages/public/About/AboutPage"))
const EventsPage = lazy(() => import("../pages/public/Blog/BlogPage"))
const BlogDetailsPage = lazy(() => import("../pages/public/Blog/BlogDetailsPage"))
const ContactPage = lazy(() => import("../pages/public/Contact/ContactPage"))
const ReservationPage = lazy(() => import("../pages/public/Reservation/ReservationPage"))
const NewsPage = lazy(() => import("../pages/public/News/NewsPage"))
const PrivacyPolicyPage = lazy(() => import("../pages/public/PrivacyPolicy/PrivacyPolicyPage"))
const WorkMode = lazy(() => import("../pages/public/Service-mode/WorkMode"))
const LoginPage = lazy(() => import("../features/auth/components/AuthModal"))
const AdminLayout = lazy(() => import("../layouts/AdminLayout/AdminLayout"))
const CashierLayout = lazy(() => import("../layouts/CashierLayout/CashierLayout"))
const UserLayout = lazy(() => import("../layouts/UserLayout/UserLayout"))
const ManagerLayout = lazy(() => import("../layouts/ManagerLayout/ManagerLayout"))
const DashboardPage = lazy(() => import("../features/manager/components/DashboardPage"))
const ProfilePage = lazy(() => import("../features/manager/components/ProfilePage"))
const SettingsPage = lazy(() => import("../features/manager/components/SettingsPage"))
const ManagerMenuSection = lazy(() => import("../features/manager/components/ManagerMenuSection"))
const ManagerNewsSection = lazy(() => import("../features/manager/components/ManagerNewsSection"))
const ManagerArticlesSection = lazy(() => import("../features/manager/components/ManagerArticlesSection"))
const ManagerClientFeedback = lazy(() => import("../features/manager/components/ManagerClientFeedback"))
const ManagerReservationsSection = lazy(() => import("../features/manager/components/ManagerReservationsSection"))
const ManagerTablesSection = lazy(() => import("../features/manager/components/ManagerTablesSection"))
const Reminders = lazy(() => import("../features/manager/components/Reminders").then((module) => ({ default: module.Reminders })))
const CashierPage = lazy(() => import("../features/cashier/components/CashierPage"))
const NewOrder = lazy(() => import("../features/cashier/components/NewOrder").then((module) => ({ default: module.NewOrder })))
const Orders = lazy(() => import("../features/cashier/components/Orders").then((module) => ({ default: module.Orders })))
const Payments = lazy(() => import("../features/cashier/components/Payments").then((module) => ({ default: module.Payments })))
const CashierTable = lazy(() => import("../features/cashier/components/CashierTable").then((module) => ({ default: module.CashierTable })))
const ReceiptsView = lazy(() => import("../features/cashier/components/ReceiptsView").then((module) => ({ default: module.ReceiptsView })))
const CashierReports = lazy(() => import("../features/cashier/components/CashierReports").then((module) => ({ default: module.CashierReports })))
const CashierMenuPage = lazy(() => import("../features/cashier/components/CashierMenuPage"))
const CashierSettingsSection = lazy(() => import("../features/cashier/components/SettingsSection"))
const CashierProfile = lazy(() => import("../features/cashier/components/CashierProfile"))
const UserHome = lazy(() => import("../features/user/components/UserHome"))
const UserProfile = lazy(() => import("../features/user/components/UserProfile"))
const UserOrders = lazy(() => import("../features/user/components/UserOrders"))
const UserFavorites = lazy(() => import("../features/user/components/UserFavorites"))
const UserCabinas = lazy(() => import("../features/user/components/UserCabinas"))
const UserSettings = lazy(() => import("../features/user/components/UserSettings"))
const UserSuggestions = lazy(() => import("../features/user/components/UserSuggestions"))
const NotFoundPage = lazy(() => import("../pages/public/NotFound/NotFoundPage"))

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

function OfflineGuard() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      const lastPath = sessionStorage.getItem("last_online_path") || "/"
      if (location.pathname === "/service-mode" || location.pathname === "/work-mode") {
        navigate(lastPath)
      }
    }

    const handleOffline = () => {
      setIsOffline(true)
      if (location.pathname !== "/service-mode" && location.pathname !== "/work-mode") {
        sessionStorage.setItem("last_online_path", location.pathname)
        navigate("/service-mode")
      }
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    if (!navigator.onLine && location.pathname !== "/service-mode" && location.pathname !== "/work-mode") {
      sessionStorage.setItem("last_online_path", location.pathname)
      navigate("/service-mode")
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [navigate, location])

  if (isOffline && location.pathname !== "/service-mode" && location.pathname !== "/work-mode") {
    return <WorkMode />
  }

  return <Outlet />
}

const routes = createBrowserRouter([
  {
    element: (
      <AuthModalProvider>
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        <Suspense fallback={null}>
          <OfflineGuard />
        </Suspense>
      </AuthModalProvider>
    ),
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/menu", element: <MenuPage /> },
          { path: "/menu/:id", element: <MenuDetailsPage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/reservation", element: <ReservationPage /> },
          { path: "/events", element: <EventsPage /> },
          { path: "/blog", element: <EventsPage /> },
          { path: "/blog/:id", element: <BlogDetailsPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/news", element: <NewsPage /> },
          { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
        ],
      },

      {
        path: "/service-mode",
        element: <WorkMode />,
      },
      {
        path: "/work-mode",
        element: <WorkMode />,
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
            children: [
              { index: true, element: <DashboardPage /> },
              { path: "bosh-sahifa", element: <DashboardPage /> },
              { path: "profil", element: <ProfilePage /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "sozlamalar", element: <SettingsPage /> },
              { path: "settings", element: <SettingsPage /> },
              { path: "menyu", element: <ManagerMenuSection /> },
              { path: "taomlar", element: <ManagerMenuSection /> },
              { path: "rezervatsiyalar", element: <ManagerReservationsSection /> },
              { path: "stollar", element: <ManagerTablesSection /> },
              { path: "mijozlar", element: <ManagerClientFeedback /> },
              { path: "yangiliklar", element: <ManagerNewsSection /> },
              { path: "maqolalar", element: <ManagerArticlesSection /> },
              { path: "eslatmalar", element: <Reminders /> },
            ],
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
              { index: true, element: <UserHome /> },
              { path: "profil", element: <UserProfile /> },
              { path: "buyurtmalar", element: <UserOrders /> },
              { path: "sevimlilar", element: <UserFavorites /> },
              { path: "stollar", element: <UserCabinas /> },
              { path: "sozlamalar", element: <UserSettings /> },
              { path: "takliflar", element: <UserSuggestions /> },
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