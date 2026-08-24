import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { useCrud } from "../hooks/useCrud";
import { fileToBase64 } from "../../../lib/utils";

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

export function MenuAdminSection() {
  const { items, loading, add, update, remove } = useCrud<MenuItem>("menu");

  const [tab, setTab] = useState<"all" | "available" | "unavailable">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<MenuItem>({
    name: "",
    category: MENU_CATEGORIES[0],
    price: 0,
    status: "Mavjud",
    image: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

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

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);

    try {
      const base64 = await fileToBase64(file);
      setForm((state) => ({
        ...state,
        image: base64,
      }));
    } catch (error) {
      alert(
        "Rasmni yuklashda xatolik: " +
          (error instanceof Error ? error.message : "Noma'lum xatolik")
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
          (error instanceof Error ? error.message : "Noma'lum xatolik")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Taomni o'chirishni tasdiqlaysizmi?")) {
      await remove(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Menyu boshqaruvi</h1>
          <p className="text-sm text-gray-400">Jami taomlar: {items.length}</p>
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
              items.filter((item) => item.status === "Mavjud").length
            })`,
          },
          {
            key: "unavailable",
            label: `Mavjud emas (${
              items.filter((item) => item.status === "Mavjud emas").length
            })`,
          },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setTab(item.key as "all" | "available" | "unavailable")
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
            <Loader2 className="animate-spin" size={18} />
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

                  <td className="p-4">{item.category}</td>

                  <td className="p-4">{item.price.toLocaleString()} so'm</td>

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
                        onClick={() => openEdit(item)}
                        className="cursor-pointer rounded-lg p-1.5 text-gray-300 hover:bg-white/10"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id!)}
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
                {editingId ? "Tahrirlash" : "Taom qo'shish"}
              </h2>

              <button
                onClick={() => setModalOpen(false)}
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
                />
                {imageUploading && (
                  <p className="mt-1 text-xs text-gray-400">Yuklanmoqda...</p>
                )}
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-2 h-20 w-20 rounded-lg object-cover"
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
                    setForm((state) => ({ ...state, name: e.target.value }))
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
                    setForm((state) => ({ ...state, category: e.target.value }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                >
                  {MENU_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
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
                      price: Number(e.target.value),
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
                      status: e.target.value as "Mavjud" | "Mavjud emas",
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                >
                  <option value="Mavjud">Mavjud</option>
                  <option value="Mavjud emas">Mavjud emas</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Tavsif
                </label>
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleSave}
                disabled={saving || imageUploading}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
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