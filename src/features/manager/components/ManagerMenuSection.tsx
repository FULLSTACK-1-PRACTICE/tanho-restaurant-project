import type { FormEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ArrowLeft,
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
  Clock,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { toast } from "sonner";
import type { Category, Food } from "../../../data/mockData";

type MenuFood = Omit<Food, "price"> & {
  preparationTime: number;
};

type MenuFoodForm = {
  name: string;
  category: string;
  preparationTime: string;
  status: Food["status"];
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "Asosiy taomlar" },
  { id: 2, name: "Salatlar" },
  { id: 3, name: "Ichimliklar" },
  { id: 4, name: "Dessertlar" },
  { id: 5, name: "Qo'shimchalar" },
];

const DEFAULT_FOODS: MenuFood[] = [
  {
    id: 1,
    name: "Osh Palov",
    category: "Asosiy taomlar",
    preparationTime: 15,
    status: "Mavjud",
  },
  {
    id: 2,
    name: "Shashlik",
    category: "Asosiy taomlar",
    preparationTime: 20,
    status: "Mavjud",
  },
];

type ManagerOutletContext = {
  headerSearch: string;
  onBack: () => void;
};

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

function convertFood(food: Food | MenuFood): MenuFood {
  const item = food as Food & { preparationTime?: number };

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    preparationTime:
      typeof item.preparationTime === "number" ? item.preparationTime : 15,
    status: item.status,
  };
}

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
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-[#141416] border border-[#83672F]/70 hover:border-[#C99B3C] rounded-full text-sm font-medium text-white transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C99B3C]"
      >
        <span className="truncate">{selectedOption?.label}</span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-[#C99B3C] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-[#161619] border border-[#83672F]/50 rounded-2xl shadow-2xl py-1.5 backdrop-blur-xl max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#141416] [&::-webkit-scrollbar-thumb]:bg-[#83672F]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                    ? "bg-[#83672F]/20 text-[#C99B3C] font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="truncate">{opt.label}</span>

                {isSelected && (
                  <Check
                    size={14}
                    className="text-[#C99B3C] shrink-0 ml-2"
                  />
                )}
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
  const { onBack } = useOutletContext<ManagerOutletContext>();

  const [internalFoods, setInternalFoods] = useState<MenuFood[]>(() => {
    const saved = localStorage.getItem("menu_foods");

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Food[];
        return parsed.map(convertFood);
      } catch (e) {
        console.error(e);
      }
    }

    return propsFoods && propsFoods.length > 0
      ? propsFoods.map(convertFood)
      : DEFAULT_FOODS;
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
    localStorage.setItem(
      "menu_categories",
      JSON.stringify(internalCategories)
    );
  }, [internalCategories]);

  const categories = internalCategories;

  const [internalSelectedCategory, setInternalSelectedCategory] =
    useState("Barchasi");

  const [internalStatusFilter, setInternalStatusFilter] =
    useState("Barchasi");

  const [internalSearchTerm, setInternalSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<MenuFood | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [importFile, setImportFile] = useState<File | null>(null);

  const [newFood, setNewFood] = useState<MenuFoodForm>({
    name: "",
    category: categories[0]?.name || "Asosiy taomlar",
    preparationTime: "",
    status: "Mavjud",
  });

  const selectedCategory =
    propsSelectedCategory ?? internalSelectedCategory;

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

  const handleCreateFood = (createdFood: MenuFoodForm) => {
    const item: MenuFood = {
      id: Date.now(),
      name: createdFood.name,
      category: createdFood.category,
      preparationTime: Number(createdFood.preparationTime),
      status: createdFood.status,
    };

    setInternalFoods((prev) => [item, ...prev]);
    toast.success("Taom qo‘shildi!");
  };

  const handleUpdateFood = (updatedFood: MenuFood) => {
    setInternalFoods((prev) =>
      prev.map((item) =>
        item.id === updatedFood.id ? updatedFood : item
      )
    );

    toast.success("Taom tahrirlandi!");
    setEditingFood(null);
  };

  const handleDelete = (id: number) => {
    setInternalFoods((prev) => prev.filter((item) => item.id !== id));
    onDeleteFood?.(id);
    toast.success("Taom o‘chirildi!");
  };

  const handleCreateCategory = (categoryName: string) => {
    const newCatObj: Category = {
      id: Date.now(),
      name: categoryName,
    };

    setInternalCategories((prev) => [...prev, newCatObj]);
    onAddCategorySubmit?.(categoryName);
    toast.success("Kategoriya qo‘shildi!");
  };

  const totalCount = foods.length;

  const availableCount = foods.filter(
    (food) => food.status === "Mavjud"
  ).length;

  const unavailableCount = foods.filter(
    (food) => food.status !== "Mavjud"
  ).length;

  const availablePercent = totalCount
    ? Math.round((availableCount / totalCount) * 100)
    : 0;

  const unavailablePercent = totalCount
    ? Math.round((unavailableCount / totalCount) * 100)
    : 0;

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "Barchasi" ||
      food.category === selectedCategory;

    const matchesStatus =
      statusFilter === "Barchasi" ||
      food.status === statusFilter;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const categorySelectOptions = [
    { value: "Barchasi", label: "Barchasi" },
    ...categories.map((c) => ({
      value: c.name,
      label: c.name,
    })),
  ];

  const statusSelectOptions = [
    { value: "Barchasi", label: "Barchasi (holat)" },
    { value: "Mavjud", label: "Mavjud" },
    { value: "Mavjud emas", label: "Mavjud emas" },
  ];

  return (
    <>
      <div className="space-y-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex sm:hidden items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={17} />
          <span>Orqaga qaytish</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={Utensils}
            iconBg="bg-[#83672F]/20"
            iconColor="text-[#C99B3C]"
            label="Jami taomlar"
            value={String(totalCount)}
            sub="+2 bu hafta"
            subColor="text-emerald-400"
          />

          <StatCard
            icon={ShoppingCart}
            iconBg="bg-emerald-500/15"
            iconColor="text-emerald-400"
            label="Mavjud taomlar"
            value={String(availableCount)}
            sub={`${availablePercent}%`}
            subColor="text-emerald-400"
          />

          <StatCard
            icon={ShoppingCart}
            iconBg="bg-red-500/15"
            iconColor="text-red-400"
            label="Mavjud emas"
            value={String(unavailableCount)}
            sub={`${unavailablePercent}%`}
            subColor="text-red-400"
          />

          <StatCard
            icon={ListTree}
            iconBg="bg-sky-500/15"
            iconColor="text-sky-400"
            label="Kategoriyalar"
            value={String(categories.length)}
            sub="Barchasi faol"
            subColor="text-gray-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#141416] border border-[#83672F] hover:border-[#C99B3C] text-[#C99B3C] text-sm font-semibold transition-all cursor-pointer"
          >
            <FolderPlus size={16} />
            Kategoriya qo‘shish
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C99B3C] hover:bg-[#b08732] text-black text-sm font-semibold transition-all cursor-pointer"
          >
            <Plus size={17} />
            Taom qo‘shish
          </button>

          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#141416] border border-[#83672F] hover:border-[#C99B3C] text-gray-200 text-sm font-semibold transition-all cursor-pointer"
          >
            <Upload size={16} />
            Import qilish
          </button>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <InlineCustomSelect
              options={categorySelectOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full md:w-56"
            />

            <InlineCustomSelect
              options={statusSelectOptions}
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full md:w-56"
            />

            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={searchTerm}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Taom nomi bo‘yicha qidirish..."
                className="w-full bg-[#141416] border border-[#83672F]/70 hover:border-[#C99B3C] focus:border-[#C99B3C] rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none placeholder-gray-500 transition-all"
              />
            </div>
          </div>

          <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#141416] [&::-webkit-scrollbar-thumb]:bg-[#83672F]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full text-sm text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wide bg-white/[0.01]">
                    <th className="px-4 py-3.5">#</th>
                    <th className="px-4 py-3.5">Taom nomi</th>
                    <th className="px-4 py-3.5">Kategoriya</th>
                    <th className="px-4 py-3.5">
                      Tayyorlanish vaqti
                    </th>
                    <th className="px-4 py-3.5">Holati</th>
                    <th className="px-4 py-3.5 text-right">
                      Amallar
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filteredFoods.map((food, index) => (
                    <tr
                      key={food.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 font-medium text-white">
                        {food.name}
                      </td>

                      <td className="px-4 py-3 text-gray-400">
                        {food.category}
                      </td>

                      <td className="px-4 py-3 text-[#C99B3C] font-semibold">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {food.preparationTime} min
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            food.status === "Mavjud"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
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

                          <button
                            type="button"
                            onClick={() => handleDelete(food.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredFoods.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-gray-500"
                      >
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
            toast.success("Import muvaffaqiyatli bajarildi!");
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
  food: MenuFood;
  onClose: () => void;
  onSave: (food: MenuFood) => void;
}) {
  const [form, setForm] = useState({
    name: food.name,
    category: food.category,
    preparationTime: String(food.preparationTime),
    status: food.status,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    preparationTime?: string;
  }>({});

  const hasChanges =
    form.name !== food.name ||
    form.category !== food.category ||
    form.preparationTime !== String(food.preparationTime) ||
    form.status !== food.status;

  const modalInputClass = (hasError?: boolean) =>
    `w-full bg-[#141416] border rounded-full px-4 py-2.5 text-sm text-white focus:outline-none mt-1 transition-colors ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-[#83672F]/70 focus:border-[#C99B3C]"
    }`;

  const categoryOptions = categories.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const statusOptions = [
    { value: "Mavjud", label: "Mavjud" },
    { value: "Mavjud emas", label: "Mavjud emas" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: {
      name?: string;
      preparationTime?: string;
    } = {};

    if (!form.name.trim()) {
      newErrors.name = "Taom nomini kiriting!";
    }

    if (
      !form.preparationTime ||
      isNaN(Number(form.preparationTime)) ||
      Number(form.preparationTime) <= 0
    ) {
      newErrors.preparationTime =
        "To‘g‘ri tayyorlanish vaqtini kiriting!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...food,
      name: form.name.trim(),
      category: form.category,
      preparationTime: Number(form.preparationTime),
      status: form.status as Food["status"],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Edit className="text-[#C99B3C]" size={18} />
            Taomni tahrirlash
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-4 space-y-4"
        >
          <div>
            <label className="block text-xs text-gray-400">
              Taom nomi

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className={modalInputClass(!!errors.name)}
              />
            </label>

            {errors.name && (
              <p className="text-xs text-red-400 mt-1 pl-2">
                {errors.name}
              </p>
            )}
          </div>

          <div className="block text-xs text-gray-400">
            <span className="mb-1 block">Kategoriya</span>

            <InlineCustomSelect
              options={categoryOptions}
              value={form.category}
              onChange={(val) =>
                setForm({
                  ...form,
                  category: val,
                })
              }
              className="w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400">
              Tayyorlanish vaqti (minut)

              <input
                type="text"
                inputMode="numeric"
                value={form.preparationTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    preparationTime: e.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ),
                  })
                }
                className={modalInputClass(
                  !!errors.preparationTime
                )}
                placeholder="15"
              />
            </label>

            {errors.preparationTime && (
              <p className="text-xs text-red-400 mt-1 pl-2">
                {errors.preparationTime}
              </p>
            )}
          </div>

          <div className="block text-xs text-gray-400">
            <span className="mb-1 block">Holati</span>

            <InlineCustomSelect
              options={statusOptions}
              value={form.status}
              onChange={(val) =>
                setForm({
                  ...form,
                  status: val as Food["status"],
                })
              }
              className="w-full mt-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-white/5 text-gray-300 cursor-pointer transition-colors"
            >
              Bekor qilish
            </button>

            <button
              type="submit"
              disabled={!hasChanges}
              className="px-4 py-2 bg-[#C99B3C] hover:bg-[#b08732] text-black rounded-full text-xs font-semibold cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#C99B3C]"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddCategoryModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (name: string) => void;
}) {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FolderPlus
              className="text-[#C99B3C]"
              size={18}
            />
            Yangi kategoriya qo‘shish
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-4 space-y-4"
        >
          <label className="block text-xs text-gray-400">
            Kategoriya nomi

            <input
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              className="w-full bg-[#141416] border border-[#83672F]/70 focus:border-[#C99B3C] rounded-full px-4 py-2.5 text-sm text-white focus:outline-none mt-1 transition-colors"
              placeholder="Masalan: Milliy taomlar"
            />
          </label>

          {error && (
            <p className="text-xs text-red-400 font-medium pl-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-white/5 text-gray-300 cursor-pointer transition-colors"
            >
              Bekor qilish
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#C99B3C] hover:bg-[#b08732] text-black rounded-full text-xs font-semibold cursor-pointer transition-colors"
            >
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
  form: MenuFoodForm;
  onChange: (form: MenuFoodForm) => void;
  onClose: () => void;
  onAdd: (food: MenuFoodForm) => void;
}) {
  const [errors, setErrors] = useState<{
    name?: string;
    preparationTime?: string;
  }>({});

  const modalInputClass = (hasError?: boolean) =>
    `w-full bg-[#141416] border rounded-full px-4 py-2.5 text-sm text-white focus:outline-none mt-1 transition-colors ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-[#83672F]/70 focus:border-[#C99B3C]"
    }`;

  const categoryOptions = categories.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const statusOptions = [
    { value: "Mavjud", label: "Mavjud" },
    { value: "Mavjud emas", label: "Mavjud emas" },
  ];

  const handleTimeChange = (val: string) => {
    const cleanValue = val.replace(/[^0-9]/g, "");

    onChange({
      ...form,
      preparationTime: cleanValue,
    });

    if (errors.preparationTime) {
      setErrors((prev) => ({
        ...prev,
        preparationTime: "",
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: {
      name?: string;
      preparationTime?: string;
    } = {};

    if (!form.name.trim()) {
      newErrors.name = "Taom nomini kiriting!";
    }

    if (
      !form.preparationTime ||
      Number(form.preparationTime) <= 0
    ) {
      newErrors.preparationTime =
        "Tayyorlanish vaqtini kiriting!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(form);

    onChange({
      name: "",
      category: categories[0]?.name || "Asosiy taomlar",
      preparationTime: "",
      status: "Mavjud",
    });

    onClose();
  };

  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
  onClick={onClose}
>
  <div
    className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
    onClick={(event) => event.stopPropagation()}
  >
    <div className="flex items-center justify-between p-4 border-b border-white/5">
      <h3 className="text-base font-semibold text-white flex items-center gap-2">
        <ChefHat
          className="text-[#C99B3C]"
          size={18}
        />
        Yangi taom qo‘shish
      </h3>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-white cursor-pointer transition-colors"
      >
        <X size={18} />
      </button>
    </div>

    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="p-4 space-y-4"
    >
      <div>
        <label className="block text-xs text-gray-400">
          Taom nomi

          <input
            value={form.name}
            onChange={(event) => {
              onChange({
                ...form,
                name: event.target.value,
              });

              if (errors.name) {
                setErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }
            }}
            className={modalInputClass(!!errors.name)}
            placeholder="Masalan: Osh Palov"
          />
        </label>

        {errors.name && (
          <p className="text-xs text-red-400 mt-1 pl-2">
            {errors.name}
          </p>
        )}
      </div>

      <div className="block text-xs text-gray-400">
        <span className="mb-1 block">
          Kategoriya
        </span>

        <InlineCustomSelect
          options={categoryOptions}
          value={
            form.category ||
            (categories[0]?.name ?? "")
          }
          onChange={(val) =>
            onChange({
              ...form,
              category: val,
            })
          }
          className="w-full mt-1"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400">
          Tayyorlanish vaqti (minut)

          <input
            type="text"
            inputMode="numeric"
            value={form.preparationTime}
            onChange={(event) =>
              handleTimeChange(event.target.value)
            }
            className={modalInputClass(
              !!errors.preparationTime
            )}
            placeholder="15"
          />
        </label>

        {errors.preparationTime && (
          <p className="text-xs text-red-400 mt-1 pl-2">
            {errors.preparationTime}
          </p>
        )}
      </div>

      <div className="block text-xs text-gray-400">
        <span className="mb-1 block">
          Holati
        </span>

        <InlineCustomSelect
          options={statusOptions}
          value={form.status}
          onChange={(val) =>
            onChange({
              ...form,
              status: val as Food["status"],
            })
          }
          className="w-full mt-1"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-white/5 text-gray-300 cursor-pointer transition-colors"
        >
          Bekor qilish
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-[#C99B3C] hover:bg-[#b08732] text-black rounded-full text-xs font-semibold cursor-pointer transition-colors"
        >
          Saqlash
        </button>
      </div>
    </form>
  </div>
</div>
  );
}

function ImportFoodModal({
  file,
  onFileChange,
  onClose,
  onSubmit,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FileSpreadsheet
              className="text-[#C99B3C]"
              size={18}
            />
            Taomlarni import qilish
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-4 space-y-4"
        >
          <div className="border-2 border-dashed border-[#83672F]/50 hover:border-[#C99B3C] rounded-2xl p-6 text-center transition-colors">
            <Upload
              className="mx-auto text-[#C99B3C] mb-2"
              size={32}
            />

            <p className="text-xs text-gray-300">
              Excel yoki CSV faylni tanlang
            </p>

            <input
              id="manager-file-import"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0] || null;
                onFileChange(selectedFile);

                if (selectedFile) {
                  toast.success("Fayl tanlandi!");
                }
              }}
              className="hidden"
            />

            <label
              htmlFor="manager-file-import"
              className="mt-3 inline-block px-4 py-1.5 bg-[#83672F]/20 hover:bg-[#83672F]/40 text-xs text-[#C99B3C] font-medium rounded-full cursor-pointer border border-[#83672F]/60 transition-colors"
            >
              Faylni tanlash
            </label>
          </div>

          {file && (
            <p className="text-[#C99B3C] text-xs truncate">
              Tanlandi: {file.name}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/5 cursor-pointer transition-colors"
            >
              Bekor qilish
            </button>

            <button
              type="submit"
              disabled={!file}
              className="px-4 py-2 bg-[#C99B3C] text-black rounded-full text-xs font-semibold disabled:opacity-50 cursor-pointer hover:bg-[#b08732] transition-colors"
            >
              Importni boshlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
