import { useState, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

import { DashboardSection } from "../../features/admin/components/DashboardSection";
import { MenuAdminSection } from "../../features/admin/components/MenuAdminSection";
import { TablesAdminSection } from "../../features/admin/components/TablesAdminSection";
import { ReportsSection } from "../../features/admin/components/ReportsSection";
import { ProfileSection } from "../../features/admin/components/ProfileSection";
import { SettingsSection } from "../../features/admin/components/SettingsSection";
import { GenericCrudSection } from "../../features/admin/components/GenericCrudSection";
import { MediaCrudSection } from "../../features/admin/components/MediaCrudSection";

import { SideBar } from "../../components/common/SideBar";
import { DashboardNavbar } from "../../components/common/DashboardNavbar";
import { adminSidebarItems } from "../../data/sidebarData";
import { triggerLogout } from "../../routes/routes";

type SectionKey = string;
const ADMIN_LEFT_FLAG = "admin_left";

const AdminLayout = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const [allowed] = useState(() => {
    const alreadyLeft = sessionStorage.getItem(ADMIN_LEFT_FLAG) === "true";
    if (navigationType === "POP" && alreadyLeft) return false;
    sessionStorage.removeItem(ADMIN_LEFT_FLAG);
    return true;
  });

  useEffect(() => {
    if (!allowed) navigate("/", { replace: true });
  }, [allowed, navigate]);

  useEffect(() => {
    if (!allowed) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allowed]);

  useEffect(() => {
    if (!allowed) return;
    return () => {
      sessionStorage.setItem(ADMIN_LEFT_FLAG, "true");
    };
  }, [allowed]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [active, setActive] = useState<SectionKey>("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    triggerLogout(navigate);
  };

  const renderSection = () => {
    switch (active) {
      case "dashboard":
      case "bosh-sahifa":
        return <DashboardSection goTo={setActive} />;
      case "menyu":
      case "taomlar":
        return <MenuAdminSection />;
      case "rezervatsiyalar":
        return (
          <GenericCrudSection
            title="Rezervatsiyalar"
            collectionName="reservations"
            fields={[
              { key: "customer", label: "Mijoz" },
              { key: "table", label: "Stol" },
              { key: "date", label: "Sana", type: "date" },
              { key: "time", label: "Vaqt" },
              { key: "guests", label: "Mehmonlar soni", type: "number" },
              {
                key: "status",
                label: "Holat",
                type: "select",
                options: ["Kutilmoqda", "Tasdiqlangan", "Bekor qilingan"],
              },
            ]}
          />
        );
      case "stollar":
        return <TablesAdminSection />;
      case "mijozlar":
        return (
          <GenericCrudSection
            title="Mijozlar"
            collectionName="customers"
            addLabel="Mijoz qo'shish"
            fields={[
              { key: "name", label: "F.I.Sh" },
              { key: "phone", label: "Telefon" },
              { key: "ordersCount", label: "Buyurtmalar soni", type: "number" },
              { key: "totalSpent", label: "Jami xarajat", type: "number" },
            ]}
          />
        );
      case "yangiliklar":
        return (
          <MediaCrudSection
            title="Yangiliklar"
            collectionName="news"
            addLabel="Yangilik qo'shish"
          />
        );
      case "maqolalar":
        return (
          <MediaCrudSection
            title="Maqolalar"
            collectionName="articles"
            addLabel="Maqola qo'shish"
          />
        );
      case "xodimlar":
        return (
          <GenericCrudSection
            title="Xodimlar"
            collectionName="staff"
            addLabel="Xodim qo'shish"
            fields={[
              { key: "name", label: "F.I.Sh" },
              { key: "role", label: "Lavozimi" },
              { key: "phone", label: "Telefon" },
            ]}
          />
        );
      case "hisobotlar":
      case "eslatmalar":
        return <ReportsSection />;
      case "profil":
        return <ProfileSection />;
      case "sozlamalar":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  if (!allowed) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0e10] text-white">
      <SideBar
        items={adminSidebarItems}
        isOpen={sidebarOpen}
        activePath={active}
        onItemClick={(path) => setActive(path as SectionKey)}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <DashboardNavbar
          title="Admin Dashboard"
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen((val) => !val);
            } else {
              setSidebarOpen((val) => !val);
            }
          }}
          onLogout={handleLogout}
          onProfileClick={() => setActive("profil")}
          onSettingsClick={() => setActive("sozlamalar")}
          onNavigate={(page) => setActive(page as SectionKey)}
          user={{
            name: "Admin",
            role: "Administrator",
          }}
        />

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;