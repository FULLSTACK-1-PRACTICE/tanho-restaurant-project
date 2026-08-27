import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Download, Send, UtensilsCrossed } from "lucide-react";

import { Sidebar } from "../../../components/common/SideBar";
import { Navbar } from "../../../components/common/DashboardNavbar";
import DashboardPage from "./DashboardPage";
import SettingsPage from "./SettingsPage";
import ManagerMenuSection from "./ManagerMenuSection";

import {
  managerSections,
  mockCategories,
  mockFoods,
  mockOrders,
} from "../../../data/mockData";
import type {
  Category,
  Food,
  NewFoodForm,
  Order,
} from "../../../data/mockData";

const inputClass =
  "w-full px-3.5 py-2.5 bg-[#1a1a1e] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors [&>option]:bg-[#161619] [&>option]:text-white";

export default function ManagerDashboard() {
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
  const [importFile, setImportFile] = useState<File | null>(null);

  const [newFood, setNewFood] = useState<NewFoodForm>({
    name: "",
    category: "Milliy taomlar",
    price: "",
    status: "Mavjud",
  });

  const [orders] = useState<Order[]>(mockOrders);
  const [foods, setFoods] = useState<Food[]>(mockFoods);
  const [categories] = useState<Category[]>(mockCategories);

  const isMenuPage =
    activePage === "taomlar" ||
    activePage === "kategoriyalar" ||
    activePage === "qoshimchalar" ||
    activePage === "menyu";

  const handleSelectPage = (page: string) => {
    setActivePage(page);
    setMobileSidebarOpen(false);
  };

  const handleDeleteFood = (id: number) => {
    setFoods((previousFoods) =>
      previousFoods.filter((food) => food.id !== id),
    );
    toast.error("Taom menyudan o‘chirildi");
  };

  const handleAddFoodSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newFood.name.trim() || !newFood.price) {
      toast.error("Barcha maydonlarni to‘ldiring");
      return;
    }

    const price = Number(newFood.price);
    if (price <= 0) {
      toast.error("Narx 0 dan katta bo‘lishi kerak");
      return;
    }

    const food: Food = {
      id: Date.now(),
      name: newFood.name.trim(),
      category: newFood.category,
      price,
      status: newFood.status,
    };

    setFoods((previousFoods) => [...previousFoods, food]);
    setNewFood({
      name: "",
      category: "Milliy taomlar",
      price: "",
      status: "Mavjud",
    });
    setIsAddModalOpen(false);
    toast.success("Yangi taom muvaffaqiyatli qo‘shildi!");
  };

  const handleImportSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!importFile) {
      toast.error("Avval fayl tanlang");
      return;
    }

    if (importFile.size > 5 * 1024 * 1024) {
      toast.error("Fayl hajmi 5MB dan oshmasligi kerak");
      return;
    }

    setIsImportModalOpen(false);
    setImportFile(null);
    toast.success("Fayl muvaffaqiyatli import qilindi!");
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Tizimdan chiqildi", {
      description: "Xayr, sog‘ bo‘ling!",
    });

    setTimeout(() => navigate("/"), 500);
  };

  const getHeaderTitle = () => {
    if (activePage === "bosh-sahifa") return "Bosh sahifa";
    if (activePage === "sozlamalar") return "Sozlamalar";
    if (isMenuPage) return "Taomlar va Menyu";

    return activePage
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-gray-200 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePage={activePage}
        onSelectPage={handleSelectPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        items={managerSections}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen((previous) => !previous);
            } else {
              setSidebarOpen((previous) => !previous);
            }
          }}
          headerTitle={getHeaderTitle()}
          breadcrumb={["Menejer", activePage]}
          headerSearch={headerSearch}
          setHeaderSearch={setHeaderSearch}
          onLogout={handleLogout}
          onNavigate={handleSelectPage}
          user={{ name: "Manager", role: "Manager" }}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0a0b]">
          {activePage === "bosh-sahifa" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111113] border border-white/5 p-4 rounded-2xl">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Xush kelibsiz, Menejer!
                  </h2>
                  <p className="text-xs text-gray-400">
                    Bugungi restoran faoliyati va ko‘rsatkichlarni nazorat qiling.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button type="button" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 text-gray-200 text-xs font-medium border border-white/5">
                    <Download size={14} className="text-amber-400" />
                    Hisobotni yuklab olish
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                    <Send size={14} /> Oshxonaga xabar
                  </button>
                </div>
              </div>
              <DashboardPage
                orders={orders}
                onViewAllOrders={() => setActivePage("buyurtmalar")}
              />
            </div>
          )}

          {activePage === "sozlamalar" && <SettingsPage />}

          {isMenuPage && (
            <ManagerMenuSection
              foods={foods}
              categories={categories}
              selectedCategory={selectedCategory}
              statusFilter={statusFilter}
              searchTerm={searchTerm}
              inputClass={inputClass}
              newFood={newFood}
              importFile={importFile}
              isAddModalOpen={isAddModalOpen}
              isImportModalOpen={isImportModalOpen}
              onCategoryChange={setSelectedCategory}
              onStatusChange={setStatusFilter}
              onSearchChange={setSearchTerm}
              onNewFoodChange={setNewFood}
              onImportFileChange={setImportFile}
              onAddFoodOpen={() => setIsAddModalOpen(true)}
              onImportOpen={() => setIsImportModalOpen(true)}
              onAddFoodClose={() => setIsAddModalOpen(false)}
              onImportClose={() => setIsImportModalOpen(false)}
              onAddFoodSubmit={handleAddFoodSubmit}
              onImportSubmit={handleImportSubmit}
              onDeleteFood={handleDeleteFood}
              onOpenCategories={() => setActivePage("kategoriyalar")}
            />
          )}

          {activePage !== "bosh-sahifa" &&
            activePage !== "sozlamalar" &&
            !isMenuPage && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-2">
                <UtensilsCrossed size={36} className="text-amber-400/50" />
                <p className="text-base font-medium text-white capitalize">
                  {activePage.replace("-", " ")} sahifasi
                </p>
                <p className="text-xs text-gray-500">
                  Ushbu bo‘lim tez orada to‘liq ishga tushiriladi.
                </p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
}
