import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthModalProvider } from "../features/auth/context/AuthModalContext";

import PublicLayout from "../components/Layout/PageTransition";

import HomePage from "../pages/public/Home/HomePage";
import MenuPage from "../pages/public/Menu/MenuPage";
import AboutPage from "../pages/public/About/AboutPage";
import EventsPage from "../pages/public/Blog/Blog";
import NewsPage from "../pages/public/News/ NewsPage";
import ContactPage from "../pages/public/Contact/ContactPage";
import ReservationPage from "../pages/public/Reservation/ReservationPage";

import LoginPage from "../features/auth/components/AuthModal";

import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import BossLayout from "../layouts/BossLayout/BossLayout";
import CashierLayout from "../layouts/CashierLayout/CashierLayout";

import UserLayout from "../layouts/UserLayout/UserLayout";

import BoshSahifa from "../layouts/UserLayout/Userpanel/BoshSahifa";
import Meningprofilim from "../layouts/UserLayout/Userpanel/Meningprofilim";
import MeningBuyurtmalarim from "../layouts/UserLayout/Userpanel/MeningBuyurtmalarim";
import Sevimlilarim from "../layouts/UserLayout/Userpanel/Sevimlilarim";
import StolBandQilish from "../layouts/UserLayout/Userpanel/StolBandQilish";
import Takliflarim from "../layouts/UserLayout/Userpanel/Takliflarim";
import Sozlamalar from "../layouts/UserLayout/Userpanel/Sozlamalar";

const routes = createBrowserRouter([
  {
    element: (
      <AuthModalProvider>
        <Outlet />
      </AuthModalProvider>
    ),

    children: [
      // =========================
      // PUBLIC PAGES
      // =========================

      {
        element: <PublicLayout />,

        children: [
          {
            path: "/",
            element: <HomePage />,
          },

          {
            path: "/menu",
            element: <MenuPage />,
          },

          {
            path: "/about",
            element: <AboutPage />,
          },

          {
            path: "/reservation",
            element: <ReservationPage />,
          },

          {
            path: "/events",
            element: <EventsPage />,
          },

          {
            path: "/news",
            element: <NewsPage />,
          },

          {
            path: "/contact",
            element: <ContactPage />,
          },
        ],
      },

      // =========================
      // LOGIN
      // =========================

      {
        path: "/login",

        element: (
          <LoginPage
            isOpen={true}
            onClose={() => {
              window.location.href = "/";
            }}
          />
        ),
      },

      // =========================
      // ADMIN
      // =========================

      {
        path: "/admin",
        element: <AdminLayout />,
      },

      // =========================
      // BOSS
      // =========================

      {
        path: "/boss",
        element: <BossLayout />,
      },

      // =========================
      // CASHIER
      // =========================

      {
        path: "/cashier",
        element: <CashierLayout />,
      },

      // =========================
      // USER PANEL
      // =========================

      {
        path: "/user",

        element: <UserLayout />,

        children: [
          // /user
          {
            index: true,
            element: <BoshSahifa />,
          },

          // /user/profil
          {
            path: "profil",
            element: <Meningprofilim />,
          },

          // /user/buyurtmalar
          {
            path: "buyurtmalar",
            element: <MeningBuyurtmalarim />,
          },

          // /user/sevimlilar
          {
            path: "sevimlilar",
            element: <Sevimlilarim />,
          },

          // /user/stollar
          {
            path: "stollar",
            element: <StolBandQilish />,
          },

          // /user/takliflar
          {
            path: "takliflar",
            element: <Takliflarim />,
          },

          // /user/sozlamalar
          {
            path: "sozlamalar",
            element: <Sozlamalar />,
          },
        ],
      },
    ],
  },
]);

export default routes;