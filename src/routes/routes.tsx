import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../components/Layout/PageTransition";

import HomePage from "../pages/public/Home/HomePage";
import MenuPage from "../pages/public/Menu/MenuPage";
import AboutPage from "../pages/public/About/AboutPage";
import EventsPage from "../pages/public/Events/EventsPage";
import NewsPage from "../pages/public/News/ NewsPage";
import ContactPage from "../pages/public/Contact/ContactPage";
import LoginPage from "../pages/public/Login/Login";

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
]);

export default routes;