import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { useCrud } from "../hooks/useCrud";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "select" | "date";
  options?: string[];
}

export function GenericCrudSection({
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