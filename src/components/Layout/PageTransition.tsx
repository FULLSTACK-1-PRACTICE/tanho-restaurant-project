import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Header";
import TanhoFooter from "./Footer";

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Navbar />

      <main className="min-h-screen">
        <motion.div
          key={location.pathname}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      <TanhoFooter />
    </div>
  );
}