import {
  BarChart3,
  BellRing,
  CalendarCheck,
  ChefHat,
  ClipboardList,
  FileText,
  Grid,
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  Tags,
  UserSquare2,
  Users,
  Utensils,
} from "lucide-react";
import type { SidebarItem } from "../components/common/SideBar";

export type Food = {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "Mavjud" | "Mavjud emas";
};

export type Category = {
  id: number;
  name: string;
};

export type Order = {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: "Yakunlandi" | "Tayyorlanmoqda" | "Kutilmoqda";
  time: string;
};

export type NewFoodForm = {
  name: string;
  category: string;
  price: string;
  status: "Mavjud" | "Mavjud emas";
};

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

export const mockOrders: Order[] = [
  { id: "ORD-101", customerName: "Alisher Navoiy", items: "2x Osh Palov, 1x Coca-Cola", total: 85000, status: "Yakunlandi", time: "12:30" },
  { id: "ORD-102", customerName: "Sardor Rahimov", items: "3x Manti, 2x Choy", total: 100000, status: "Tayyorlanmoqda", time: "12:45" },
  { id: "ORD-103", customerName: "Malika Umarova", items: "1x Somsa, 1x Kofe", total: 35000, status: "Kutilmoqda", time: "13:00" },
];

export const mockFoods: Food[] = [
  { id: 1, name: "Osh Palov", category: "Milliy taomlar", price: 35000, status: "Mavjud" },
  { id: 2, name: "Manti", category: "Milliy taomlar", price: 30000, status: "Mavjud" },
  { id: 3, name: "Coca-Cola 1.5L", category: "Ichimliklar", price: 15000, status: "Mavjud" },
];

export const mockCategories: Category[] = [
  { id: 1, name: "Milliy taomlar" },
  { id: 2, name: "Ichimliklar" },
];
