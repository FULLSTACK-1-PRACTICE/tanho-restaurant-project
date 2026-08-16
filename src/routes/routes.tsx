import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../components/Layout/PageTransition";

import HomePage from "../pages/public/Home/HomePage";
import MenuPage from "../pages/public/Menu/MenuPage";
import AboutPage from "../pages/public/About/AboutPage";
import EventsPage from "../pages/public/Blog/Blog";
import NewsPage from "../pages/public/News/ NewsPage";
import ContactPage from "../pages/public/Contact/ContactPage";
import LoginPage from "../pages/public/Login/Login";

import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import BossLayout from "../layouts/BossLayout/BossLayout";
import CashierLayout from "../layouts/CashierLayout/CashierLayout";

import BoshSahifa from "../layouts/UserLayout/Userpanel/BoshSahifa";
import Manzilim from "../layouts/UserLayout/Userpanel/Manzilim";
import MeningBuyurtmalarim from "../layouts/UserLayout/Userpanel/MeningBuyurtmalarim";
import Meningprofilim from "../layouts/UserLayout/Userpanel/Meningprofilim";
import Sevimlilarim from "../layouts/UserLayout/Userpanel/Sevimlilarim";
import Sozlamalar from "../layouts/UserLayout/Userpanel/Sozlamalar";
import StolBandQilish from "../layouts/UserLayout/Userpanel/StolBandQilish";
import Takliflarim from "../layouts/UserLayout/Userpanel/Takliflarim";
import TolovUslublarim from "../layouts/UserLayout/Userpanel/TulovUslublarim";

import UserLayout from "../layouts/UserLayout/UserLayout";

const routes = createBrowserRouter([
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

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
  },

  {
    path: "/boss",
    element: <BossLayout />,
  },

  {
    path: "/cashier",
    element: <CashierLayout />,
  },

  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <BoshSahifa />,
      },
      {
        path: "profil",
        element: <Meningprofilim />,
      },
      {
        path: "buyurtmalar",
        element: <MeningBuyurtmalarim />,
      },
      {
        path: "sevimlilar",
        element: <Sevimlilarim />,
      },
      {
        path: "stollar",
        element: <StolBandQilish />,
      },
      {
        path: "manzil",
        element: <Manzilim />,
      },
      {
        path: "tolovlar",
        element: <TolovUslublarim />,
      },
      {
        path: "takliflar",
        element: <Takliflarim />,
      },
      {
        path: "sozlamalar",
        element: <Sozlamalar />,
      },
    ],
  },
]);

export default routes;
