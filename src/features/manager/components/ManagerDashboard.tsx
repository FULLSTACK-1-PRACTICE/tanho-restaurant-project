import React, { useState, useRef } from "react";
import {
  Crown,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  Plus,
  Upload,
  Package,
  CircleDollarSign,
  Users,
  Trash2,
  Edit,
} from "lucide-react";
import logoImg from "../../../assets/logo.svg";
import { formatSum } from "../../../lib/utils";
import { DashboardPage } from "./DashboardPage";
import { StatCard } from "./StatCard";

const PAGE_TITLES: Record<string, string> = {
  "bosh-sahifa": "Dashboard",
  taomlar: "Taomlar ro‘yxati",
  kategoriyalar: "Kategoriyalar",
  qoshimchalar: "Qo‘shimchalar",
  buyurtmalar: "Buyurtmalar",
  bron: "Bron qilish",
  xodimlar: "Xodimlar",
  hisobotlar: "Hisobotlar",
  profil: "Profil",
  sozlamalar: "Sozlamalar",
};

const SIDEBAR_SECTIONS = [
  { key: "bosh-sahifa", label: "Bosh sahifa", icon: Package },
  {
    key: "menyu",
    label: "Menyu",
    icon: Package,
    children: [
      { key: "taomlar", label: "Taomlar", icon: Package },
      { key: "kategoriyalar", label: "Kategoriyalar", icon: Package },
      { key: "qoshimchalar", label: "Qo‘shimchalar", icon: Package },
    ],
  },
  { key: "buyurtmalar", label: "Buyurtmalar", icon: Package },
  { key: "bron", label: "Bron qilish", icon: Package },
  { key: "xodimlar", label: "Xodimlar", icon: Users },
  { key: "hisobotlar", label: "Hisobotlar", icon: CircleDollarSign },
];

const inputClass =
  "w-full px-3.5 py-2.5 bg-[#1a1a1e] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors";

export function ManagerLayout() {
  const [activePage, setActivePage] = useState("bosh-sahifa");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [headerSearch, setHeaderSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [statusFilter, setStatusFilter] = useState("Barchasi");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);
  const [adminOpen, setAdminOpen] = useState(false);

  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Osh Palov",
      category: "Milliy taomlar",
      price: 35000,
      status: "Mavjud",
      image: "amber",
    },
    {
      id: 2,
      name: "Manti",
      category: "Milliy taomlar",
      price: 30000,
      status: "Mavjud",
      image: "emerald",
    },
    {
      id: 3,
      name: "Coca-Cola 1.5L",
      category: "Ichimliklar",
      price: 15000,
      status: "Mavjud",
      image: "sky",
    },
  ]);

  const [categories] = useState([
    { id: 1, name: "Milliy taomlar" },
    { id: 2, name: "Ichimliklar" },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const handleSidebarClick = (key: string) => {
    setActivePage(key);
    setMobileSidebarOpen(false);
  };

  const breadcrumb = (() => {
    if (activePage === "bosh-sahifa") return ["Bosh sahifa"];
    if (activePage === "taomlar") return ["Bosh sahifa", "Menyu", "Taomlar"];
    if (activePage === "kategoriyalar")
      return ["Bosh sahifa", "Menyu", "Kategoriyalar"];
    if (activePage === "qoshimchalar")
      return ["Bosh sahifa", "Menyu", "Qo‘shimchalar"];
    return ["Bosh sahifa", PAGE_TITLES[activePage] || "Bosh sahifa"];
  })();

  const headerTitle = PAGE_TITLES[activePage] || "Bosh sahifa";
  const isMenuPage = activePage === "taomlar" || activePage === "kategoriyalar";

  const totalCount = foods.length;
  const availableCount = foods.filter((f) => f.status === "Mavjud").length;
  const unavailableCount = foods.filter((f) => f.status !== "Mavjud").length;
  const availablePercent = totalCount
    ? Math.round((availableCount / totalCount) * 100)
    : 0;
  const unavailablePercent = totalCount
    ? Math.round((unavailableCount / totalCount) * 100)
    : 0;

  const categoryCounts = foods.reduce((acc: Record<string, number>, food) => {
    acc[food.category] = (acc[food.category] || 0) + 1;
    return acc;
  }, {});

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "Barchasi" || food.category === selectedCategory;
    const matchesStatus =
      statusFilter === "Barchasi" || food.status === statusFilter;
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleDeleteFood = (id: number) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-gray-200 overflow-hidden">
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static z-40 h-full ${
          sidebarOpen ? "w-[260px]" : "w-[76px]"
        } shrink-0 bg-[#0d0d0f] border-r border-white/5 flex flex-col transition-all duration-300 ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="cursor-pointer h-[72px] flex items-center justify-center border-b border-white/5 px-2">
          {sidebarOpen ? (
            <img
              src={logoImg}
              alt="Tanho Restaurant Logo"
              className="h-[70px] w-auto max-w-[220px] object-contain scale-110"
            />
          ) : (
            <Crown size={22} className="text-amber-400" strokeWidth={1.75} />
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {SIDEBAR_SECTIONS.map((section) => {
            const Icon = section.icon;
            const hasChildren = "children" in section && section.children;
            const isParentActive = hasChildren
              ? section.children.some((child) => child.key === activePage)
              : activePage === section.key;

            return (
              <div key={section.key}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setMenuOpen((value) => !value);
                      if (!menuOpen) {
                        handleSidebarClick(section.children[0].key);
                      }
                    } else {
                      handleSidebarClick(section.key);
                    }
                  }}
                  className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${
                    isParentActive
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                  }`}
                >
                  {isParentActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-amber-500" />
                  )}

                  <Icon size={18} strokeWidth={1.75} className="shrink-0" />

                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left font-medium">
                        {section.label}
                      </span>

                      {hasChildren &&
                        (menuOpen ? (
                          <ChevronDown size={15} className="text-gray-500" />
                        ) : (
                          <ChevronRight size={15} className="text-gray-500" />
                        ))}
                    </>
                  )}
                </button>

                {hasChildren && sidebarOpen && menuOpen && (
                  <div className="ml-[22px] mt-1 pl-4 border-l border-white/10 space-y-0.5">
                    {section.children.map((child) => {
                      const ChildIcon = child.icon;
                      const active = activePage === child.key;

                      return (
                        <button
                          key={child.key}
                          onClick={() => handleSidebarClick(child.key)}
                          className={`w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                            active
                              ? "text-amber-400 bg-amber-500/10 font-medium"
                              : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                          }`}
                        >
                          <ChildIcon size={14} strokeWidth={1.75} />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-[72px] shrink-0 border-b border-white/5 bg-[#0a0a0b]/95 backdrop-blur flex items-center justify-between px-4 md:px-6 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => {
                setSidebarOpen((value) => !value);
                setMobileSidebarOpen((value) => !value);
              }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 hidden sm:block">
              <h1 className="text-lg font-semibold text-white truncate">
                {headerTitle}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 truncate">
                {breadcrumb.map((item, index) => (
                  <span key={index} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight size={11} />}

                    <span
                      className={
                        index === breadcrumb.length - 1 ? "text-amber-400" : ""
                      }
                    >
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Qidirish..."
                className="w-64 bg-[#141416] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/40 transition-colors"
              />
            </div>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifOpen((value) => !value);
                  setAdminOpen(false);

                  if (!notifOpen) {
                    setNotifCount(0);
                  }
                }}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Bell size={19} />

                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center">
                    {notifCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#141416] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold text-white">
                    Bildirishnomalar
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                    {[
                      {
                        t: "Yangi buyurtma qabul qilindi",
                        s: "2 daqiqa oldin",
                      },
                      {
                        t: "“Tovuq BBQ” mavjud emas deb belgilandi",
                        s: "1 soat oldin",
                      },
                      {
                        t: "Yangi bron so‘rovi keldi",
                        s: "3 soat oldin",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-gray-200">{item.t}</p>

                        <p className="text-xs text-gray-500 mt-0.5">{item.s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={adminRef}>
              <button
                onClick={() => {
                  setAdminOpen((value) => !value);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-bold text-sm shrink-0">
                  A
                </div>

                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-white leading-tight">
                    Admin
                  </p>

                  <p className="text-xs text-gray-500 leading-tight">
                    Administrator
                  </p>
                </div>

                <ChevronDown size={14} className="text-gray-500" />
              </button>

              {adminOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#141416] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 py-1">
                  <button
                    onClick={() => {
                      setAdminOpen(false);
                      setActivePage("profil");
                    }}
                    className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User size={15} />
                    Profil
                  </button>

                  <button
                    onClick={() => {
                      setAdminOpen(false);
                      setActivePage("sozlamalar");
                    }}
                    className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Settings size={15} />
                    Sozlamalar
                  </button>

                  <div className="h-px bg-white/10 my-1" />

                  <button
                    onClick={() => {
                      setAdminOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={15} />
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activePage === "bosh-sahifa" ? (
            <DashboardPage
              foods={foods}
              orders={[]}
              onViewAllOrders={() => handleSidebarClick("buyurtmalar")}
            />
          ) : isMenuPage ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                  icon={Package}
                  iconBg="bg-amber-500/15"
                  iconColor="text-amber-400"
                  label="Jami taomlar"
                  value={totalCount}
                  sub="+2 bu hafta"
                  subColor="text-emerald-400"
                />

                <StatCard
                  icon={CircleDollarSign}
                  iconBg="bg-emerald-500/15"
                  iconColor="text-emerald-400"
                  label="Mavjud taomlar"
                  value={availableCount}
                  sub={`${availablePercent}%`}
                  subColor="text-emerald-400"
                />

                <StatCard
                  icon={CircleDollarSign}
                  iconBg="bg-red-500/15"
                  iconColor="text-red-400"
                  label="Mavjud emas"
                  value={unavailableCount}
                  sub={`${unavailablePercent}%`}
                  subColor="text-red-400"
                />

                <StatCard
                  icon={Users}
                  iconBg="bg-sky-500/15"
                  iconColor="text-sky-400"
                  label="Kategoriyalar"
                  value={categories.length}
                  sub="Barchasi faol"
                  subColor="text-gray-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors">
                  <Plus size={17} />
                  Taom qo‘shish
                </button>

                <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#141416] border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-200 text-sm font-semibold transition-colors">
                  <Upload size={16} />
                  Import qilish
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
                <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 h-fit">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Kategoriyalar</h3>

                    <button className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 flex items-center justify-center">
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("Barchasi")}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                        selectedCategory === "Barchasi"
                          ? "bg-amber-500/15 text-amber-400 font-medium"
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                      }`}
                    >
                      <span>Barchasi</span>

                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5">
                        {totalCount}
                      </span>
                    </button>

                    {categories.map((category) => {
                      const active = selectedCategory === category.name;

                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                            active
                              ? "bg-amber-500/15 text-amber-400 font-medium"
                              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                          }`}
                        >
                          <span className="truncate">{category.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5">
                            {categoryCounts[category.name] || 0}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10">
                    <Settings size={15} />
                    Kategoriyalarni boshqarish
                  </button>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-col md:flex-row gap-3 mb-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`${inputClass} md:w-48 cursor-pointer`}
                    >
                      <option value="Barchasi">Barchasi</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={`${inputClass} md:w-48 cursor-pointer`}
                    >
                      <option value="Barchasi">Barchasi (holat)</option>
                      <option value="Mavjud">Mavjud</option>
                      <option value="Mavjud emas">Mavjud emas</option>
                    </select>

                    <div className="relative flex-1">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Taom nomi bo‘yicha qidirish..."
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-left text-gray-500 text-xs uppercase tracking-wide">
                            <th className="px-4 py-3 font-medium">#</th>
                            <th className="px-4 py-3 font-medium">Taom nomi</th>
                            <th className="px-4 py-3 font-medium">
                              Kategoriya
                            </th>
                            <th className="px-4 py-3 font-medium">Narxi</th>
                            <th className="px-4 py-3 font-medium">Holat</th>
                            <th className="px-4 py-3 font-medium">Rasm</th>
                            <th className="px-4 py-3 font-medium text-right">
                              Amallar
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredFoods.length === 0 ? (
                            <tr>
                              <td
                                colSpan={7}
                                className="px-4 py-14 text-center text-gray-500"
                              >
                                Hech qanday taom topilmadi
                              </td>
                            </tr>
                          ) : (
                            filteredFoods.map((food) => (
                              <tr
                                key={food.id}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                              >
                                <td className="px-4 py-3 text-gray-500">
                                  #{String(food.id).padStart(3, "0")}
                                </td>

                                <td className="px-4 py-3 font-medium text-gray-100">
                                  {food.name}
                                </td>

                                <td className="px-4 py-3 text-gray-400">
                                  {food.category}
                                </td>

                                <td className="px-4 py-3 text-gray-200 font-medium">
                                  {formatSum(food.price)}
                                </td>

                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                      food.status === "Mavjud"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-red-500/10 text-red-400"
                                    }`}
                                  >
                                    {food.status}
                                  </span>
                                </td>

                                <td className="px-4 py-3 text-gray-400 text-xs">
                                  {food.image}
                                </td>

                                <td className="px-4 py-3 text-right space-x-2">
                                  <button className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors">
                                    <Edit size={16} />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteFood(food.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 flex items-center justify-center h-full">
              Ushbu bo‘lim hozirda ishlab chiqilmoqda...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
