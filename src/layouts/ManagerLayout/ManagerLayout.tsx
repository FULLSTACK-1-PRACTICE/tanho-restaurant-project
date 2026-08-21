import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/common/SideBar";
import { Navbar } from "../../components/common/DashboardNavbar";
import { managerSections } from "../../data/sidebarData"; 
import { CheckCircle2 } from "lucide-react";

export default function ManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [activePage, setActivePage] = useState("bosh-sahifa");
  const [headerSearch, setHeaderSearch] = useState("");
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutToast(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.clear();
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-gray-200 overflow-hidden relative">
      {showLogoutToast && (
        <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 bg-[#161619] border border-amber-500/30 rounded-2xl shadow-2xl animate-bounce">
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
        onSelectPage={(page) => {
          setActivePage(page);
          navigate(`/manager/${page}`);
        }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        sections={managerSections}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          headerTitle={
            activePage === "bosh-sahifa"
              ? "Bosh sahifa"
              : activePage === "sozlamalar"
              ? "Sozlamalar"
              : activePage.charAt(0).toUpperCase() + activePage.slice(1)
          }
          breadcrumb={["Menejer", activePage]}
          headerSearch={headerSearch}
          setHeaderSearch={setHeaderSearch}
          onLogout={handleLogout}
          onNavigate={(page) => {
            setActivePage(page);
            navigate(`/manager/${page}`);
          }}
          user={{
            name: "Manager",
            role: "Manager",
          }}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0a0b]">
          <Outlet context={{ headerSearch }} />
        </main>
      </div>
    </div>
  );
}