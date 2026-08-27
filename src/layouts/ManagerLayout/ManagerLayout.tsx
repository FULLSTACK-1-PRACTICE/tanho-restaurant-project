import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { Sidebar } from "../../components/common/SideBar";
import { Navbar } from "../../components/common/DashboardNavbar";
import { managerSections } from "../../data/sidebarData";

export default function ManagerLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [activePage, setActivePage] = useState("bosh-sahifa");
  const [headerSearch, setHeaderSearch] = useState("");
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen((previous) => !previous);
      return;
    }

    setSidebarOpen((previous) => !previous);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutToast(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  const goToPage = (page: string) => {
    setActivePage(page);
    setMobileSidebarOpen(false);
    navigate(`/manager/${page}`);
  };

  const getHeaderTitle = () => {
    if (activePage === "bosh-sahifa") {
      return "Bosh sahifa";
    }

    if (activePage === "sozlamalar") {
      return "Sozlamalar";
    }

    if (activePage === "profil") {
      return "Profil";
    }

    if (activePage === "menyu" || activePage === "taomlar") {
      return "Taomlar va Menyu";
    }

    return activePage
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="relative flex h-dvh min-h-0 overflow-hidden bg-[#0a0a0b] text-gray-200">
      {showLogoutToast && (
        <div className="fixed right-4 top-4 z-[100] flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-[#161619] px-4 py-3 shadow-2xl sm:right-5 sm:top-5">
          <CheckCircle2 className="text-amber-400" size={18} />
          <span className="text-xs font-semibold text-white">
            Tizimdan chiqildi!
          </span>
        </div>
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePage={activePage}
        onSelectPage={goToPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        items={managerSections}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          headerTitle={getHeaderTitle()}
          breadcrumb={["Menejer", activePage]}
          headerSearch={headerSearch}
          setHeaderSearch={setHeaderSearch}
          onLogout={handleLogout}
          onNavigate={goToPage}
          user={{
            name: "Manager",
            role: "Manager",
          }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#0a0a0b] p-3 sm:p-4 md:p-6">
          <Outlet context={{ headerSearch }} />
        </main>
      </div>
    </div>
  );
}
