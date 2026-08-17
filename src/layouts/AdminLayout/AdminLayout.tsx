import { useEffect, useState, useCallback } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  CalendarCheck,
  Table2,
  Users,
  Newspaper,
  FileText,
  UserCog,
  BarChart3,
  UserCircle,
  Settings as SettingsIcon,
  LogOut,
  Menu as MenuIcon,
  Search,
  Bell,
  ChevronDown,
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
} from "lucide-react";
import { calculateBillTotals, type Bill, type RestaurantTable } from "../../types/restaurant";

/* ============================================================
   1) UMUMIY FIRESTORE CRUD HOOK (barcha bo'limlar shundan foydalanadi)
   ============================================================ */
function useCrud<T extends { id?: string }>(collectionName: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[]);
        setLoading(false);
      },
      () => {
        // orderBy maydoni topilmasa fallback oddiy o'qish
        onSnapshot(collection(db, collectionName), (snap) => {
          setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[]);
          setLoading(false);
        });
      }
    );
    return () => unsub();
  }, [collectionName]);

  const add = useCallback(
    async (data: Omit<T, "id">) => {
      await addDoc(collection(db, collectionName), { ...data, createdAt: Date.now() });
    },
    [collectionName]
  );

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      await updateDoc(doc(db, collectionName, id), { ...data } as { [key: string]: any });
    },
    [collectionName]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, collectionName, id));
    },
    [collectionName]
  );

  return { items, loading, add, update, remove };
}

function fileToBase64(file: File, maxWidth = 900, quality = 0.75): Promise<string> {
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
        if (!ctx) return reject(new Error("Canvas yaratib bo'lmadi"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Rasmni o'qib bo'lmadi"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Faylni o'qib bo'lmadi"));
    reader.readAsDataURL(file);
  });
}

/* ============================================================
   2) NAVIGATSIYA RO'YXATI
   ============================================================ */
type SectionKey =
  | "dashboard"
  | "menyu"
  | "buyurtmalar"
  | "rezervatsiyalar"
  | "stollar"
  | "mijozlar"
  | "yangiliklar"
  | "maqolalar"
  | "xodimlar"
  | "hisobotlar"
  | "profil"
  | "sozlamalar";

const mainNav: { key: SectionKey; label: string; icon: any }[] = [
  { key: "dashboard", label: "Bosh sahifa", icon: LayoutDashboard },
  { key: "menyu", label: "Menyu", icon: UtensilsCrossed },
  { key: "buyurtmalar", label: "Buyurtmalar", icon: ClipboardList },
  { key: "rezervatsiyalar", label: "Rezervatsiyalar", icon: CalendarCheck },
  { key: "stollar", label: "Stollar", icon: Table2 },
  { key: "mijozlar", label: "Mijozlar", icon: Users },
];

const manageNav: { key: SectionKey; label: string; icon: any }[] = [
  { key: "yangiliklar", label: "Yangiliklar", icon: Newspaper },
  { key: "maqolalar", label: "Maqolalar", icon: FileText },
  { key: "xodimlar", label: "Xodimlar", icon: UserCog },
  { key: "hisobotlar", label: "Hisobotlar", icon: BarChart3 },
];

const settingsNav: { key: SectionKey; label: string; icon: any }[] = [
  { key: "profil", label: "Profil", icon: UserCircle },
  { key: "sozlamalar", label: "Sozlamalar", icon: SettingsIcon },
];

/* ============================================================
   3) GENERIC CRUD JADVAL (Buyurtmalar/Rezervatsiya/Stol/Mijoz/Xodim uchun)
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
  const { items, loading, add, update, remove } = useCrud<any>(collectionName);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const emptyForm = () =>
    fields.reduce((acc, f) => ({ ...acc, [f.key]: f.type === "number" ? 0 : f.type === "select" ? f.options?.[0] ?? "" : "" }), {});

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
      if (editingId) await update(editingId, form);
      else await add(form);
      setModalOpen(false);
    } catch (e) {
      alert("Xatolik: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("O'chirishni tasdiqlaysizmi?")) await remove(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-400">Jami: {items.length}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} /> {addLabel}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
            <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-gray-400">Ma'lumot topilmadi</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                {fields.map((f) => (
                  <th key={f.key} className="p-4 font-normal">{f.label}</th>
                ))}
                <th className="p-4 font-normal">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-white/5">
                  {fields.map((f) => (
                    <td key={f.key} className="p-4">
                      {f.type === "number" ? Number(item[f.key] ?? 0).toLocaleString() : String(item[f.key] ?? "")}
                    </td>
                  ))}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-gray-300 hover:bg-white/10">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10">
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
              <h2 className="text-lg font-semibold">{editingId ? "Tahrirlash" : addLabel}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-xs text-gray-400">{f.label}</label>
                  {f.type === "select" ? (
                    <select
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      value={form[f.key] ?? ""}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
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
   4) RASMLI BO'LIMLAR (Yangiliklar / Maqolalar) — base64 rasm bilan
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
  const { items, loading, add, update, remove } = useCrud<any>(collectionName);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{ title: string; content: string; image: string }>({
    title: "",
    content: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: "", content: "", image: "" });
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setForm({ title: item.title ?? "", content: item.content ?? "", image: item.image ?? "" });
    setModalOpen(true);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Avval rasmni base64 ga o'girishni kutib olamiz (await tashqarida bo'lishi kerak)
    const base64String = await fileToBase64(file);

    // 2. Keyin tayyor natijani setForm orqali saqlaymiz
    setForm((f) => ({ ...f, image: base64String }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) return alert("Sarlavhani kiriting");
    setSaving(true);
    try {
      if (editingId) await update(editingId, form);
      else await add(form);
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-400">Jami: {items.length}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]">
          <Plus size={16} /> {addLabel}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121619] p-10 text-center text-gray-400">
          Ma'lumot topilmadi
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#121619]">
              {item.image && <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-gray-400">{item.content}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-gray-300 hover:bg-white/10">
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => confirm("O'chirishni tasdiqlaysizmi?") && remove(item.id)}
                    className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
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
              <h2 className="text-lg font-semibold">{editingId ? "Tahrirlash" : addLabel}</h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Rasm</label>
                <input type="file" accept="image/*" onChange={handleImage} className="text-xs" />
                {form.image && <img src={form.image} className="mt-2 h-24 w-24 rounded-lg object-cover" />}
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Sarlavha</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Matn</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />} Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   5) MENYU (Admin) — rasm bilan, siqilgan holda Firestore'ga saqlanadi
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

const MENU_CATEGORIES = ["Osh", "Grill", "Salatlar", "Milliy taomlar", "Shashliklar", "Ichimliklar", "Desertlar"];

function MenuAdminSection() {
  const { items, loading, add, update, remove } = useCrud<MenuItem>("menu");
  const [tab, setTab] = useState<"all" | "available" | "unavailable">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuItem>({ name: "", category: MENU_CATEGORIES[0], price: 0, status: "Mavjud", image: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const filtered = items.filter((it) => {
    if (tab === "available") return it.status === "Mavjud";
    if (tab === "unavailable") return it.status === "Mavjud emas";
    return true;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: "", category: MENU_CATEGORIES[0], price: 0, status: "Mavjud", image: "", description: "" });
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingId(item.id!);
    setForm(item);
    setModalOpen(true);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setForm((f) => ({ ...f, image: base64 }));
    } catch (err) {
      alert("Rasmni yuklashda xatolik: " + (err as Error).message);
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
      if (editingId) await update(editingId, form);
      else await add(form);
      setModalOpen(false);
    } catch (err) {
      alert("Saqlashda xatolik: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Taomni o'chirishni tasdiqlaysizmi?")) await remove(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Menyu boshqaruvi</h1>
          <p className="text-sm text-gray-400">Jami taomlar: {items.length}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]">
          <Plus size={16} /> Taom qo'shish
        </button>
      </div>

      <div className="flex gap-2 border-b border-white/10 text-sm">
        {[
          { key: "all", label: `Barcha taomlar (${items.length})` },
          { key: "available", label: `Mavjud (${items.filter((i) => i.status === "Mavjud").length})` },
          { key: "unavailable", label: `Mavjud emas (${items.filter((i) => i.status === "Mavjud emas").length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`border-b-2 px-3 py-2 transition-colors ${
              tab === t.key ? "border-[#d9a441] text-[#e5ad45]" : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
            <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400">Taomlar topilmadi</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="p-4 font-normal">Taom nomi</th>
                <th className="p-4 font-normal">Kategoriya</th>
                <th className="p-4 font-normal">Narxi</th>
                <th className="p-4 font-normal">Holat</th>
                <th className="p-4 font-normal">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-white/5">
                  <td className="flex items-center gap-3 p-4">
                    <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#191e22]">
                      {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                    </div>
                    {item.name}
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.price.toLocaleString()} so'm</td>
                  <td className="p-4">
                    <span className={item.status === "Mavjud" ? "text-green-400" : "text-red-400"}>{item.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-gray-300 hover:bg-white/10">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(item.id!)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10">
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
              <h2 className="text-lg font-semibold">{editingId ? "Taomni tahrirlash" : "Yangi taom qo'shish"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Rasm</label>
                <input type="file" accept="image/*" onChange={handleImage} className="text-xs" disabled={imageUploading} />
                {imageUploading && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <Loader2 size={14} className="animate-spin" /> Rasm ishlanmoqda...
                  </div>
                )}
                {!imageUploading && form.image && (
                  <img src={form.image} alt="preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">Taom nomi</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">Tavsif (ixtiyoriy)</label>
                <input
                  value={form.description ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">Kategoriya</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                >
                  {MENU_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">Narxi (so'm)</label>
                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">Holat</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as MenuItem["status"] }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                >
                  <option value="Mavjud">Mavjud</option>
                  <option value="Mavjud emas">Mavjud emas</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                disabled={saving || imageUploading}
                className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
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
   5.5) STOLLAR (Admin) — stollar ro'yxati + har bir band stol uchun
   joriy shot (hisob) summasi va "To'landi / Shot yopildi" tugmasi.
   Bu yerdagi "tables" kolleksiyasi butun sayt bo'ylab (foydalanuvchi
   tomonida ham) bir xil manba sifatida ishlatiladi.
   ============================================================ */
type TableRow = RestaurantTable;

function TablesAdminSection() {
  const { items: tables, loading, add, update, remove } = useCrud<TableRow>("tables");
  const [bills, setBills] = useState<Record<string, Bill>>({});
  const [waiterFeePercent, setWaiterFeePercent] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{ number: string; seats: number }>({ number: "", seats: 2 });
  const [saving, setSaving] = useState(false);

  // Ochiq shotlarni (bills) real vaqtda kuzatish
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bills"), (snap) => {
      const map: Record<string, Bill> = {};
      snap.docs.forEach((d) => {
        const data = { id: d.id, ...d.data() } as Bill;
        if (data.status === "ochiq") map[String(data.tableNumber)] = data;
      });
      setBills(map);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "general"), (snap) => {
      const d = snap.data();
      if (d && typeof d.waiterFeePercent === "number") setWaiterFeePercent(d.waiterFeePercent);
    });
    return () => unsub();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ number: "", seats: 2 });
    setModalOpen(true);
  };

  const openEdit = (t: TableRow) => {
    setEditingId(t.id);
    setForm({ number: String(t.number), seats: t.seats ?? 2 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.number.trim()) return alert("Stol raqamini kiriting");
    setSaving(true);
    try {
      if (editingId) {
        await update(editingId, { number: form.number, seats: form.seats } as Partial<TableRow>);
      } else {
        await add({ number: form.number, seats: form.seats, status: "Bo'sh" } as Omit<TableRow, "id">);
      }
      setModalOpen(false);
    } catch (e) {
      alert("Xatolik: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Stolni o'chirishni tasdiqlaysizmi?")) await remove(id);
  };

  // Shot yopildi, to'landi — stol yana bo'sh bo'ladi, boshqa mijoz band qilishi mumkin
  const handleCloseBill = async (t: TableRow) => {
    const bill = bills[String(t.number)];
    if (!confirm(`${t.number}-stol: hisob yopilib, "to'landi" deb belgilansinmi?`)) return;
    try {
      if (bill) {
        await updateDoc(doc(db, "bills", bill.id), {
          status: "yopildi",
          closedAt: Date.now(),
          waiterFeePercent,
        });
      }
      await update(t.id, { status: "Bo'sh", reservedAt: "", reservedDate: "", reservedBy: "" } as Partial<TableRow>);
    } catch (e) {
      alert("Xatolik: " + (e as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Stollar</h1>
          <p className="text-sm text-gray-400">Jami: {tables.length}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} /> Stol qo'shish
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
          <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
        </div>
      ) : tables.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121619] p-10 text-center text-gray-400">
          Stollar topilmadi
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tables.map((t) => {
            const bill = bills[String(t.number)];
            const totals = bill ? calculateBillTotals(bill.items, waiterFeePercent) : null;
            const isFree = t.status === "Bo'sh";
            return (
              <div
                key={t.id}
                className={`rounded-xl border p-5 ${
                  isFree ? "border-white/10 bg-[#121619]" : "border-red-500/30 bg-red-500/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Table2 size={18} className={isFree ? "text-gray-400" : "text-red-400"} />
                    <span className="text-base font-semibold">{t.number}-stol</span>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] ${isFree ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                    {t.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">{t.seats ?? 2} o'rin</p>

                {!isFree && (t.reservedAt || t.reservedBy) && (
                  <p className="mt-2 text-xs text-gray-400">
                    Band: {t.reservedBy || "Mehmon"} {t.reservedAt ? `— ${t.reservedAt}` : ""}
                  </p>
                )}

                {bill && totals && (
                  <div className="mt-3 rounded-lg border border-white/10 bg-[#0d1114] p-3 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Receipt size={13} /> Joriy shot
                    </div>
                    <div className="mt-1 flex justify-between text-gray-300">
                      <span>Taomlar</span>
                      <span>{totals.itemsTotal.toLocaleString()} so'm</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Afitsiant ({waiterFeePercent}%)</span>
                      <span>{totals.waiterFee.toLocaleString()} so'm</span>
                    </div>
                    <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-semibold text-[#e5ad45]">
                      <span>Jami</span>
                      <span>{totals.grandTotal.toLocaleString()} so'm</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => openEdit(t)} className="rounded-lg border border-white/10 p-2 text-gray-300 hover:bg-white/10">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10">
                    <Trash2 size={14} />
                  </button>
                  {!isFree && (
                    <button
                      onClick={() => handleCloseBill(t)}
                      className="ml-auto flex items-center gap-1.5 rounded-lg bg-[#d9a441] px-3 py-2 text-xs font-medium text-black hover:bg-[#edbd58]"
                    >
                      <CheckCircle2 size={14} />
                      {bill ? "To'landi, shot yopildi" : "Bandlikni bekor qilish"}
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
              <h2 className="text-lg font-semibold">{editingId ? "Stolni tahrirlash" : "Stol qo'shish"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Stol raqami</label>
                <input
                  value={form.number}
                  onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">O'rindiqlar soni</label>
                <input
                  type="number"
                  value={form.seats}
                  onChange={(e) => setForm((f) => ({ ...f, seats: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />} Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   6) DASHBOARD (statik — keyin API bilan almashtiriladi)
   ============================================================ */
function DashboardSection({ goTo }: { goTo: (s: SectionKey) => void }) {
  const stats = [
    { label: "Jami buyurtmalar", value: "0", change: "0% bu hafta", icon: ShoppingBag, bg: "bg-purple-500/20", color: "text-purple-400" },
    { label: "Jami daromad", value: "0 so'm", change: "0% bu hafta", icon: DollarSign, bg: "bg-green-500/20", color: "text-green-400" },
    { label: "Rezervatsiyalar", value: "0", change: "0% bu hafta", icon: CalendarCheck, bg: "bg-blue-500/20", color: "text-blue-400" },
    { label: "Faol mijozlar", value: "0", change: "0% bu hafta", icon: Users, bg: "bg-red-500/20", color: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-[#121619] p-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <div className="text-xs text-gray-400">{s.label}</div>
                <div className="text-xl font-semibold">{s.value}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#121619] p-5">
        <h2 className="mb-4 text-base font-semibold">Tezkor amallar</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button onClick={() => goTo("menyu")} className="flex flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]">
            <Plus className="text-[#d9a441]" size={22} /> Taom qo'shish
          </button>
          <button onClick={() => goTo("buyurtmalar")} className="flex flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]">
            <PackageSearch className="text-green-400" size={22} /> Buyurtmalar
          </button>
          <button onClick={() => goTo("rezervatsiyalar")} className="flex flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]">
            <CalendarCheck className="text-blue-400" size={22} /> Rezervatsiya
          </button>
          <button onClick={() => goTo("hisobotlar")} className="flex flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]">
            <BarChart3 className="text-red-400" size={22} /> Hisobotlar
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">* Statistikalar hozircha statik ko'rsatilgan — API ulanganda real raqamlar bilan almashtiriladi.</p>
    </div>
  );
}

/* ============================================================
   7) HISOBOTLAR (statik)
   ============================================================ */
function ReportsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Hisobotlar</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Kunlik hisobot", "Haftalik hisobot", "Oylik hisobot"].map((t) => (
          <div key={t} className="rounded-xl border border-white/10 bg-[#121619] p-6">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-gray-400">Daromad: 0 so'm</p>
            <p className="text-sm text-gray-400">Buyurtmalar: 0</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">* Bu bo'lim API ulanganda real ma'lumotlar bilan to'ldiriladi.</p>
    </div>
  );
}

/* ============================================================
   8) PROFIL (Firestore: settings/profile)
   ============================================================ */
function ProfileSection() {
  const [name, setName] = useState("Admin");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "profile"));
        if (snap.exists()) {
          const d = snap.data();
          setName(d.name || "Admin");
          setPhone(d.phone || "");
          setPhoto(d.photo || "");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(await fileToBase64(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "profile"), { name, phone, photo });
      alert("Saqlandi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-400"><Loader2 className="animate-spin" size={18} /> Yuklanmoqda...</div>;
  }

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold">Profil</h1>
      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-[#191e22]">
            {photo && <img src={photo} className="h-full w-full object-cover" />}
          </div>
          <input type="file" accept="image/*" onChange={handlePhoto} className="text-xs" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Ism</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Telefon</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50" />
        </div>
        <button onClick={handleSave} disabled={saving} className="rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60">
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   9) SOZLAMALAR (Firestore: settings/general)
   ============================================================ */
function SettingsSection() {
  const [restaurantName, setRestaurantName] = useState("TANHO Restaurant");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [waiterFeePercent, setWaiterFeePercent] = useState(10);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "general"));
        if (snap.exists()) {
          const d = snap.data();
          setRestaurantName(d.restaurantName || "TANHO Restaurant");
          setAddress(d.address || "");
          setPhone(d.phone || "");
          setWaiterFeePercent(typeof d.waiterFeePercent === "number" ? d.waiterFeePercent : 10);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "general"), { restaurantName, address, phone, waiterFeePercent });
      alert("Sozlamalar saqlandi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-400"><Loader2 className="animate-spin" size={18} /> Yuklanmoqda...</div>;
  }

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold">Sozlamalar</h1>
      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
        <div>
          <label className="mb-1 block text-xs text-gray-400">Restoran nomi</label>
          <input value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Manzil</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Telefon</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Afitsiant (xizmat) haqi — umumiy shotdan foiz (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={waiterFeePercent}
            onChange={(e) => setWaiterFeePercent(Number(e.target.value))}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
          <p className="mt-1 text-[11px] text-gray-500">
            Har bir mijozning shotiga shu foiz avtomatik qo'shiladi. O'zgartirilsa, barcha yangi hisoblarga darhol ta'sir qiladi.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60">
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   10) ASOSIY ADMIN LAYOUT
   ============================================================ */
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState<SectionKey>("dashboard");

  const handleLogout = () => {
    if (confirm("Tizimdan chiqishni tasdiqlaysizmi?")) {
      localStorage.removeItem("admin_session");
      window.location.href = "/login";
    }
  };

  const navItemClass = (key: SectionKey) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition-all duration-200 ${
      active === key ? "bg-[#d9a441] text-black font-medium" : "text-gray-300 hover:bg-[#191e22] hover:text-[#e5ad45]"
    }`;

  const renderSection = () => {
    switch (active) {
      case "dashboard":
        return <DashboardSection goTo={setActive} />;
      case "menyu":
        return <MenuAdminSection />;
      case "buyurtmalar":
        return (
          <GenericCrudSection
            title="Buyurtmalar"
            collectionName="orders"
            addLabel="Buyurtma qo'shish"
            fields={[
              { key: "customer", label: "Mijoz" },
              { key: "table", label: "Stol" },
              { key: "itemsCount", label: "Taomlar soni", type: "number" },
              { key: "total", label: "Summa", type: "number" },
              { key: "time", label: "Vaqt" },
              { key: "status", label: "Holat", type: "select", options: ["Yangi", "Tayyorlanmoqda", "Tayyorlandi"] },
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
              { key: "customer", label: "Mijoz" },
              { key: "table", label: "Stol" },
              { key: "date", label: "Sana", type: "date" },
              { key: "time", label: "Vaqt" },
              { key: "guests", label: "Mehmonlar soni", type: "number" },
              { key: "status", label: "Holat", type: "select", options: ["Kutilmoqda", "Tasdiqlangan", "Bekor qilingan"] },
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
              { key: "name", label: "F.I.Sh" },
              { key: "phone", label: "Telefon" },
              { key: "ordersCount", label: "Buyurtmalar soni", type: "number" },
              { key: "totalSpent", label: "Jami xarajat", type: "number" },
            ]}
          />
        );
      case "yangiliklar":
        return <MediaCrudSection title="Yangiliklar" collectionName="news" addLabel="Yangilik qo'shish" />;
      case "maqolalar":
        return <MediaCrudSection title="Maqolalar" collectionName="articles" addLabel="Maqola qo'shish" />;
      case "xodimlar":
        return (
          <GenericCrudSection
            title="Xodimlar"
            collectionName="staff"
            addLabel="Xodim qo'shish"
            fields={[
              { key: "name", label: "F.I.Sh" },
              { key: "role", label: "Lavozimi" },
              { key: "phone", label: "Telefon" },
            ]}
          />
        );
      case "hisobotlar":
        return <ReportsSection />;
      case "profil":
        return <ProfileSection />;
      case "sozlamalar":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0e10] text-white">
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        } shrink-0 border-r border-white/10 bg-[#0d1114] transition-all duration-300`}
      >
        <div className="flex flex-col gap-1 p-4">
          <div className="mb-6 flex flex-col items-center py-2">
            <span className="font-serif text-xl tracking-wide text-[#d9a441]">TANHO</span>
            <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Restaurant</span>
          </div>

          <div className="mb-2 px-1 text-[11px] uppercase tracking-widest text-gray-500">Asosiy</div>
          {mainNav.map((item) => (
            <button key={item.key} onClick={() => setActive(item.key)} className={navItemClass(item.key)}>
              <item.icon size={18} strokeWidth={1.7} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mb-2 mt-5 px-1 text-[11px] uppercase tracking-widest text-gray-500">Boshqaruv</div>
          {manageNav.map((item) => (
            <button key={item.key} onClick={() => setActive(item.key)} className={navItemClass(item.key)}>
              <item.icon size={18} strokeWidth={1.7} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mb-2 mt-5 px-1 text-[11px] uppercase tracking-widest text-gray-500">Sozlamalar</div>
          {settingsNav.map((item) => (
            <button key={item.key} onClick={() => setActive(item.key)} className={navItemClass(item.key)}>
              <item.icon size={18} strokeWidth={1.7} />
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} strokeWidth={1.7} />
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0d1114] px-6 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen((v) => !v)} className="rounded-lg p-2 text-gray-300 hover:bg-[#191e22]">
              <MenuIcon size={20} />
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Qidirish..."
                className="w-64 rounded-lg border border-white/10 bg-[#121619] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#d9a441]/50"
              />
            </div>

            <button className="relative rounded-lg p-2 text-gray-300 hover:bg-[#191e22]">
              <Bell size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px]">
                0
              </span>
            </button>

            <button onClick={() => setActive("profil")} className="flex cursor-pointer items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9a441] text-sm font-semibold text-black">A</div>
              <div className="hidden text-left text-sm sm:block">
                <div className="font-medium">Admin</div>
                <div className="text-xs text-gray-400">Administrator</div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{renderSection()}</main>
      </div>
    </div>
  );
};

export default AdminLayout;