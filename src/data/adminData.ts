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
import { type SidebarItem } from "../components/common/SideBar";

export type SectionKey =
  | "bosh-sahifa"
  | "dashboard"
  | "menyu"
  | "taomlar"
  | "kategoriyalar"
  | "qoshimchalar"
  | "buyurtmalar"
  | "rezervatsiyalar"
  | "stollar"
  | "mijozlar"
  | "yangiliklar"
  | "maqolalar"
  | "xodimlar"
  | "hisobotlar"
  | "eslatmalar"
  | "profil"
  | "sozlamalar";

export const STATIC_DATA: Record<string, any[]> = {
  menu: [
    {
      id: "menu-1",
      name: "Osh",
      category: "Osh",
      price: 25000,
      status: "Mavjud",
      image: "",
      description: "An'anaviy o'zbek oshi",
    },
    {
      id: "menu-2",
      name: "Mol go'shtli shashlik",
      category: "Shashliklar",
      price: 35000,
      status: "Mavjud",
      image: "",
      description: "Grilda tayyorlangan mol go'shti",
    },
    {
      id: "menu-3",
      name: "Sezar salati",
      category: "Salatlar",
      price: 30000,
      status: "Mavjud",
      image: "",
      description: "Yangi sabzavotli salat",
    },
    {
      id: "menu-4",
      name: "Coca-Cola",
      category: "Ichimliklar",
      price: 12000,
      status: "Mavjud",
      image: "",
      description: "",
    },
  ],
  orders: [
    {
      id: "order-1",
      customer: "Ali Valiyev",
      table: "4",
      itemsCount: 3,
      total: 95000,
      time: "12:30",
      status: "Yangi",
    },
    {
      id: "order-2",
      customer: "Sardor Karimov",
      table: "7",
      itemsCount: 2,
      total: 70000,
      time: "13:10",
      status: "Tayyorlanmoqda",
    },
  ],
  reservations: [
    {
      id: "reservation-1",
      customer: "Azizbek Rahimov",
      table: "2",
      date: "2026-08-20",
      time: "19:00",
      guests: 4,
      status: "Tasdiqlangan",
    },
  ],
  tables: [
    {
      id: "table-1",
      number: "1",
      seats: 2,
      status: "Bo'sh",
      reservedAt: "",
      reservedDate: "",
      reservedBy: "",
    },
    {
      id: "table-2",
      number: "2",
      seats: 4,
      status: "Band",
      reservedAt: "19:00",
      reservedDate: "2026-08-20",
      reservedBy: "Azizbek Rahimov",
    },
    {
      id: "table-3",
      number: "3",
      seats: 6,
      status: "Bo'sh",
      reservedAt: "",
      reservedDate: "",
      reservedBy: "",
    },
    {
      id: "table-4",
      number: "4",
      seats: 4,
      status: "Bo'sh",
      reservedAt: "",
      reservedDate: "",
      reservedBy: "",
    },
  ],
  customers: [
    {
      id: "customer-1",
      name: "Ali Valiyev",
      phone: "+998 90 123 45 67",
      ordersCount: 8,
      totalSpent: 520000,
    },
    {
      id: "customer-2",
      name: "Sardor Karimov",
      phone: "+998 91 234 56 78",
      ordersCount: 5,
      totalSpent: 310000,
    },
  ],
  news: [
    {
      id: "news-1",
      title: "TANHO Restaurant yangiliklari",
      content: "Yangi mavsumiy taomlar menyuga qo'shildi.",
      image: "",
    },
  ],
  articles: [
    {
      id: "article-1",
      title: "TANHO'da milliy taomlar",
      content: "Milliy taomlarimiz haqida qisqacha maqola.",
      image: "",
    },
  ],
  staff: [
    {
      id: "staff-1",
      name: "Abror Karimov",
      role: "Administrator",
      phone: "+998 90 111 22 33",
    },
    {
      id: "staff-2",
      name: "Jasur Aliyev",
      role: "Ofitsiant",
      phone: "+998 91 222 33 44",
    },
  ],
};

export const adminSidebarItems: SidebarItem[] = [
  { key: "bosh-sahifa", path: "dashboard", label: "Bosh sahifa", icon: LayoutDashboard },
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