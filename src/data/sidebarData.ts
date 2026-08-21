import {
  LayoutDashboard,
  Utensils,
  ChefHat,
  Tags,
  PlusCircle,
  ClipboardList,
  CalendarCheck,
  Grid,
  Users,
  Newspaper,
  FileText,
  UserSquare2,
  BarChart3,
  BellRing,
} from "lucide-react";
import type { SidebarItem } from "../components/common/SideBar";

export const managerSections: SidebarItem[] = [
  { key: "bosh-sahifa", path: "bosh-sahifa", label: "Bosh sahifa", icon: LayoutDashboard },
  {
    key: "menyu",
    path: "menyu",
    label: "Menyu",
    icon: Utensils,
    children: [
      { key: "taomlar", path: "taomlar", label: "Taomlar", icon: ChefHat },
      { key: "kategoriyalar", path: "kategoriyalar", label: "Kategoriyalar", icon: Tags },
      { key: "qoshimchalar", path: "qoshimchalar", label: "Qo‘shimchalar", icon: PlusCircle },
    ],
  },
  { key: "buyurtmalar", path: "buyurtmalar", label: "Buyurtmalar", icon: ClipboardList, badge: 5 },
  { key: "rezervatsiyalar", path: "rezervatsiyalar", label: "Rezervatsiyalar", icon: CalendarCheck },
  { key: "stollar", path: "stollar", label: "Stollar", icon: Grid },
  { key: "mijozlar", path: "mijozlar", label: "Mijozlar", icon: Users },
  { key: "yangiliklar", path: "yangiliklar", label: "Yangiliklar", icon: Newspaper },
  { key: "maqolalar", path: "maqolalar", label: "Maqolalar", icon: FileText },
  { key: "xodimlar", path: "xodimlar", label: "Xodimlar", icon: UserSquare2 },
  { key: "hisobotlar", path: "hisobotlar", label: "Hisobotlar", icon: BarChart3 },
  { key: "eslatmalar", path: "eslatmalar", label: "Eslatmalar", icon: BellRing, badge: 2 },
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