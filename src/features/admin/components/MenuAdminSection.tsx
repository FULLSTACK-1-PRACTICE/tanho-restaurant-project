import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
  available: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  itemsCount: number;
}

interface ExtraItem {
  id: string;
  name: string;
  price: string;
}

const initialMenuItems: MenuItem[] = [
  { id: "1", name: "Osh", category: "Osh", price: "25,000 so'm", available: true },
  { id: "2", name: "Mol go'shtli shashlik", category: "Shashliklar", price: "35,000 so'm", available: true },
  { id: "3", name: "Sezar salati", category: "Salatlar", price: "30,000 so'm", available: true },
  { id: "4", name: "Coca-Cola", category: "Ichimliklar", price: "12,000 so'm", available: true },
];

const initialCategories: CategoryItem[] = [
  { id: "1", name: "Osh", itemsCount: 3 },
  { id: "2", name: "Shashliklar", itemsCount: 8 },
  { id: "3", name: "Salatlar", itemsCount: 5 },
  { id: "4", name: "Ichimliklar", itemsCount: 10 },
];

const initialExtras: ExtraItem[] = [
  { id: "1", name: "Smetana", price: "3,000 so'm" },
  { id: "2", name: "Non", price: "4,000 so'm" },
  { id: "3", name: "Ketchup", price: "2,000 so'm" },
];

export function MenuAdminSection() {
  const [activeTab, setActiveTab] = useState<"dishes" | "categories" | "extras">("dishes");
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">("all");

  const filteredDishes = initialMenuItems.filter((item) => {
    if (filter === "available") return item.available;
    if (filter === "unavailable") return !item.available;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white sm:text-2xl">Menyu boshqaruvi</h1>
        <p className="text-xs text-gray-400 sm:text-sm">
          Restoran taomlari, kategoriyalari va qo'shimchalar ro'yxati (Faqat ko'rish rejimi)
        </p>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("dishes")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === "dishes"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Taomlar ({initialMenuItems.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === "categories"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Kategoriyalar ({initialCategories.length})
        </button>
        <button
          onClick={() => setActiveTab("extras")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === "extras"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Qo'shimchalar ({initialExtras.length})
        </button>
      </div>
          
      {activeTab === "dishes" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-xs rounded-md ${
                filter === "all" ? "bg-white/10 text-white font-semibold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Barcha taomlar ({initialMenuItems.length})
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-3 py-1.5 text-xs rounded-md ${
                filter === "available" ? "bg-white/10 text-white font-semibold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Mavjud ({initialMenuItems.filter((i) => i.available).length})
            </button>
            <button
              onClick={() => setFilter("unavailable")}
              className={`px-3 py-1.5 text-xs rounded-md ${
                filter === "unavailable" ? "bg-white/10 text-white font-semibold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Mavjud emas ({initialMenuItems.filter((i) => !i.available).length})
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase">
                <tr>
                  <th className="px-4 py-3">Taom nomi</th>
                  <th className="px-4 py-3">Kategoriya</th>
                  <th className="px-4 py-3">Narxi</th>
                  <th className="px-4 py-3">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDishes.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          item.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.available ? "Mavjud" : "Mavjud emas"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase">
              <tr>
                <th className="px-4 py-3">Kategoriya nomi</th>
                <th className="px-4 py-3">Taomlar soni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium text-white">{cat.name}</td>
                  <td className="px-4 py-3">{cat.itemsCount} ta taom</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "extras" && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase">
              <tr>
                <th className="px-4 py-3">Qo'shimcha nomi</th>
                <th className="px-4 py-3">Narxi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialExtras.map((extra) => (
                <tr key={extra.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium text-white">{extra.name}</td>
                  <td className="px-4 py-3">{extra.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}