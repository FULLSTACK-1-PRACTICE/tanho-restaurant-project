import type { FormEvent } from "react";
import { useState, useRef, useEffect } from "react";
import {
  ChefHat,
  Edit,
  FileSpreadsheet,
  ListTree,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Upload,
  X,
  Utensils,
  ChevronDown,
  Check,
  FolderPlus,
} from "lucide-react";
import { formatSum } from "../../../lib/utils";
import { StatCard } from "./StatCard";
import type { Category, Food, NewFoodForm } from "../../../data/mockData";

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "Asosiy taomlar" },
  { id: 2, name: "Salatlar" },
  { id: 3, name: "Ichimliklar" },
  { id: 4, name: "Dessertlar" },
  { id: 5, name: "Qo'shimchalar" },
];

const DEFAULT_FOODS: Food[] = [
  { id: 1, name: "Osh Palov", category: "Asosiy taomlar", price: 35000, status: "Mavjud" },
  { id: 2, name: "Shashlik", category: "Asosiy taomlar", price: 20000, status: "Mavjud" },
];

type Props = {
  foods?: Food[];
  categories?: Category[];
  selectedCategory?: string;
  statusFilter?: string;
  searchTerm?: string;
  onCategoryChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onDeleteFood?: (id: number) => void;
  onAddCategorySubmit?: (categoryName: string) => void;
};

function InlineCustomSelect({
  options,
  value,
  onChange,
  className = "",
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-2 bg-[#141416] border border-[#DCAE4D]/80 rounded-full text-sm font-medium text-white hover:border-[#DCAE4D] transition-all cursor-pointer focus:outline-none"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-gray-300 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#DCAE4D]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 z-50 bg-[#161619] border border-white/10 rounded-2xl shadow-2xl py-1.5 overflow-hidden backdrop-blur-xl max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-xs text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#DCAE4D]/20 text-[#DCAE4D] font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check size={14} className="text-[#DCAE4D] shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ManagerMenuSection({
  foods: propsFoods,
  categories: propsCategories = [],
  selectedCategory: propsSelectedCategory,
  statusFilter: propsStatusFilter,
  searchTerm: propsSearchTerm,
  onCategoryChange,
  onStatusChange,
  onSearchChange,
  onDeleteFood,
  onAddCategorySubmit,
}: Props) {
  const [internalFoods, setInternalFoods] = useState<Food[]>(() => {
    const saved = localStorage.getItem("menu_foods");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return propsFoods && propsFoods.length > 0 ? propsFoods : DEFAULT_FOODS;
  });

  useEffect(() => {
    localStorage.setItem("menu_foods", JSON.stringify(internalFoods));
  }, [internalFoods]);

  const foods = internalFoods;

  const [internalCategories, setInternalCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("menu_categories");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return propsCategories.length > 0 ? propsCategories : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem("menu_categories", JSON.stringify(internalCategories));
  }, [internalCategories]);

  const categories = internalCategories;

  const [internalSelectedCategory, setInternalSelectedCategory] = useState("Barchasi");
  const [internalStatusFilter, setInternalStatusFilter] = useState("Barchasi");
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [importFile, setImportFile] = useState<File | null>(null);
  const [newFood, setNewFood] = useState<NewFoodForm>({
    name: "",
    category: categories[0]?.name || "Asosiy taomlar",
    price: "",
    status: "Mavjud",
  });

  const selectedCategory = propsSelectedCategory ?? internalSelectedCategory;
  const statusFilter = propsStatusFilter ?? internalStatusFilter;
  const searchTerm = propsSearchTerm ?? internalSearchTerm;

  const handleCategoryChange = (val: string) => {
    setInternalSelectedCategory(val);
    onCategoryChange?.(val);
  };

  const handleStatusChange = (val: string) => {
    setInternalStatusFilter(val);
    onStatusChange?.(val);
  };

  const handleSearchChange = (val: string) => {
    setInternalSearchTerm(val);
    onSearchChange?.(val);
  };

  const handleCreateFood = (createdFood: NewFoodForm) => {
    const item: Food = {
      id: Date.now(),
      name: createdFood.name,
      category: createdFood.category,
      price: Number(createdFood.price),
      status: createdFood.status,
    };
    setInternalFoods((prev) => [item, ...prev]);
  };

  const handleUpdateFood = (updatedFood: Food) => {
    setInternalFoods((prev) =>
      prev.map((item) => (item.id === updatedFood.id ? updatedFood : item))
    );
    setEditingFood(null);
  };

  const handleDelete = (id: number) => {
    setInternalFoods((prev) => prev.filter((item) => item.id !== id));
    onDeleteFood?.(id);
  };

  const handleCreateCategory = (categoryName: string) => {
    const newCatObj: Category = {
      id: Date.now(),
      name: categoryName,
    };
    setInternalCategories((prev) => [...prev, newCatObj]);
    onAddCategorySubmit?.(categoryName);
  };

  const totalCount = foods.length;
  const availableCount = foods.filter((food) => food.status === "Mavjud").length;
  const unavailableCount = foods.filter((food) => food.status !== "Mavjud").length;
  const availablePercent = totalCount ? Math.round((availableCount / totalCount) * 100) : 0;
  const unavailablePercent = totalCount ? Math.round((unavailableCount / totalCount) * 100) : 0;

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selectedCategory === "Barchasi" || food.category === selectedCategory;
    const matchesStatus = statusFilter === "Barchasi" || food.status === statusFilter;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const categorySelectOptions = [
    { value: "Barchasi", label: "Barchasi" },
    ...categories.map((c) => ({ value: c.name, label: c.name })),
  ];

  const statusSelectOptions = [
    { value: "Barchasi", label: "Barchasi (holat)" },
    { value: "Mavjud", label: "Mavjud" },
    { value: "Mavjud emas", label: "Mavjud emas" },
  ];

  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon={Utensils} iconBg="bg-[#DCAE4D]/15" iconColor="text-[#DCAE4D]" label="Jami taomlar" value={String(totalCount)} sub="+2 bu hafta" subColor="text-emerald-400" />
          <StatCard icon={ShoppingCart} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" label="Mavjud taomlar" value={String(availableCount)} sub={`${availablePercent}%`} subColor="text-emerald-400" />
          <StatCard icon={ShoppingCart} iconBg="bg-red-500/15" iconColor="text-red-400" label="Mavjud emas" value={String(unavailableCount)} sub={`${unavailablePercent}%`} subColor="text-red-400" />
          <StatCard icon={ListTree} iconBg="bg-sky-500/15" iconColor="text-sky-400" label="Kategoriyalar" value={String(categories.length)} sub="Barchasi faol" subColor="text-gray-400" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button type="button" onClick={() => setIsAddCategoryModalOpen(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#141416] border border-[#DCAE4D]/80 hover:border-[#DCAE4D] text-[#DCAE4D] text-sm font-semibold transition-colors cursor-pointer">
            <FolderPlus size={16} /> Kategoriya qo‘shish
          </button>
          <button type="button" onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#DCAE4D] hover:bg-[#c99b3c] text-black text-sm font-semibold transition-colors cursor-pointer">
            <Plus size={17} /> Taom qo‘shish
          </button>
          <button type="button" onClick={() => setIsImportModalOpen(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#141416] border border-[#DCAE4D]/80 hover:border-[#DCAE4D] text-gray-200 text-sm font-semibold transition-colors cursor-pointer">
            <Upload size={16} /> Import qilish
          </button>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <InlineCustomSelect
              options={categorySelectOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full md:w-52"
            />

            <InlineCustomSelect
              options={statusSelectOptions}
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full md:w-52"
            />

            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Taom nomi bo‘yicha qidirish..."
                className="w-full bg-[#141416] border border-[#DCAE4D]/80 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#DCAE4D] placeholder-gray-500"
              />
            </div>
          </div>

          <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Taom nomi</th>
                    <th className="px-4 py-3">Kategoriya</th>
                    <th className="px-4 py-3">Narxi</th>
                    <th className="px-4 py-3">Holati</th>
                    <th className="px-4 py-3 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredFoods.map((food, index) => (
                    <tr key={food.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-white">{food.name}</td>
                      <td className="px-4 py-3 text-gray-400">{food.category}</td>
                      <td className="px-4 py-3 text-[#DCAE4D] font-medium">{formatSum(food.price)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${food.status === "Mavjud" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {food.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button 
                            type="button" 
                            onClick={() => setEditingFood(food)} 
                            className="w-8 h-8 rounded-lg bg-white/5 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit size={14} />
                          </button>
                          <button type="button" onClick={() => handleDelete(food.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredFoods.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        Taomlar topilmadi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddFoodModal
          categories={categories}
          form={newFood}
          onChange={setNewFood}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleCreateFood}
        />
      )}

      {editingFood && (
        <EditFoodModal
          categories={categories}
          food={editingFood}
          onClose={() => setEditingFood(null)}
          onSave={handleUpdateFood}
        />
      )}

      {isImportModalOpen && (
        <ImportFoodModal
          file={importFile}
          onFileChange={setImportFile}
          onClose={() => setIsImportModalOpen(false)}
          onSubmit={(e) => {
            e.preventDefault();
            setIsImportModalOpen(false);
          }}
        />
      )}
      {isAddCategoryModalOpen && (
        <AddCategoryModal
          onClose={() => setIsAddCategoryModalOpen(false)}
          onSubmit={handleCreateCategory}
        />
      )}
    </>
  );
}

function EditFoodModal({
  categories,
  food,
  onClose,
  onSave,
}: {
  categories: Category[];
  food: Food;
  onClose: () => void;
  onSave: (food: Food) => void;
}) {
  const [form, setForm] = useState({
    name: food.name,
    category: food.category,
    price: String(food.price),
    status: food.status,
  });

  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const modalInputClass = (hasError?: boolean) =>
    `w-full bg-[#141416] border rounded-full px-4 py-2 text-sm text-white focus:outline-none mt-1 transition-colors ${
      hasError ? "border-red-500 focus:border-red-500" : "border-[#DCAE4D]/80 focus:border-[#DCAE4D]"
    }`;

  const categoryOptions = categories.map((c) => ({ value: c.name, label: c.name }));
  const statusOptions = [
    { value: "Mavjud", label: "Mavjud" },
    { value: "Mavjud emas", label: "Mavjud emas" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; price?: string } = {};

    if (!form.name.trim()) newErrors.name = "Taom nomini kiriting!";
    if (!form.price || isNaN(Number(form.price))) newErrors.price = "To‘g‘ri narx kiriting!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...food,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      status: form.status as Food["status"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Edit className="text-[#DCAE4D]" size={18} /> Taomni tahrirlash
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="p-4 space-y-4">
          <div>
            <label className="block text-xs text-gray-400">
              Taom nomi
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={modalInputClass(!!errors.name)}
              />
            </label>
            {errors.name && <p className="text-xs text-red-400 mt-1 pl-2">{errors.name}</p>}
          </div>

          <div className="block text-xs text-gray-400">
            <span className="mb-1 block">Kategoriya</span>
            <InlineCustomSelect
              options={categoryOptions}
              value={form.category}
              onChange={(val) => setForm({ ...form, category: val })}
              className="w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400">
              Narxi (so‘mda)
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9]/g, "") })}
                className={modalInputClass(!!errors.price)}
              />
            </label>
            {errors.price && <p className="text-xs text-red-400 mt-1 pl-2">{errors.price}</p>}
          </div>

          <div className="block text-xs text-gray-400">
            <span className="mb-1 block">Holati</span>
            <InlineCustomSelect
              options={statusOptions}
              value={form.status}
              onChange={(val) => setForm({ ...form, status: val as Food["status"] })}
              className="w-full mt-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-white/5 text-gray-300 cursor-pointer transition-colors">
              Bekor qilish
            </button>
            <button type="submit" className="px-4 py-2 bg-[#DCAE4D] hover:bg-[#c99b3c] text-black rounded-full text-xs font-semibold cursor-pointer transition-colors">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddCategoryModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Kategoriya nomini kiriting!");
      return;
    }
    onSubmit(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FolderPlus className="text-[#DCAE4D]" size={18} /> Yangi kategoriya qo‘shish
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="p-4 space-y-4">
          <label className="block text-xs text-gray-400">
            Kategoriya nomi
            <input
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="w-full bg-[#141416] border border-[#DCAE4D]/80 rounded-full px-4 py-2 text-sm text-white focus:outline-none mt-1"
              placeholder="Masalan: Milliy taomlar"
            />
          </label>
          {error && <p className="text-xs text-red-400 font-medium pl-2">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-white/5 text-gray-300 cursor-pointer transition-colors">
              Bekor qilish
            </button>
            <button type="submit" className="px-4 py-2 bg-[#DCAE4D] hover:bg-[#c99b3c] text-black rounded-full text-xs font-semibold cursor-pointer transition-colors">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddFoodModal({
  categories,
  form,
  onChange,
  onClose,
  onAdd,
}: {
  categories: Category[];
  form: NewFoodForm;
  onChange: (form: NewFoodForm) => void;
  onClose: () => void;
  onAdd: (food: NewFoodForm) => void;
}) {
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const modalInputClass = (hasError?: boolean) =>
    `w-full bg-[#141416] border rounded-full px-4 py-2 text-sm text-white focus:outline-none mt-1 transition-colors ${
      hasError ? "border-red-500 focus:border-red-500" : "border-[#DCAE4D]/80 focus:border-[#DCAE4D]"
    }`;

  const categoryOptions = categories.map((c) => ({ value: c.name, label: c.name }));
  const statusOptions = [
    { value: "Mavjud", label: "Mavjud" },
    { value: "Mavjud emas", label: "Mavjud emas" },
  ];

  const handlePriceChange = (val: string) => {
    const cleanValue = val.replace(/[^0-9]/g, "");
    onChange({ ...form, price: cleanValue });
    if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { name?: string; price?: string } = {};

    if (!form.name.trim()) newErrors.name = "Taom nomini kiriting!";
    if (!form.price) newErrors.price = "Taom narxini kiriting!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(form);
    onChange({
      name: "",
      category: categories[0]?.name || "Asosiy taomlar",
      price: "",
      status: "Mavjud",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <ChefHat className="text-[#DCAE4D]" size={18} />
            Yangi taom qo‘shish
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} noValidate className="p-4 space-y-4">
          <div>
            <label className="block text-xs text-gray-400">
              Taom nomi
              <input
                value={form.name}
                onChange={(event) => {
                  onChange({ ...form, name: event.target.value });
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={modalInputClass(!!errors.name)}
                placeholder="Masalan: Osh Palov"
              />
            </label>
            {errors.name && <p className="text-xs text-red-400 mt-1 pl-2">{errors.name}</p>}
          </div>

          <div className="block text-xs text-gray-400">
            <span className="mb-1 block">Kategoriya</span>
            <InlineCustomSelect
              options={categoryOptions}
              value={form.category || (categories[0]?.name ?? "")}
              onChange={(val) => onChange({ ...form, category: val })}
              className="w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400">
              Narxi (so‘mda)
              <input
                type="text"
                inputMode="numeric"
                value={form.price}
                onChange={(event) => handlePriceChange(event.target.value)}
                className={modalInputClass(!!errors.price)}
                placeholder="35000"
              />
            </label>
            {errors.price && <p className="text-xs text-red-400 mt-1 pl-2">{errors.price}</p>}
          </div>

          <div className="block text-xs text-gray-400">
            <span className="mb-1 block">Holati</span>
            <InlineCustomSelect
              options={statusOptions}
              value={form.status}
              onChange={(val) => onChange({ ...form, status: val as NewFoodForm["status"] })}
              className="w-full mt-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-white/5 text-gray-300 cursor-pointer transition-colors">
              Bekor qilish
            </button>
            <button type="submit" className="px-4 py-2 bg-[#DCAE4D] hover:bg-[#c99b3c] text-black rounded-full text-xs font-semibold cursor-pointer transition-colors">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ImportFoodModal({ file, onFileChange, onClose, onSubmit }: { file: File | null; onFileChange: (file: File | null) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FileSpreadsheet className="text-[#DCAE4D]" size={18} /> Taomlarni import qilish
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div className="border-2 border-dashed border-[#DCAE4D]/40 rounded-2xl p-6 text-center">
            <Upload className="mx-auto text-[#DCAE4D] mb-2" size={32} />
            <p className="text-xs text-gray-300">Excel yoki CSV faylni tanlang</p>
            <input id="manager-file-import" type="file" accept=".xlsx,.xls,.csv" onChange={(event) => onFileChange(event.target.files?.[0] || null)} className="hidden" />
            <label htmlFor="manager-file-import" className="mt-3 inline-block px-4 py-1.5 bg-[#DCAE4D]/10 hover:bg-[#DCAE4D]/20 text-xs text-[#DCAE4D] rounded-full cursor-pointer border border-[#DCAE4D]/40 transition-colors">
              Faylni tanlash
            </label>
          </div>
          {file && <p className="text-[#DCAE4D] text-xs truncate">Tanlandi: {file.name}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/5 cursor-pointer transition-colors">
              Bekor qilish
            </button>
            <button type="submit" disabled={!file} className="px-4 py-2 bg-[#DCAE4D] text-black rounded-full text-xs font-semibold disabled:opacity-50 cursor-pointer hover:bg-[#c99b3c] transition-colors">
              Importni boshlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}