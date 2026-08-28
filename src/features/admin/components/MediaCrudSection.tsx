import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { useCrud } from "../hooks/useCrud";
import { fileToBase64 } from "../../../lib/utils";

interface MediaItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  [key: string]: unknown;
}

export function MediaCrudSection({
  title,
  collectionName,
  addLabel,
}: {
  title: string;
  collectionName: string;
  addLabel: string;
}) {
  const { items, loading, add, update, remove } = useCrud<MediaItem>(collectionName);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const openEdit = (item: MediaItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title ?? "",
      content: item.content ?? "",
      image: item.image ?? "",
    });
    setModalOpen(true);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64String = await fileToBase64(file);
      setForm((state) => ({
        ...state,
        image: base64String,
      }));
    } catch {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;

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
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-400">Jami: {items.length}</p>
        </div>

        <button
          onClick={openAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#FE9A00] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#FE9A00]/80"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="animate-spin" size={18} />
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
                  loading="lazy"
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>

                <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                  {item.content}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="cursor-pointer rounded-lg p-1.5 text-gray-300 hover:bg-white/10"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() => remove(item.id)}
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
                {editingId ? "Tahrirlash" : addLabel}
              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="cursor-pointer"
              >
                <X size={20} className="text-gray-400" />
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
                    loading="lazy"
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
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#FE9A00]/50"
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
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#FE9A00]/50"
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
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#FE9A00] px-4 py-2 text-sm font-medium text-black hover:bg-[#FE9A00]/80 disabled:cursor-not-allowed disabled:opacity-60"
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