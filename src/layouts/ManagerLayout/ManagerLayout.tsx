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

  // Menyu bo'limini olib tashlash
  const filteredManagerSections = managerSections.filter(
    (section) => section.key !== "menyu"
  );

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
          setMobileSidebarOpen(false); // Bo'lim tanlanganda mobilda yopish
        }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        items={filteredManagerSections}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          // MANA SHU YERDA: Hambuger bosilganda mobileSidebarOpen va sidebarOpen ikkalasi ham to'g'ri o'zgaradi
          onToggleSidebar={() => {
            setMobileSidebarOpen((prev) => !prev);
            setSidebarOpen((prev) => !prev);
          }}
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