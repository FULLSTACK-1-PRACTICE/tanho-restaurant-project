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
  Settings,
} from 'lucide-react';
import { Sidebar, type SidebarItem } from '../../components/common/SideBar';
import { Navbar as DashboardNavbar } from '../../components/common/DashboardNavbar';

export const CashierLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const cashierSidebarItems: SidebarItem[] = [
    { key: "/cashier", label: "Bosh sahifa", icon: Home },
    { key: "/cashier/new-order", label: "Yangi buyurtma", icon: PlusCircle },
    { key: "/cashier/orders", label: "Buyurtmalar", icon: ClipboardList },
    { key: "/cashier/payments", label: "To'lovlar", icon: CreditCard },
    { key: "/cashier/tables", label: "Stol holati", icon: Grid },
    { key: "/cashier/menu", label: "Menyu", icon: Utensils },
    { key: "/cashier/checks", label: "Cheklar", icon: Receipt },
    { key: "/cashier/reports", label: "Hisobotlar", icon: BarChart2 },
    { key: "/cashier/settings", label: "Sozlamalar", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePage={location.pathname}
        onSelectPage={(key) => navigate(key)}
        sections={cashierSidebarItems}
      />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <DashboardNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          headerTitle="Bosh sahifa"
          breadcrumb={["Cashier", "Bosh sahifa"]}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CashierLayout;