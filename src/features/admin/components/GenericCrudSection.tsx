import { useState } from "react";
import { Plus, Edit2, Trash2, X, ChevronDown } from "lucide-react";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select";
  options?: string[];
}

interface GenericCrudSectionProps {
  title: string;
  collectionName?: string;
  addLabel?: string;
  fields: FieldConfig[];
}

export function GenericCrudSection({
  title,
  addLabel,
  fields,
}: GenericCrudSectionProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleOpenModal = (item?: Record<string, unknown>) => {
    if (item) {
      setEditingId(String(item.id ?? ""));
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setData((prev) =>
        prev.map((item) => (String(item.id) === editingId ? { ...formData, id: editingId } : item))
      );
    } else {
      setData((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => String(item.id) !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Jami: {data.length} ta yozuv
          </p>
        </div>

        {addLabel && (
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <Plus size={18} />
            <span>{addLabel}</span>
          </button>
        )}
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#121619]">
        <table className="w-full min-w-[650px] text-left text-xs sm:text-sm text-gray-300">
          <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase text-[11px] tracking-wider">
            <tr>
              {fields.map((f) => (
                <th key={f.key} className="px-4 py-3.5 font-semibold whitespace-nowrap">
                  {f.label}
                </th>
              ))}
              <th className="px-4 py-3.5 text-right font-semibold whitespace-nowrap">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={fields.length + 1}
                  className="px-4 py-8 text-center text-gray-500 text-xs sm:text-sm"
                >
                  Ma'lumotlar mavjud emas
                </td>
              </tr>
            ) : (
              data.map((item, idx) => {
                const itemId = String(item.id ?? idx);
                return (
                  <tr key={itemId} className="hover:bg-white/[0.02] transition">
                    {fields.map((f) => (
                      <td key={f.key} className="px-4 py-3.5 whitespace-nowrap text-white font-medium">
                        {String(item[f.key] ?? "-")}
                      </td>
                    ))}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenModal(item)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-white/5 transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(itemId)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121619] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Tahrirlash" : addLabel || "Qo'shish"}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <div className="relative">
                      <select
                        value={String(formData[field.key] ?? "")}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.key]: e.target.value })
                        }
                        className="w-full appearance-none rounded-xl border border-white/10 bg-[#0b0e10] px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none transition"
                      >
                        <option value="" className="bg-[#0b0e10] text-gray-400">
                          Tanlang
                        </option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e10] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={String(formData[field.key] ?? "")}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#0b0e10] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:bg-white/5"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-xs font-semibold text-black hover:bg-amber-600"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}