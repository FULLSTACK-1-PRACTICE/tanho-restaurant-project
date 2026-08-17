import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { RestaurantTable } from "../../types/restaurant";
import { CalendarDays, Check, Clock3, Loader2, Table2, User, X } from "lucide-react";

interface ReserveTableModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ReserveTableModal({ open, onClose }: ReserveTableModalProps) {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<RestaurantTable | null>(null);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const q = query(collection(db, "tables"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setTables(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as RestaurantTable[]);
        setLoading(false);
      },
      () => {
        onSnapshot(collection(db, "tables"), (snap) => {
          setTables(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as RestaurantTable[]);
          setLoading(false);
        });
      }
    );
    return () => unsub();
  }, [open]);

  if (!open) return null;

  const reset = () => {
    setSelected(null);
    setName("");
    setTime("");
    setDate("");
    setDone(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleConfirm = async () => {
    if (!selected || !time.trim()) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "tables", selected.id), {
        status: "Band",
        reservedAt: time.trim(),
        reservedDate: date.trim() || null,
        reservedBy: name.trim() || "Mehmon",
      });
      setDone(true);
    } catch (e) {
      alert("Xatolik: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#121619] p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-xl">
            <Table2 size={20} className="text-[#d9a441]" /> Stol band qilish
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <Check size={24} />
            </div>
            <p className="text-sm text-gray-200">
              {selected?.number}-stol {time} vaqtga band qilindi.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 rounded-lg bg-[#d9a441] px-5 py-2 text-sm font-medium text-black hover:bg-[#edbd58]"
            >
              Yopish
            </button>
          </div>
        ) : !selected ? (
          <>
            <p className="mb-3 text-sm text-gray-400">Bo'sh stolni tanlang:</p>
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
                <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
              </div>
            ) : tables.length === 0 ? (
              <div className="py-10 text-center text-sm text-gray-400">Hozircha stollar qo'shilmagan</div>
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {tables.map((t) => {
                  const isFree = t.status === "Bo'sh";
                  return (
                    <button
                      key={t.id}
                      disabled={!isFree}
                      onClick={() => setSelected(t)}
                      className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition-all ${
                        isFree
                          ? "border-green-500/40 bg-green-500/10 text-green-300 hover:-translate-y-0.5 hover:border-green-400"
                          : "cursor-not-allowed border-red-500/40 bg-red-500/10 text-red-300"
                      }`}
                    >
                      <Table2 size={18} />
                      <span className="font-medium">{t.number}-stol</span>
                      {t.seats ? <span className="text-[10px] opacity-70">{t.seats} o'rin</span> : null}
                      <span className="text-[10px]">{isFree ? "Bo'sh" : "Band"}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-[#0d1114] p-3 text-sm text-gray-300">
              Tanlangan stol: <span className="font-medium text-[#e5ad45]">{selected.number}-stol</span>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
                <User size={13} /> Ismingiz (ixtiyoriy)
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ism Familiya"
                className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <CalendarDays size={13} /> Sana (ixtiyoriy)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock3 size={13} /> Vaqt *
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Orqaga
              </button>
              <button
                onClick={handleConfirm}
                disabled={saving || !time.trim()}
                className="flex items-center gap-2 rounded-lg bg-[#d9a441] px-5 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />} Band qilish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}