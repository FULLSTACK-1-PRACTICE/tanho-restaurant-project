import type { FormEvent } from "react";
import {
  ChefHat,
  Edit,
  FileSpreadsheet,
  ListTree,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Upload,
  X,
  Utensils,
} from "lucide-react";
import { formatSum } from "../../../lib/utils";
import { StatCard } from "./StatCard";
import type { Category, Food, NewFoodForm } from "../../../data/mockData";

type Props = {
  foods: Food[];
  categories: Category[];
  selectedCategory: string;
  statusFilter: string;
  searchTerm: string;
  inputClass: string;
  newFood: NewFoodForm;
  importFile: File | null;
  isAddModalOpen: boolean;
  isImportModalOpen: boolean;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onNewFoodChange: (value: NewFoodForm) => void;
  onImportFileChange: (file: File | null) => void;
  onAddFoodOpen: () => void;
  onImportOpen: () => void;
  onAddFoodClose: () => void;
  onImportClose: () => void;
  onAddFoodSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onImportSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDeleteFood: (id: number) => void;
  onOpenCategories: () => void;
};

export default function ManagerMenuSection({
  foods,
  categories,
  selectedCategory,
  statusFilter,
  searchTerm,
  inputClass,
  newFood,
  importFile,
  isAddModalOpen,
  isImportModalOpen,
  onCategoryChange,
  onStatusChange,
  onSearchChange,
  onNewFoodChange,
  onImportFileChange,
  onAddFoodOpen,
  onImportOpen,
  onAddFoodClose,
  onImportClose,
  onAddFoodSubmit,
  onImportSubmit,
  onDeleteFood,
  onOpenCategories,
}: Props) {
  const totalCount = foods.length;
  const availableCount = foods.filter((food) => food.status === "Mavjud").length;
  const unavailableCount = foods.filter((food) => food.status !== "Mavjud").length;
  const availablePercent = totalCount ? Math.round((availableCount / totalCount) * 100) : 0;
  const unavailablePercent = totalCount ? Math.round((unavailableCount / totalCount) * 100) : 0;

  const categoryCounts = foods.reduce<Record<string, number>>((result, food) => {
    result[food.category] = (result[food.category] || 0) + 1;
    return result;
  }, {});

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selectedCategory === "Barchasi" || food.category === selectedCategory;
    const matchesStatus = statusFilter === "Barchasi" || food.status === statusFilter;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon={Utensils} iconBg="bg-amber-500/15" iconColor="text-amber-400" label="Jami taomlar" value={String(totalCount)} sub="+2 bu hafta" subColor="text-emerald-400" />
          <StatCard icon={ShoppingCart} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" label="Mavjud taomlar" value={String(availableCount)} sub={`${availablePercent}%`} subColor="text-emerald-400" />
          <StatCard icon={ShoppingCart} iconBg="bg-red-500/15" iconColor="text-red-400" label="Mavjud emas" value={String(unavailableCount)} sub={`${unavailablePercent}%`} subColor="text-red-400" />
          <StatCard icon={ListTree} iconBg="bg-sky-500/15" iconColor="text-sky-400" label="Kategoriyalar" value={String(categories.length)} sub="Barchasi faol" subColor="text-gray-400" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
          <button type="button" onClick={onAddFoodOpen} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors cursor-pointer">
            <Plus size={17} /> Taom qo‘shish
          </button>
          <button type="button" onClick={onImportOpen} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#141416] border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-200 text-sm font-semibold transition-colors cursor-pointer">
            <Upload size={16} /> Import qilish
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
          <aside className="bg-[#111113] border border-white/5 rounded-2xl p-4 h-fit">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Kategoriyalar</h3>
              <button type="button" className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 flex items-center justify-center cursor-pointer"><Plus size={15} /></button>
            </div>
            <div className="space-y-1">
              <button type="button" onClick={() => onCategoryChange("Barchasi")} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${selectedCategory === "Barchasi" ? "bg-amber-500/15 text-amber-400 font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"}`}>
                <span>Barchasi</span><span className="text-xs px-2 py-0.5 rounded-full bg-white/5">{totalCount}</span>
              </button>
              {categories.map((category) => (
                <button type="button" key={category.id} onClick={() => onCategoryChange(category.name)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${selectedCategory === category.name ? "bg-amber-500/15 text-amber-400 font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"}`}>
                  <span className="truncate">{category.name}</span><span className="text-xs px-2 py-0.5 rounded-full bg-white/5">{categoryCounts[category.name] || 0}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={onOpenCategories} className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10 cursor-pointer"><Settings size={15} /> Kategoriyalarni boshqarish</button>
          </aside>

          <section className="min-w-0">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)} className={`${inputClass} md:w-48 cursor-pointer`}>
                <option value="Barchasi">Barchasi</option>
                {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
              </select>
              <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className={`${inputClass} md:w-48 cursor-pointer`}>
                <option value="Barchasi">Barchasi (holat)</option>
                <option value="Mavjud">Mavjud</option>
                <option value="Mavjud emas">Mavjud emas</option>
              </select>
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Taom nomi bo‘yicha qidirish..." className={`${inputClass} pl-9`} />
              </div>
            </div>

            <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/5 text-left text-gray-500 text-xs uppercase tracking-wide"><th className="px-4 py-3">#</th><th className="px-4 py-3">Taom nomi</th><th className="px-4 py-3">Kategoriya</th><th className="px-4 py-3">Narxi</th><th className="px-4 py-3">Holati</th><th className="px-4 py-3 text-right">Amallar</th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredFoods.map((food, index) => <tr key={food.id} className="hover:bg-white/[0.02]"><td className="px-4 py-3 text-gray-500">{index + 1}</td><td className="px-4 py-3 font-medium text-white">{food.name}</td><td className="px-4 py-3 text-gray-400">{food.category}</td><td className="px-4 py-3 text-amber-400 font-medium">{formatSum(food.price)}</td><td className="px-4 py-3"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${food.status === "Mavjud" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>{food.status}</span></td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button type="button" className="w-8 h-8 rounded-lg bg-white/5 text-gray-300 flex items-center justify-center"><Edit size={14} /></button><button type="button" onClick={() => onDeleteFood(food.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"><Trash2 size={14} /></button></div></td></tr>)}
                    {filteredFoods.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Taomlar topilmadi</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      {isAddModalOpen && <AddFoodModal categories={categories} form={newFood} inputClass={inputClass} onChange={onNewFoodChange} onClose={onAddFoodClose} onSubmit={onAddFoodSubmit} />}
      {isImportModalOpen && <ImportFoodModal file={importFile} onFileChange={onImportFileChange} onClose={onImportClose} onSubmit={onImportSubmit} />}
    </>
  );
}

function AddFoodModal({ categories, form, inputClass, onChange, onClose, onSubmit }: { categories: Category[]; form: NewFoodForm; inputClass: string; onChange: (form: NewFoodForm) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"><div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"><div className="flex items-center justify-between p-4 border-b border-white/5"><h3 className="text-base font-semibold text-white flex items-center gap-2"><ChefHat className="text-amber-400" size={18} />Yangi taom qo‘shish</h3><button type="button" onClick={onClose}><X size={18} /></button></div><form onSubmit={onSubmit} className="p-4 space-y-4"><label className="block text-xs text-gray-400">Taom nomi<input required value={form.name} onChange={(event) => onChange({ ...form, name: event.target.value })} className={`${inputClass} mt-1`} placeholder="Masalan: Osh Palov" /></label><label className="block text-xs text-gray-400">Kategoriya<select value={form.category} onChange={(event) => onChange({ ...form, category: event.target.value })} className={`${inputClass} mt-1`}>{categories.map((category) => <option key={category.id}>{category.name}</option>)}</select></label><label className="block text-xs text-gray-400">Narxi<input required min="1" type="number" value={form.price} onChange={(event) => onChange({ ...form, price: event.target.value })} className={`${inputClass} mt-1`} placeholder="35000" /></label><label className="block text-xs text-gray-400">Holati<select value={form.status} onChange={(event) => onChange({ ...form, status: event.target.value as NewFoodForm["status"] })} className={`${inputClass} mt-1`}><option value="Mavjud">Mavjud</option><option value="Mavjud emas">Mavjud emas</option></select></label><div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2 border border-white/10 rounded-xl text-xs">Bekor qilish</button><button type="submit" className="px-4 py-2 bg-amber-500 text-black rounded-xl text-xs font-semibold">Saqlash</button></div></form></div></div>;
}

function ImportFoodModal({ file, onFileChange, onClose, onSubmit }: { file: File | null; onFileChange: (file: File | null) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"><div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden"><div className="flex items-center justify-between p-4 border-b border-white/5"><h3 className="text-base font-semibold text-white flex items-center gap-2"><FileSpreadsheet className="text-amber-400" size={18} />Taomlarni import qilish</h3><button type="button" onClick={onClose}><X size={18} /></button></div><form onSubmit={onSubmit} className="p-4 space-y-4"><div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center"><Upload className="mx-auto text-gray-400 mb-2" size={32} /><p className="text-xs text-gray-300">Excel yoki CSV faylni tanlang</p><input id="manager-file-import" type="file" accept=".xlsx,.xls,.csv" onChange={(event) => onFileChange(event.target.files?.[0] || null)} className="hidden" /><label htmlFor="manager-file-import" className="mt-3 inline-block px-3 py-1.5 bg-white/5 text-xs text-amber-400 rounded-lg cursor-pointer">Faylni tanlash</label></div>{file && <p className="text-xs text-emerald-400 truncate">Tanlandi: {file.name}</p>}<div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2 border border-white/10 rounded-xl text-xs">Bekor qilish</button><button type="submit" disabled={!file} className="px-4 py-2 bg-amber-500 text-black rounded-xl text-xs font-semibold disabled:opacity-50">Importni boshlash</button></div></form></div></div>;
}
