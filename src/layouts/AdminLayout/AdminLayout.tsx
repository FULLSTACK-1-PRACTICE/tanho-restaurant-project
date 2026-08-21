import { useState, useCallback, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
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
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  ShoppingBag,
  DollarSign,
  PackageSearch,
  CheckCircle2,
  Receipt,
  Table2,
} from "lucide-react";
import {
  calculateBillTotals,
  type Bill,
  type RestaurantTable,
} from "../../types/restaurant";
import { DashboardNavbar } from "../../components/common/DashboardNavbar";
import { SideBar, type SidebarItem } from "../../components/common/SideBar";


// Admin panelni ataylab tark etganimizni "eslab qolish" uchun bayroq.
// Bu true bo'lsa va foydalanuvchi brauzerning orqaga/oldinga tugmasi orqali
// qaytadan /admin manziliga kelib qolsa — panelni ko'rsatmay, login sahifasiga yuboramiz.
const ADMIN_LEFT_FLAG = "tanho_admin_left";

/* ============================================================
   1) UMUMIY CRUD HOOK
   ============================================================ */
const STATIC_DATA: Record<string, any[]> = {
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

function useCrud<T extends { id?: string }>(collectionName: string) {
  const [items, setItems] = useState<T[]>(
    () => [...(STATIC_DATA[collectionName] ?? [])] as T[]
  );

  const loading = false;

  const add = useCallback(
    async (data: Omit<T, "id">) => {
      setItems((current) => [
        ...current,
        {
          ...data,
          id: `${collectionName}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
        } as T,
      ]);
    },
    [collectionName]
  );

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, ...data, id } : item
        )
      );
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    loading,
    add,
    update,
    remove,
  };
}

function fileToBase64(
  file: File,
  maxWidth = 900,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);

        const canvas = document.createElement("canvas");

        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Canvas yaratib bo'lmadi"));
        }

        ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = () =>
        reject(new Error("Rasmni o'qib bo'lmadi"));

      img.src = reader.result as string;
    };

    reader.onerror = () =>
      reject(new Error("Faylni o'qib bo'lmadi"));

    reader.readAsDataURL(file);
  });
}

/* ============================================================
   2) NAVIGATSIYA RO'YXATI
   ============================================================ */
type SectionKey =
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

const adminSidebarItems: SidebarItem[] = [
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

/* ============================================================
   3) GENERIC CRUD JADVAL
   ============================================================ */
interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "select" | "date";
  options?: string[];
}

function GenericCrudSection({
  title,
  collectionName,
  fields,
  addLabel,
}: {
  title: string;
  collectionName: string;
  fields: FieldConfig[];
  addLabel: string;
}) {
  const {
    items,
    loading,
    add,
    update,
    remove,
  } = useCrud<any>(collectionName);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] =
    useState<string | null>(null);
  const [form, setForm] =
    useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const emptyForm = () =>
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.key]:
          field.type === "number"
            ? 0
            : field.type === "select"
            ? field.options?.[0] ?? ""
            : "",
      }),
      {}
    );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setForm(item);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      if (editingId) {
        await update(editingId, form);
      } else {
        await add(form);
      }

      setModalOpen(false);
    } catch (e) {
      alert(
        "Xatolik: " +
          (e instanceof Error ? e.message : "Noma'lum xatolik")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("O'chirishni tasdiqlaysizmi?")) {
      await remove(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-400">
            Jami: {items.length}
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
            <Loader2
              className="animate-spin"
              size={18}
            />
            Yuklanmoqda...
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            Ma'lumot topilmadi
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                {fields.map((field) => (
                  <th
                    key={field.key}
                    className="p-4 font-normal"
                  >
                    {field.label}
                  </th>
                ))}

                <th className="p-4 font-normal">
                  Amallar
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5"
                >
                  {fields.map((field) => (
                    <td
                      key={field.key}
                      className="p-4"
                    >
                      {field.type === "number"
                        ? Number(
                            item[field.key] ?? 0
                          ).toLocaleString()
                        : String(
                            item[field.key] ?? ""
                          )}
                    </td>
                  ))}

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="cursor-pointer rounded-lg p-1.5 text-gray-300 hover:bg-white/10"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="cursor-pointer rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#121619] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId ? "Tahrirlash" : addLabel}
              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs text-gray-400">
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={form[field.key] ?? ""}
                      onChange={(e) =>
                        setForm((state) => ({
                          ...state,
                          [field.key]:
                            e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                    >
                      {field.options?.map(
                        (option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <input
                      type={
                        field.type === "number"
                          ? "number"
                          : field.type === "date"
                          ? "date"
                          : "text"
                      }
                      value={form[field.key] ?? ""}
                      onChange={(e) =>
                        setForm((state) => ({
                          ...state,
                          [field.key]:
                            field.type === "number"
                              ? Number(
                                  e.target.value
                                )
                              : e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                )}
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   4) RASMLI BO'LIMLAR
   ============================================================ */
function MediaCrudSection({
  title,
  collectionName,
  addLabel,
}: {
  title: string;
  collectionName: string;
  addLabel: string;
}) {
  const {
    items,
    loading,
    add,
    update,
    remove,
  } = useCrud<any>(collectionName);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] = useState<{
    title: string;
    content: string;
    image: string;
  }>({
    title: "",
    content: "",
    image: "",
  });

  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditingId(null);

    setForm({
      title: "",
      content: "",
      image: "",
    });

    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);

    setForm({
      title: item.title ?? "",
      content: item.content ?? "",
      image: item.image ?? "",
    });

    setModalOpen(true);
  };

  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const base64String =
        await fileToBase64(file);

      setForm((state) => ({
        ...state,
        image: base64String,
      }));
    } catch (error) {
      alert(
        "Rasmni yuklashda xatolik: " +
          (error instanceof Error
            ? error.message
            : "Noma'lum xatolik")
      );
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      alert("Sarlavhani kiriting");
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await update(editingId, form);
      } else {
        await add(form);
      }

      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {title}
          </h1>

          <p className="text-sm text-gray-400">
            Jami: {items.length}
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2
            className="animate-spin"
            size={18}
          />
          Yuklanmoqda...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121619] p-10 text-center text-gray-400">
          Ma'lumot topilmadi
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#121619]"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                  {item.content}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() =>
                      openEdit(item)
                    }
                    className="cursor-pointer rounded-lg p-1.5 text-gray-300 hover:bg-white/10"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() =>
                      confirm(
                        "O'chirishni tasdiqlaysizmi?"
                      ) && remove(item.id)
                    }
                    className="cursor-pointer rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#121619] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId
                  ? "Tahrirlash"
                  : addLabel}
              </h2>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer"
              >
                <X
                  size={20}
                  className="text-gray-400"
                />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Rasm
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="text-xs"
                />

                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-2 h-24 w-24 rounded-lg object-cover"
                  />
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Sarlavha
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Matn
                </label>

                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      content: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                )}
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   5) MENYU
   ============================================================ */
interface MenuItem {
  id?: string;
  name: string;
  category: string;
  price: number;
  status: "Mavjud" | "Mavjud emas";
  image?: string;
  description?: string;
}

const MENU_CATEGORIES = [
  "Osh",
  "Grill",
  "Salatlar",
  "Milliy taomlar",
  "Shashliklar",
  "Ichimliklar",
  "Desertlar",
];

function MenuAdminSection() {
  const {
    items,
    loading,
    add,
    update,
    remove,
  } = useCrud<MenuItem>("menu");

  const [tab, setTab] = useState<
    "all" | "available" | "unavailable"
  >("all");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<MenuItem>({
      name: "",
      category: MENU_CATEGORIES[0],
      price: 0,
      status: "Mavjud",
      image: "",
      description: "",
    });

  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] =
    useState(false);

  const filtered = items.filter((item) => {
    if (tab === "available") {
      return item.status === "Mavjud";
    }

    if (tab === "unavailable") {
      return item.status === "Mavjud emas";
    }

    return true;
  });

  const openAdd = () => {
    setEditingId(null);

    setForm({
      name: "",
      category: MENU_CATEGORIES[0],
      price: 0,
      status: "Mavjud",
      image: "",
      description: "",
    });

    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingId(item.id!);
    setForm(item);
    setModalOpen(true);
  };

  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageUploading(true);

    try {
      const base64 =
        await fileToBase64(file);

      setForm((state) => ({
        ...state,
        image: base64,
      }));
    } catch (error) {
      alert(
        "Rasmni yuklashda xatolik: " +
          (error instanceof Error
            ? error.message
            : "Noma'lum xatolik")
      );
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) {
      alert("Taom nomi va narxini kiriting");
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await update(editingId, form);
      } else {
        await add(form);
      }

      setModalOpen(false);
    } catch (error) {
      alert(
        "Saqlashda xatolik: " +
          (error instanceof Error
            ? error.message
            : "Noma'lum xatolik")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Taomni o'chirishni tasdiqlaysizmi?"
      )
    ) {
      await remove(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Menyu boshqaruvi
          </h1>

          <p className="text-sm text-gray-400">
            Jami taomlar: {items.length}
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} />
          Taom qo'shish
        </button>
      </div>

      <div className="flex gap-2 border-b border-white/10 text-sm">
        {[
          {
            key: "all",
            label: `Barcha taomlar (${items.length})`,
          },
          {
            key: "available",
            label: `Mavjud (${
              items.filter(
                (item) =>
                  item.status === "Mavjud"
              ).length
            })`,
          },
          {
            key: "unavailable",
            label: `Mavjud emas (${
              items.filter(
                (item) =>
                  item.status === "Mavjud emas"
              ).length
            })`,
          },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setTab(
                item.key as
                  | "all"
                  | "available"
                  | "unavailable"
              )
            }
            className={`cursor-pointer border-b-2 px-3 py-2 transition-colors ${
              tab === item.key
                ? "border-[#d9a441] text-[#e5ad45]"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
            <Loader2
              className="animate-spin"
              size={18}
            />
            Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            Taomlar topilmadi
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="p-4 font-normal">
                  Taom nomi
                </th>
                <th className="p-4 font-normal">
                  Kategoriya
                </th>
                <th className="p-4 font-normal">
                  Narxi
                </th>
                <th className="p-4 font-normal">
                  Holat
                </th>
                <th className="p-4 font-normal">
                  Amallar
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5"
                >
                  <td className="flex items-center gap-3 p-4">
                    <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#191e22]">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4">
                    {item.price.toLocaleString()} so'm
                  </td>

                  <td className="p-4">
                    <span
                      className={
                        item.status === "Mavjud"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          openEdit(item)
                        }
                        className="cursor-pointer rounded-lg p-1.5 text-gray-300 hover:bg-white/10"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id!)
                        }
                        className="cursor-pointer rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#121619] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId
                  ? "Taomni tahrirlash"
                  : "Yangi taom qo'shish"}
              </h2>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Rasm
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="text-xs"
                  disabled={imageUploading}
                />

                {imageUploading && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                    Rasm ishlanmoqda...
                  </div>
                )}

                {!imageUploading &&
                  form.image && (
                    <img
                      src={form.image}
                      alt="preview"
                      className="mt-2 h-24 w-24 rounded-lg object-cover"
                    />
                  )}
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Taom nomi
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Tavsif (ixtiyoriy)
                </label>

                <input
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      description:
                        e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Kategoriya
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      category: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                >
                  {MENU_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Narxi (so'm)
                </label>

                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      price: Number(
                        e.target.value
                      ),
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Holat
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      status:
                        e.target.value as MenuItem["status"],
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                >
                  <option value="Mavjud">
                    Mavjud
                  </option>
                  <option value="Mavjud emas">
                    Mavjud emas
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleSave}
                disabled={
                  saving || imageUploading
                }
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                )}
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   5.5) STOLLAR
   ============================================================ */
type TableRow = RestaurantTable;

function TablesAdminSection() {
  const {
    items: tables,
    loading,
    add,
    update,
    remove,
  } = useCrud<TableRow>("tables");

  const [waiterFeePercent] =
    useState(10);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] = useState<{
    number: string;
    seats: number;
  }>({
    number: "",
    seats: 2,
  });

  const [saving, setSaving] =
    useState(false);

  const [bills] = useState<
    Record<string, Bill>
  >({});

  const openAdd = () => {
    setEditingId(null);

    setForm({
      number: "",
      seats: 2,
    });

    setModalOpen(true);
  };

  const openEdit = (table: TableRow) => {
    setEditingId(table.id);

    setForm({
      number: String(table.number),
      seats: table.seats ?? 2,
    });

    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.number.trim()) {
      alert("Stol raqamini kiriting");
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await update(editingId, {
          number: form.number,
          seats: form.seats,
        } as Partial<TableRow>);
      } else {
        await add({
          number: form.number,
          seats: form.seats,
          status: "Bo'sh",
        } as Omit<TableRow, "id">);
      }

      setModalOpen(false);
    } catch (error) {
      alert(
        "Xatolik: " +
          (error instanceof Error
            ? error.message
            : "Noma'lum xatolik")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Stolni o'chirishni tasdiqlaysizmi?"
      )
    ) {
      await remove(id);
    }
  };

  const handleCloseBill = async (
    table: TableRow
  ) => {
    if (
      !confirm(
        `${table.number}-stol: hisob yopilib, "to'landi" deb belgilansinmi?`
      )
    ) {
      return;
    }

    try {
      await update(table.id, {
        status: "Bo'sh",
        reservedAt: "",
        reservedDate: "",
        reservedBy: "",
      } as Partial<TableRow>);
    } catch (error) {
      alert(
        "Xatolik: " +
          (error instanceof Error
            ? error.message
            : "Noma'lum xatolik")
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Stollar
          </h1>

          <p className="text-sm text-gray-400">
            Jami: {tables.length}
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} />
          Stol qo'shish
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
          <Loader2
            className="animate-spin"
            size={18}
          />
          Yuklanmoqda...
        </div>
      ) : tables.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121619] p-10 text-center text-gray-400">
          Stollar topilmadi
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => {
            const bill =
              bills[String(table.number)];

            const totals = bill
              ? calculateBillTotals(
                  bill.items,
                  waiterFeePercent
                )
              : null;

            const isFree =
              table.status === "Bo'sh";

            return (
              <div
                key={table.id}
                className={`rounded-xl border p-5 ${
                  isFree
                    ? "border-white/10 bg-[#121619]"
                    : "border-red-500/30 bg-red-500/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Table2
                      size={18}
                      className={
                        isFree
                          ? "text-gray-400"
                          : "text-red-400"
                      }
                    />

                    <span className="text-base font-semibold">
                      {table.number}-stol
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      isFree
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {table.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  {table.seats ?? 2} o'rin
                </p>

                {!isFree &&
                  (table.reservedAt ||
                    table.reservedBy) && (
                    <p className="mt-2 text-xs text-gray-400">
                      Band:{" "}
                      {table.reservedBy ||
                        "Mehmon"}{" "}
                      {table.reservedAt
                        ? `— ${table.reservedAt}`
                        : ""}
                    </p>
                  )}

                {bill && totals && (
                  <div className="mt-3 rounded-lg border border-white/10 bg-[#0d1114] p-3 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Receipt size={13} />
                      Joriy shot
                    </div>

                    <div className="mt-1 flex justify-between text-gray-300">
                      <span>
                        Taomlar
                      </span>

                      <span>
                        {totals.itemsTotal.toLocaleString()}{" "}
                        so'm
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span>
                        Afitsiant (
                        {waiterFeePercent}%)
                      </span>

                      <span>
                        {totals.waiterFee.toLocaleString()}{" "}
                        so'm
                      </span>
                    </div>

                    <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-semibold text-[#e5ad45]">
                      <span>Jami</span>

                      <span>
                        {totals.grandTotal.toLocaleString()}{" "}
                        so'm
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() =>
                      openEdit(table)
                    }
                    className="cursor-pointer rounded-lg border border-white/10 p-2 text-gray-300 hover:bg-white/10"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(table.id)
                    }
                    className="cursor-pointer rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                  </button>

                  {!isFree && (
                    <button
                      onClick={() =>
                        handleCloseBill(table)
                      }
                      className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#d9a441] px-3 py-2 text-xs font-medium text-black hover:bg-[#edbd58]"
                    >
                      <CheckCircle2 size={14} />

                      {bill
                        ? "To'landi, shot yopildi"
                        : "Bandlikni bekor qilish"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#121619] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId
                  ? "Stolni tahrirlash"
                  : "Stol qo'shish"}
              </h2>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Stol raqami
                </label>

                <input
                  value={form.number}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      number: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  O'rindiqlar soni
                </label>

                <input
                  type="number"
                  value={form.seats}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      seats: Number(
                        e.target.value
                      ),
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                )}
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   6) DASHBOARD
   ============================================================ */
function DashboardSection({
  goTo,
}: {
  goTo: (section: SectionKey) => void;
}) {
  const stats = [
    {
      label: "Jami buyurtmalar",
      value: "0",
      change: "0% bu hafta",
      icon: ShoppingBag,
      bg: "bg-purple-500/20",
      color: "text-purple-400",
    },
    {
      label: "Jami daromad",
      value: "0 so'm",
      change: "0% bu hafta",
      icon: DollarSign,
      bg: "bg-green-500/20",
      color: "text-green-400",
    },
    {
      label: "Rezervatsiyalar",
      value: "0",
      change: "0% bu hafta",
      icon: CalendarCheck,
      bg: "bg-blue-500/20",
      color: "text-blue-400",
    },
    {
      label: "Faol mijozlar",
      value: "0",
      change: "0% bu hafta",
      icon: Users,
      bg: "bg-red-500/20",
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-[#121619] p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon
                  size={20}
                  className={stat.color}
                />
              </div>

              <div>
                <div className="text-xs text-gray-400">
                  {stat.label}
                </div>

                <div className="text-xl font-semibold">
                  {stat.value}
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#121619] p-5">
        <h2 className="mb-4 text-base font-semibold">
          Tezkor amallar
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            onClick={() => goTo("menyu")}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <Plus
              className="text-[#d9a441]"
              size={22}
            />
            Taom qo'shish
          </button>

          <button
            onClick={() =>
              goTo("buyurtmalar")
            }
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <PackageSearch
              className="text-green-400"
              size={22}
            />
            Buyurtmalar
          </button>

          <button
            onClick={() =>
              goTo("rezervatsiyalar")
            }
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <CalendarCheck
              className="text-blue-400"
              size={22}
            />
            Rezervatsiya
          </button>

          <button
            onClick={() =>
              goTo("hisobotlar")
            }
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <BarChart3
              className="text-red-400"
              size={22}
            />
            Hisobotlar
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        * Statistikalar hozircha statik ko'rsatilgan — API ulanganda real raqamlar bilan almashtiriladi.
      </p>
    </div>
  );
}

/* ============================================================
   7) HISOBOTLAR
   ============================================================ */
function ReportsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Hisobotlar
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          "Kunlik hisobot",
          "Haftalik hisobot",
          "Oylik hisobot",
        ].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-[#121619] p-6"
          >
            <h3 className="font-semibold">
              {title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Daromad: 0 so'm
            </p>

            <p className="text-sm text-gray-400">
              Buyurtmalar: 0
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        * Bu bo'lim API ulanganda real ma'lumotlar bilan to'ldiriladi.
      </p>
    </div>
  );
}

/* ============================================================
   8) PROFIL
   ============================================================ */
function ProfileSection() {
  const [name, setName] =
    useState("Admin");

  const [phone, setPhone] =
    useState("");

  const [photo, setPhoto] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const handlePhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setPhoto(
        await fileToBase64(file)
      );
    } catch (error) {
      alert(
        "Rasmni yuklashda xatolik: " +
          (error instanceof Error
            ? error.message
            : "Noma'lum xatolik")
      );
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      alert("Saqlandi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold">
        Profil
      </h1>

      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-[#191e22]">
            {photo && (
              <img
                src={photo}
                alt="Profil"
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="text-xs"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Ism
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Telefon
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saqlanmoqda..."
            : "Saqlash"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   9) SOZLAMALAR
   ============================================================ */
function SettingsSection() {
  const [restaurantName, setRestaurantName] =
    useState("TANHO Restaurant");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [waiterFeePercent, setWaiterFeePercent] =
    useState(10);

  const [saving, setSaving] =
    useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      alert("Sozlamalar saqlandi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold">
        Sozlamalar
      </h1>

      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Restoran nomi
          </label>

          <input
            value={restaurantName}
            onChange={(e) =>
              setRestaurantName(
                e.target.value
              )
            }
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Manzil
          </label>
          <input
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Telefon
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Afitsiant (xizmat) haqi — umumiy shotdan foiz (%)
          </label>

          <input
            type="number"
            min={0}
            max={100}
            value={waiterFeePercent}
            onChange={(e) =>
              setWaiterFeePercent(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />

          <p className="mt-1 text-[11px] text-gray-500">
            Har bir mijozning shotiga shu foiz avtomatik qo'shiladi.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saqlanmoqda..."
            : "Saqlash"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   10) ASOSIY ADMIN LAYOUT
   ============================================================ */
const AdminLayout = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  // Agar bu tabda admin panel avval (logout yoki boshqa yo'l bilan) tark
  // etilgan bo'lsa va hozirgi kelish aynan brauzer strelkasi (POP) orqali
  // bo'lsa — demak foydalanuvchi orqaga/oldinga tugmasi bilan qaytmoqchi.
  // Bunday holatda admin panelni ko'rsatmasdan darhol chetga yo'naltiramiz.
  const [allowed] = useState(() => {
    const alreadyLeft = sessionStorage.getItem(ADMIN_LEFT_FLAG) === "true";
    if (navigationType === "POP" && alreadyLeft) return false;
    sessionStorage.removeItem(ADMIN_LEFT_FLAG);
    return true;
  });

  useEffect(() => {
    if (!allowed) navigate("/", { replace: true });
  }, [allowed, navigate]);

  // Admin sahifasida turilgan vaqtda strelkalar (orqaga ham, oldinga ham)
  // hech qaerga olib ketmasin — har bir popstate hodisasida joriy URL
  // qayta "push" qilinadi, shuning uchun sahifa joyida qotib qoladi.
  // Bu yerdan chiqishning yagona yo'li — "Chiqish" tugmasi (pastda).
  useEffect(() => {
    if (!allowed) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allowed]);

  // Komponent har qanday sababdan (Chiqish tugmasi, boshqa URL orqali
  // ketish va h.k.) DOM'dan olib tashlansa — "tark etildi" deb belgilaymiz.
  // Shundan keyin bu yerga POP (strelka) orqali qaytishga urinish
  // yuqoridagi tekshiruvda bloklanadi.
  useEffect(() => {
    if (!allowed) return;
    return () => {
      sessionStorage.setItem(ADMIN_LEFT_FLAG, "true");
    };
  }, [allowed]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState<SectionKey>("dashboard");

  const handleLogout = () => {
    if (confirm("Tizimdan chiqishni tasdiqlaysizmi?")) {
      localStorage.removeItem("admin_session");
      navigate("/", { replace: true });
    }
  };

  const renderSection = () => {
    switch (active) {
      case "dashboard":
      case "bosh-sahifa":
        return (
          <DashboardSection
            goTo={setActive}
          />
        );

      case "menyu":
      case "taomlar":
      case "kategoriyalar":
      case "qoshimchalar":
        return <MenuAdminSection />;

      case "buyurtmalar":
        return (
          <GenericCrudSection
            title="Buyurtmalar"
            collectionName="orders"
            addLabel="Buyurtma qo'shish"
            fields={[
              {
                key: "customer",
                label: "Mijoz",
              },
              {
                key: "table",
                label: "Stol",
              },
              {
                key: "itemsCount",
                label: "Taomlar soni",
                type: "number",
              },
              {
                key: "total",
                label: "Summa",
                type: "number",
              },
              {
                key: "time",
                label: "Vaqt",
              },
              {
                key: "status",
                label: "Holat",
                type: "select",
                options: [
                  "Yangi",
                  "Tayyorlanmoqda",
                  "Tayyorlandi",
                ],
              },
            ]}
          />
        );

      case "rezervatsiyalar":
        return (
          <GenericCrudSection
            title="Rezervatsiyalar"
            collectionName="reservations"
            addLabel="Rezervatsiya qo'shish"
            fields={[
              {
                key: "customer",
                label: "Mijoz",
              },
              {
                key: "table",
                label: "Stol",
              },
              {
                key: "date",
                label: "Sana",
                type: "date",
              },
              {
                key: "time",
                label: "Vaqt",
              },
              {
                key: "guests",
                label: "Mehmonlar soni",
                type: "number",
              },
              {
                key: "status",
                label: "Holat",
                type: "select",
                options: [
                  "Kutilmoqda",
                  "Tasdiqlangan",
                  "Bekor qilingan",
                ],
              },
            ]}
          />
        );

      case "stollar":
        return <TablesAdminSection />;

      case "mijozlar":
        return (
          <GenericCrudSection
            title="Mijozlar"
            collectionName="customers"
            addLabel="Mijoz qo'shish"
            fields={[
              {
                key: "name",
                label: "F.I.Sh",
              },
              {
                key: "phone",
                label: "Telefon",
              },
              {
                key: "ordersCount",
                label: "Buyurtmalar soni",
                type: "number",
              },
              {
                key: "totalSpent",
                label: "Jami xarajat",
                type: "number",
              },
            ]}
          />
        );

      case "yangiliklar":
        return (
          <MediaCrudSection
            title="Yangiliklar"
            collectionName="news"
            addLabel="Yangilik qo'shish"
          />
        );

      case "maqolalar":
        return (
          <MediaCrudSection
            title="Maqolalar"
            collectionName="articles"
            addLabel="Maqola qo'shish"
          />
        );

      case "xodimlar":
        return (
          <GenericCrudSection
            title="Xodimlar"
            collectionName="staff"
            addLabel="Xodim qo'shish"
            fields={[
              {
                key: "name",
                label: "F.I.Sh",
              },
              {
                key: "role",
                label: "Lavozimi",
              },
              {
                key: "phone",
                label: "Telefon",
              },
            ]}
          />
        );

      case "hisobotlar":
      case "eslatmalar":
        return <ReportsSection />;

      case "profil":
        return <ProfileSection />;

      case "sozlamalar":
        return <SettingsSection />;

      default:
        return null;
    }
  };
   if (!allowed) {
    // Yo'naltirish amalga oshguncha hech narsa chizmaymiz
    return null;
  }


  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0e10] text-white">
      <SideBar
        items={adminSidebarItems}
        isOpen={sidebarOpen}
        activePath={active}
        onItemClick={(path) => setActive(path as SectionKey)}
        onLogout={handleLogout}
      />

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <DashboardNavbar
          title="Admin Dashboard"
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
          onLogout={handleLogout}
          onProfileClick={() => setActive("profil")}
          onSettingsClick={() => setActive("sozlamalar")}
          onNavigate={(page) => setActive(page as SectionKey)}
          user={{
            name: "Admin",
            role: "Administrator",
          }}
        />

        <main className="flex-1 overflow-y-auto overscroll-contain p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;