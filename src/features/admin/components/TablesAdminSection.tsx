import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Table2, Receipt, CheckCircle2 } from "lucide-react";
import { useCrud } from "../hooks/useCrud"; // O'zingizning to'g'ri yo'lingizni ko'rsating

// Tiplarni e'lon qilish (Agar bular alohida faylda bo'lsa, import qilib oling)
export interface RestaurantTable {
  id: string;
  number: string | number;
  seats: number;
  status: string;
  reservedAt?: string;
  reservedDate?: string;
  reservedBy?: string;
}

export interface Bill {
  items: any[];
}

// Vaqtinchalik hisoblash funksiyasi (agar loyihada bo'lsa uni ishlating)
const calculateBillTotals = (items: any[], waiterFeePercent: number) => {
  return { itemsTotal: 0, waiterFee: 0, grandTotal: 0 };
};

type TableRow = RestaurantTable;

export function TablesAdminSection() {
  const {
    items: tables,
    loading,
    add,
    update,
    remove,
  } = useCrud<TableRow>("tables");

  const [waiterFeePercent] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<{
    number: string;
    seats: number;
  }>({
    number: "",
    seats: 2,
  });

  const [saving, setSaving] = useState(false);
  const [bills] = useState<Record<string, Bill>>({});

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
    if (!form.number.toString().trim()) {
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
          (error instanceof Error ? error.message : "Noma'lum xatolik")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Stolni o'chirishni tasdiqlaysizmi?")) {
      await remove(id);
    }
  };

  const handleCloseBill = async (table: TableRow) => {
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
          (error instanceof Error ? error.message : "Noma'lum xatolik")
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Yuqori qism: Sarlavha va Qo'shish tugmasi */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Stollar</h1>
          <p className="text-sm text-gray-400">Jami: {tables.length}</p>
        </div>

        <button
          onClick={openAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
        >
          <Plus size={16} />
          Stol qo'shish
        </button>
      </div>

      {/* Yuklanish va Bo'sh holatlar */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 p-10 text-gray-400">
          <Loader2 className="animate-spin" size={18} />
          Yuklanmoqda...
        </div>
      ) : tables.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121619] p-10 text-center text-gray-400">
          Stollar topilmadi
        </div>
      ) : (
        /* Stollar ro'yxati (Grid) */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => {
            const bill = bills[String(table.number)];
            const totals = bill
              ? calculateBillTotals(bill.items, waiterFeePercent)
              : null;
            const isFree = table.status === "Bo'sh";

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
                      className={isFree ? "text-gray-400" : "text-red-400"}
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

                {!isFree && (table.reservedAt || table.reservedBy) && (
                  <p className="mt-2 text-xs text-gray-400">
                    Band: {table.reservedBy || "Mehmon"}{" "}
                    {table.reservedAt ? `— ${table.reservedAt}` : ""}
                  </p>
                )}

                {bill && totals && (
                  <div className="mt-3 rounded-lg border border-white/10 bg-[#0d1114] p-3 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Receipt size={13} />
                      Joriy shot
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
                  <button
                    onClick={() => openEdit(table)}
                    className="cursor-pointer rounded-lg border border-white/10 p-2 text-gray-300 hover:bg-white/10"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(table.id)}
                    className="cursor-pointer rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                  </button>

                  {!isFree && (
                    <button
                      onClick={() => handleCloseBill(table)}
                      className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#d9a441] px-3 py-2 text-xs font-medium text-black hover:bg-[#edbd58]"
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

      {/* Qo'shish / Tahrirlash Modali */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#121619] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId ? "Stolni tahrirlash" : "Stol qo'shish"}
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
                  placeholder="Masalan: 1, 2, VIP"
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
                      seats: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                  min="1"
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