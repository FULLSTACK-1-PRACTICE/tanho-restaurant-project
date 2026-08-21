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

export const managerSections = [
  { key: "bosh-sahifa", label: "Bosh sahifa", icon: LayoutDashboard },
  {
    key: "menyu",
    label: "Menyu",
    icon: Utensils,
    children: [
      { key: "taomlar", label: "Taomlar", icon: ChefHat },
      { key: "kategoriyalar", label: "Kategoriyalar", icon: Tags },
      { key: "qoshimchalar", label: "Qo‘shimchalar", icon: PlusCircle },
    ],
  },
  { key: "buyurtmalar", label: "Buyurtmalar", icon: ClipboardList, badge: 5 },
  { key: "rezervatsiyalar", label: "Rezervatsiyalar", icon: CalendarCheck },
  { key: "stollar", label: "Stollar", icon: Grid },
  { key: "mijozlar", label: "Mijozlar", icon: Users },
  { key: "yangiliklar", label: "Yangiliklar", icon: Newspaper },
  { key: "maqolalar", label: "Maqolalar", icon: FileText },
  { key: "xodimlar", label: "Xodimlar", icon: UserSquare2 },
  { key: "hisobotlar", label: "Hisobotlar", icon: BarChart3 },
  { key: "eslatmalar", label: "Eslatmalar", icon: BellRing, badge: 2 },
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