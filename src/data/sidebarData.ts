import {
  BarChart3,
  CalendarCheck,
  FileText,
  Grid,
  LayoutDashboard,
  Newspaper,
  UserSquare2,
  Users,
  Utensils,
} from "lucide-react";
import type { SidebarItem } from "../components/common/SideBar";

export const adminSidebarItems: SidebarItem[] = [
  { key: "dashboard", path: "dashboard", label: "Bosh sahifa", icon: LayoutDashboard },
  { key: "menyu", path: "menyu", label: "Menyu", icon: Utensils },
  { key: "rezervatsiyalar", path: "rezervatsiyalar", label: "Rezervatsiyalar", icon: CalendarCheck },
  { key: "stollar", path: "stollar", label: "Stollar", icon: Grid },
  { key: "mijozlar", path: "mijozlar", label: "Mijozlar", icon: Users },
  { key: "yangiliklar", path: "yangiliklar", label: "Yangiliklar", icon: Newspaper },
  { key: "maqolalar", path: "maqolalar", label: "Maqolalar", icon: FileText },
  { key: "xodimlar", path: "xodimlar", label: "Xodimlar", icon: UserSquare2 },
  { key: "hisobotlar", path: "hisobotlar", label: "Hisobotlar", icon: BarChart3 },
];

export const managerSections: SidebarItem[] = [
  { key: "bosh-sahifa", path: "bosh-sahifa", label: "Bosh sahifa", icon: LayoutDashboard },
  { key: "menyu", path: "menyu", label: "Menyu", icon: Utensils },
  { key: "rezervatsiyalar", path: "rezervatsiyalar", label: "Rezervatsiyalar", icon: CalendarCheck },
  { key: "stollar", path: "stollar", label: "Stollar", icon: Grid },
  { key: "mijozlar", path: "mijozlar", label: "Mijozlar", icon: Users },
  { key: "yangiliklar", path: "yangiliklar", label: "Yangiliklar", icon: Newspaper },
  { key: "maqolalar", path: "maqolalar", label: "Maqolalar", icon: FileText },
];

export const cashierSidebarItems = [
  { title: "Bosh sahifa", path: "/cashier", icon: "Home" },
  { title: "Yangi buyurtma", path: "/cashier/new-order", icon: "PlusCircle" },
  { title: "Buyurtmalar", path: "/cashier/orders", icon: "ClipboardList" },
  { title: "To'lovlar", path: "/cashier/payments", icon: "CreditCard" },
  { title: "Stol holati", path: "/cashier/tables", icon: "Grid" },
  { title: "Menyu", path: "/cashier/menu", icon: "Utensils" },
  { title: "Cheklar", path: "/cashier/checks", icon: "Receipt" },
  { title: "Hisobotlar", path: "/cashier/reports", icon: "BarChart2" },
  { title: "Sozlamalar", path: "/cashier/settings", icon: "Settings" },
];