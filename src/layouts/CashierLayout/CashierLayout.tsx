import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  PlusCircle,
  ClipboardList,
  CreditCard,
  Grid,
  Utensils,
  Receipt,
  BarChart2,
} from 'lucide-react';
import { SideBar, type SidebarItem } from '../../components/common/SideBar';
import { DashboardNavbar } from '../../components/common/DashboardNavbar';
import { triggerLogout } from '../../routes/routes';

export const CashierLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    triggerLogout(navigate);
  };

  const handleNavigateProfile = () => {
    navigate('/cashier/profile');
  };

  const handleNavigateSettings = () => {
    navigate('/cashier/settings');
  };

  const cashierSidebarItems: SidebarItem[] = [
    { path: "/cashier", key: "/cashier", label: "Bosh sahifa", icon: Home },
    { path: "/cashier/new-order", key: "/cashier/new-order", label: "Yangi buyurtma", icon: PlusCircle },
    { path: "/cashier/orders", key: "/cashier/orders", label: "Buyurtmalar", icon: ClipboardList },
    { path: "/cashier/payments", key: "/cashier/payments", label: "To'lovlar", icon: CreditCard },
    { path: "/cashier/tables", key: "/cashier/tables", label: "Stol holati", icon: Grid },
    { path: "/cashier/menu", key: "/cashier/menu", label: "Menyu", icon: Utensils },
    { path: "/cashier/checks", key: "/cashier/checks", label: "Cheklar", icon: Receipt },
    { path: "/cashier/reports", key: "/cashier/reports", label: "Hisobotlar", icon: BarChart2 },
  ];

  const getBreadcrumbTitle = () => {
    if (location.pathname.includes('settings')) return "Sozlamalar";
    if (location.pathname.includes('profile')) return "Profil";
    return "Bosh sahifa";
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden relative">
      <SideBar
        items={cashierSidebarItems}
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePage={location.pathname}
        onSelectPage={(key) => navigate(key)}
      />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <DashboardNavbar
          onToggleSidebar={() => {
            if (window.innerWidth < 768) {
              setMobileSidebarOpen(true);
            } else {
              setSidebarOpen((prev) => !prev);
            }
          }}
          headerTitle="Kassir paneli"
          breadcrumb={["Cashier", getBreadcrumbTitle()]}
          user={{
            name: "Kassir",
            role: "Cashier",
          }}
          onProfile={handleNavigateProfile}
          onSettings={handleNavigateSettings}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CashierLayout;