import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Sidebar } from "../../components/common/SideBar";
import { Navbar } from "../../components/common/DashboardNavbar";
import { managerSections } from "../../data/sidebarData";

export default function ManagerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [headerSearch, setHeaderSearch] = useState("");

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const activePage = pathSegments[1] || "bosh-sahifa";

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
    toast.info("Tizimdan chiqildi", {
      description: "Xayr, sog' bo'ling!",
    });

    localStorage.removeItem("token");
    localStorage.clear();

    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const goToPage = (page: string) => {
    setMobileSidebarOpen(false);
    navigate(`/manager/${page}`);
  };

  const getHeaderTitle = () => {
    if (activePage === "bosh-sahifa") {
      return "Bosh sahifa";
    }

    if (activePage === "sozlamalar" || activePage === "settings") {
      return "Sozlamalar";
    }

    if (activePage === "profil" || activePage === "profile") {
      return "Profil";
    }

    if (activePage === "menyu" || activePage === "taomlar") {
      return "Taomlar va Menyu";
    }

    if (activePage === "yangiliklar") {
      return "Yangiliklar";
    }

    if (activePage === "maqolalar") {
      return "Maqolalar";
    }

    if (activePage === "eslatmalar") {
      return "Eslatmalar";
    }

    return activePage
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="relative flex h-dvh min-h-0 overflow-hidden bg-[#0a0a0b] text-gray-200">
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