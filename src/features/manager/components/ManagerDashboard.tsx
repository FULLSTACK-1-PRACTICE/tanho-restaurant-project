import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus, Upload, UtensilsCrossed, Utensils, ListTree, ShoppingCart, 
  Search, Settings, Trash2, Edit, Download, Send, LayoutDashboard, 
  ClipboardList, CalendarCheck, Grid, Users, Newspaper, FileText, 
  UserSquare2, BarChart3, BellRing, ChefHat, Tags, PlusCircle, X, FileSpreadsheet,
} from "lucide-react";

import { formatSum } from "../../../lib/utils";
import DashboardPage from "./DashboardPage";
import type { Order } from "./DashboardPage";
import { StatCard } from "./StatCard";
import { Sidebar } from "../../../components/common/SideBar";
import type { SidebarItem } from "../../../components/common/SideBar";
import { Navbar } from "../../../components/common/DashboardNavbar";
import SettingsPage from "./SettingsPage";

const inputClass = "w-full px-3.5 py-2.5 bg-[#1a1a1e] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors [&>option]:bg-[#161619] [&>option]:text-white";

const managerSections: SidebarItem[] = [
  { key: "bosh-sahifa", label: "Bosh sahifa", icon: LayoutDashboard },
  { key: "menyu", label: "Menyu", icon: Utensils, children: [
      { key: "taomlar", label: "Taomlar", icon: ChefHat },
      { key: "kategoriyalar", label: "Kategoriyalar", icon: Tags },
      { key: "qoshimchalar", label: "Qo‘shimchalar", icon: PlusCircle },
  ]},
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

export default function ManagerLayout() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("bosh-sahifa");
  const [searchTerm, setSearchTerm] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [statusFilter, setStatusFilter] = useState("Barchasi");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [newFood, setNewFood] = useState({
    name: "",
    category: "Milliy taomlar",
    price: "",
    status: "Mavjud",
  });

  const [importFile, setImportFile] = useState<File | null>(null);

  const [orders] = useState<Order[]>([
    { id: "ORD-101", customerName: "Alisher Navoiy", items: "2x Osh Palov, 1x Coca-Cola", total: 85000, status: "Yakunlandi", time: "12:30" },
    { id: "ORD-102", customerName: "Sardor Rahimov", items: "3x Manti, 2x Choy", total: 100000, status: "Tayyorlanmoqda", time: "12:45" },
    { id: "ORD-103", customerName: "Malika Umarova", items: "1x Somsa, 1x Kofe", total: 35000, status: "Kutilmoqda", time: "13:00" },
  ]);

  const [foods, setFoods] = useState([
    { id: 1, name: "Osh Palov", category: "Milliy taomlar", price: 35000, status: "Mavjud" },
    { id: 2, name: "Manti", category: "Milliy taomlar", price: 30000, status: "Mavjud" },
    { id: 3, name: "Coca-Cola 1.5L", category: "Ichimliklar", price: 15000, status: "Mavjud" },
  ]);

  const [categories] = useState([
    { id: 1, name: "Milliy taomlar" },
    { id: 2, name: "Ichimliklar" },
  ]);

  const handleDeleteFood = (id: number) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
    toast.error("Taom menyudan o'chirildi");
  };

  const handleAddFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFood.name || !newFood.price) return;

    setFoods((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newFood.name,
        category: newFood.category,
        price: Number(newFood.price),
        status: newFood.status,
      },
    ]);

    setNewFood({ name: "", category: "Milliy taomlar", price: "", status: "Mavjud" });
    setIsAddModalOpen(false);
    toast.success("Yangi taom muvaffaqiyatli qo'shildi!");
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFile) return;

    setIsImportModalOpen(false);
    setImportFile(null);
    toast.success("Fayl muvaffaqiyatli import qilindi!");
  };

  const isMenuPage =
    activePage === "taomlar" ||
    activePage === "kategoriyalar" ||
    activePage === "qoshimchalar" ||
    activePage === "menyu";

  const totalCount = foods.length;
  const availableCount = foods.filter((f) => f.status === "Mavjud").length;
  const unavailableCount = foods.filter((f) => f.status !== "Mavjud").length;
  const availablePercent = totalCount ? Math.round((availableCount / totalCount) * 100) : 0;
  const unavailablePercent = totalCount ? Math.round((unavailableCount / totalCount) * 100) : 0;

  const categoryCounts = foods.reduce((acc: Record<string, number>, food) => {
    acc[food.category] = (acc[food.category] || 0) + 1;
    return acc;
  }, {});

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selectedCategory === "Barchasi" || food.category === selectedCategory;
    const matchesStatus = statusFilter === "Barchasi" || food.status === statusFilter;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.clear();
    
    // Toast xabari landing sahifaga o'tganda ham qotib qolmasdan, chiroyli chiqishi uchun
    toast.info("Tizimdan chiqildi", {
      description: "Xayr, sog' bo'ling!",
    });

    // Sahifani to'liq reload qilmasdan router orqali landingga o'tkazish
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-gray-200 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePage={activePage}
        onSelectPage={(page) => setActivePage(page)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        sections={managerSections}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          headerTitle={
            activePage === "bosh-sahifa"
              ? "Bosh sahifa"
              : activePage === "sozlamalar"
              ? "Sozlamalar"
              : isMenuPage
              ? "Taomlar va Menyu"
              : activePage.charAt(0).toUpperCase() + activePage.slice(1)
          }
          breadcrumb={["Menejer", activePage]}
          headerSearch={headerSearch}
          setHeaderSearch={setHeaderSearch}
          onLogout={handleLogout}
          onNavigate={(page) => setActivePage(page)}
          user={{ name: "Manager", role: "Manager" }}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0a0b]">
          {activePage === "bosh-sahifa" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111113] border border-white/5 p-4 rounded-2xl">
                <div>
                  <h2 className="text-base font-semibold text-white">Xush kelibsiz, Menejer!</h2>
                  <p className="text-xs text-gray-400">Bugungi restoran faoliyati va ko'rsatkichlarni nazorat qiling.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium transition-colors cursor-pointer border border-white/5">
                    <Download size={14} className="text-amber-400" />
                    Hisobotni yuklab olish
                  </button>
                  <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium transition-colors cursor-pointer border border-amber-500/20">
                    <Send size={14} />
                    Oshxonaga xabar
                  </button>
                </div>
              </div>

              <DashboardPage
                orders={orders}
                onViewAllOrders={() => setActivePage("buyurtmalar")}
              />
            </div>
          ) : activePage === "sozlamalar" ? (
            <SettingsPage />
          ) : isMenuPage ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard icon={Utensils} iconBg="bg-amber-500/15" iconColor="text-amber-400" label="Jami taomlar" value={String(totalCount)} sub="+2 bu hafta" subColor="text-emerald-400" />
                <StatCard icon={ShoppingCart} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" label="Mavjud taomlar" value={String(availableCount)} sub={`${availablePercent}%`} subColor="text-emerald-400" />
                <StatCard icon={ShoppingCart} iconBg="bg-red-500/15" iconColor="text-red-400" label="Mavjud emas" value={String(unavailableCount)} sub={`${unavailablePercent}%`} subColor="text-red-400" />
                <StatCard icon={ListTree} iconBg="bg-sky-500/15" iconColor="text-sky-400" label="Kategoriyalar" value={String(categories.length)} sub="Barchasi faol" subColor="text-gray-400" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Plus size={17} /> Taom qo‘shish
                </button>
                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#141416] border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-200 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Upload size={16} /> Import qilish
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
                <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 h-fit">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Kategoriyalar</h3>
                    <button className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 flex items-center justify-center cursor-pointer">
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("Barchasi")}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${
                        selectedCategory === "Barchasi" ? "bg-amber-500/15 text-amber-400 font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                      }`}
                    >
                      <span>Barchasi</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5">{totalCount}</span>
                    </button>

                    {categories.map((category) => {
                      const active = selectedCategory === category.name;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${
                            active ? "bg-amber-500/15 text-amber-400 font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                          }`}
                        >
                          <span className="truncate">{category.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5">{categoryCounts[category.name] || 0}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10 cursor-pointer">
                    <Settings size={15} /> Kategoriyalarni boshqarish
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
                        <option key={category.id} value={category.name}>{category.name}</option>
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
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
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
                            <th className="px-4 py-3 font-medium">Kategoriya</th>
                            <th className="px-4 py-3 font-medium">Narxi</th>
                            <th className="px-4 py-3 font-medium">Holati</th>
                            <th className="px-4 py-3 font-medium text-right">Amallar</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredFoods.map((food, index) => (
                            <tr key={food.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                              <td className="px-4 py-3 font-medium text-white">{food.name}</td>
                              <td className="px-4 py-3 text-gray-400">{food.category}</td>
                              <td className="px-4 py-3 text-amber-400 font-medium">
                                {formatSum ? formatSum(food.price) : food.price}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                  food.status === "Mavjud" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                }`}>
                                  {food.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center transition-colors cursor-pointer">
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFood(food.id)}
                                    className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredFoods.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Taomlar topilmadi</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-2">
              <UtensilsCrossed size={36} className="text-amber-400/50" />
              <p className="text-base font-medium text-white capitalize">{activePage.replace("-", " ")} sahifasi</p>
              <p className="text-xs text-gray-500">Ushbu bo'lim tez orada to'liq ishga tushiriladi.</p>
            </div>
          )}
        </main>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ChefHat className="text-amber-400" size={18} /> Yangi taom qo'shish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFoodSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Taom nomi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Osh Palov"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Kategoriya</label>
                <select
                  value={newFood.category}
                  onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                  className={inputClass}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Narxi (so'm)</label>
                <input
                  type="number"
                  required
                  placeholder="35000"
                  value={newFood.price}
                  onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Holati</label>
                <select
                  value={newFood.status}
                  onChange={(e) => setNewFood({ ...newFood, status: e.target.value })}
                  className={inputClass}
                >
                  <option value="Mavjud">Mavjud</option>
                  <option value="Mavjud emas">Mavjud emas</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-medium cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <FileSpreadsheet className="text-amber-400" size={18} /> Taomlarni import qilish
              </h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="p-4 space-y-4">
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-colors cursor-pointer bg-white/[0.01]">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-xs text-gray-300 font-medium">Excel (.xlsx) yoki CSV faylni tanlang</p>
                <p className="text-[10px] text-gray-500 mt-1">Maksimal hajmi: 5MB</p>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => setImportFile(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                  id="file-import"
                />
                <label htmlFor="file-import" className="mt-3 inline-block px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-amber-400 rounded-lg cursor-pointer">
                  Faylni tanlash
                </label>
              </div>

              {importFile && (
                <p className="text-xs text-emerald-400 font-medium truncate">Tanlandi: {importFile.name}</p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-medium cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={!importFile}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Importni boshlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}