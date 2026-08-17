import { Loader2, Table2, X } from "lucide-react";
import { useRestaurant } from "../../context/RestaurantContext";
 
/**
 * "Buyurtma berish" tugmasi bosilganda, mehmon hali stol tanlamagan bo'lsa
 * shu oyna ochiladi: "Qaysi stoldasiz?" — tanlangach o'sha stolga shot ochiladi.
 */
export default function TableSelectModal() {
  const { orderPickerOpen, closeOrderPicker, tables, tablesLoading, confirmTableAndAdd } = useRestaurant();
 
  if (!orderPickerOpen) return null;
 
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#121619] p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-xl">
            <Table2 size={20} className="text-[#d9a441]" /> Qaysi stoldasiz?
          </h2>
          <button onClick={closeOrderPicker} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
 
        <p className="mb-3 text-sm text-gray-400">
          Buyurtmangizni qabul qilishimiz uchun avval stolingizni tanlang.
        </p>
 
        {tablesLoading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
            <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
          </div>
        ) : tables.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400">Hozircha stollar qo'shilmagan</div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {tables.map((t) => (
              <button
                key={t.id}
                onClick={() => confirmTableAndAdd(t.number)}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/10 bg-[#0d1114] p-3 text-xs text-gray-200 transition-all hover:-translate-y-0.5 hover:border-[#d9a441]/60 hover:text-[#e5ad45]"
              >
                <Table2 size={18} />
                <span className="font-medium">{t.number}-stol</span>
                {t.seats ? <span className="text-[10px] opacity-70">{t.seats} o'rin</span> : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 