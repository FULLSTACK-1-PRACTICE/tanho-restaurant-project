import { useState } from "react";
import { Plus, Edit2, Trash2, X, ChevronDown, Layers, Check } from "lucide-react";
import { toast } from "sonner";

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
  const [data, setData] = useState<Record<string, unknown>[]>([
    {
      id: "1",
      [fields[0]?.key || "name"]: fields[0]?.type === "number" ? 12 : "Ali Valiyev",
      [fields[1]?.key || "phone"]: "+998 90 123 45 67",
      [fields[2]?.key || "status"]: "Tasdiqlangan",
    },
    {
      id: "2",
      [fields[0]?.key || "name"]: fields[0]?.type === "number" ? 5 : "Dilshodbek",
      [fields[1]?.key || "phone"]: "+998 91 987 65 43",
      [fields[2]?.key || "status"]: "Kutilmoqda",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [initialFormData, setInitialFormData] = useState<Record<string, unknown>>({});
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const handleOpenModal = (item?: Record<string, unknown>) => {
    if (item) {
      setEditingId(String(item.id ?? ""));
      setFormData({ ...item });
      setInitialFormData({ ...item });
    } else {
      setEditingId(null);
      setFormData({});
      setInitialFormData({});
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
    setInitialFormData({});
    setOpenDropdownKey(null);
  };

  const hasValues = Object.values(formData).some(
    (val) => val !== undefined && val !== null && String(val).trim() !== ""
  );

  const isChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);

  const isSaveDisabled = editingId ? !isChanged : !hasValues;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSaveDisabled) {
      toast.error("Iltimos, ma'lumotlarni o'zgartiring yoki to'ldiring!");
      return;
    }

    if (editingId) {
      setData((prev) =>
        prev.map((item) => (String(item.id) === editingId ? { ...formData, id: editingId } : item))
      );
      toast.success("Ma'lumot muvaffaqiyatli tahrirlandi!");
    } else {
      setData((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
      toast.success("Yangi ma'lumot muvaffaqiyatli qo'shildi!");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => String(item.id) !== id));
    toast.success("Ma'lumot o'chirildi!");
  };

  return (
    <div className="space-y-6">
      <div 
        onClick={() => setOpenDropdownKey(null)}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#121619] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-32 h-32 bg-[#FF9500]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#FF9500]/10 text-[#FF9500] text-[11px] font-medium tracking-wide uppercase">
            <Layers size={13} />
            <span>Boshqaruv</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Jami ro'yxatda <span className="text-white font-medium">{data.length}</span> ta yozuv mavjud
          </p>
        </div>

        {addLabel && (
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FF9500] hover:bg-[#ff8400] text-black font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#FF9500]/20 active:scale-[0.98] w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>{addLabel}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#121619] p-12 text-center text-gray-500 shadow-xl">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-gray-400">
                <Layers size={22} strokeWidth={1.5} />
              </div>
              <p className="text-gray-400 font-medium">Ma'lumotlar mavjud emas</p>
              <p className="text-[11px] text-gray-600">Yangi qo'shish tugmasi orqali ma'lumot kiriting</p>
            </div>
          </div>
        ) : (
          data.map((item, idx) => {
            const itemId = String(item.id ?? idx);
            return (
              <div
                key={itemId}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121619] p-5 shadow-xl transition-all hover:border-[#FF9500]/40"
              >
                <div className="space-y-3">
                  {fields.map((f, i) => {
                    const val = String(item[f.key] ?? "-");
                    if (i === 0) {
                      return (
                        <div key={f.key} className="flex items-start justify-between gap-2 border-b border-white/5 pb-3">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block">
                              {f.label}
                            </span>
                            <span className="text-sm font-semibold text-white mt-0.5 block">
                              {val}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleOpenModal(item)}
                              title="Tahrirlash"
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-[#FF9500] hover:bg-[#FF9500]/10 transition cursor-pointer"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(itemId)}
                              title="O'chirish"
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={f.key} className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{f.label}:</span>
                        <span className="font-medium text-white">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div 
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121619] p-6 shadow-2xl space-y-5 relative cursor-default"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {editingId ? "Ma'lumotni tahrirlash" : addLabel || "Yangi qo'shish"}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-1.5 relative">
                  <label className="block text-xs font-medium text-gray-300">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <div>
                      <div
                        onClick={() =>
                          setOpenDropdownKey(openDropdownKey === field.key ? null : field.key)
                        }
                        className={`w-full flex items-center justify-between rounded-xl border bg-[#0d1114] px-3.5 py-2.5 text-xs sm:text-sm text-white cursor-pointer transition-all ${
                          openDropdownKey === field.key
                            ? "border-[#FF9500] ring-1 ring-[#FF9500]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <span className={!formData[field.key] ? "text-gray-500" : "text-white"}>
                          {String(formData[field.key] || "Tanlang")}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            openDropdownKey === field.key ? "rotate-180 text-[#FF9500]" : ""
                          }`}
                        />
                      </div>

                      {openDropdownKey === field.key && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-xl border border-white/10 bg-[#161b22] p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                          <div
                            onClick={() => {
                              setFormData({ ...formData, [field.key]: "" });
                              setOpenDropdownKey(null);
                            }}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-500 hover:bg-white/5 hover:text-white transition cursor-pointer"
                          >
                            <span>Tanlang</span>
                            {!formData[field.key] && <Check size={14} className="text-[#FF9500]" />}
                          </div>
                          {field.options?.map((opt) => {
                            const isSelected = formData[field.key] === opt;
                            return (
                              <div
                                key={opt}
                                onClick={() => {
                                  setFormData({ ...formData, [field.key]: opt });
                                  setOpenDropdownKey(null);
                                }}
                                className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm transition cursor-pointer ${
                                  isSelected
                                    ? "bg-[#FF9500]/10 text-[#FF9500] font-medium"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check size={14} className="text-[#FF9500]" />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={String(formData[field.key] ?? "")}
                      placeholder={`${field.label}ni kiriting...`}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#0d1114] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition"
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:bg-white/5 transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSaveDisabled}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-lg ${
                    isSaveDisabled
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 shadow-none"
                      : "bg-[#FF9500] hover:bg-[#ff8400] text-black shadow-[#FF9500]/20 active:scale-[0.98] cursor-pointer"
                  }`}
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