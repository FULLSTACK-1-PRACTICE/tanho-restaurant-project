
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Header";
import TanhoFooter from "./Footer";

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Navbar />

      <main className="min-h-screen">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <TanhoFooter />
    </div>
  );
}