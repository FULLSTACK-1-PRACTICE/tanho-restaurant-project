import { useState } from "react";
import { Minus, Plus, Receipt, Table2, X } from "lucide-react";
import { useRestaurant } from "../../context/RestaurantContext";

/**
 * Menyu sahifasining pastki-o'ng burchagidagi "Shot" tugmasi.
 * Faqat mehmon stol tanlab, kamida bitta taom buyurtma qilgandan keyin ko'rinadi.
 */
export default function ShotWidget() {
  const { activeTableNumber, bill, billTotals, waiterFeePercent, changeItemQty } = useRestaurant();
  const [open, setOpen] = useState(false);

  if (!activeTableNumber || !bill || bill.items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#d9a441] px-5 py-3.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(217,164,65,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#edbd58]"
      >
        <Receipt size={18} />
        Shot
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black/20 px-1.5 text-xs">
          {bill.items.reduce((n, it) => n + it.qty, 0)}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#121619] p-5 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-serif text-lg">
                <Table2 size={18} className="text-[#d9a441]" /> {activeTableNumber}-stol — Shot
              </h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {bill.items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-2 text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{it.name}</div>
                    <div className="text-xs text-gray-400">{it.price.toLocaleString()} so'm</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeItemQty(it.id, -1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-gray-300 hover:bg-white/10"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-4 text-center">{it.qty}</span>
                    <button
                      onClick={() => changeItemQty(it.id, 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-gray-300 hover:bg-white/10"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="w-20 shrink-0 text-right text-xs text-[#e5ad45]">
                    {(it.price * it.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Taomlar summasi</span>
                <span>{billTotals.itemsTotal.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Afitsiant xizmati ({waiterFeePercent}%)</span>
                <span>{billTotals.waiterFee.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-semibold text-[#e5ad45]">
                <span>Jami</span>
                <span>{billTotals.grandTotal.toLocaleString()} so'm</span>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-4 text-gray-500">
              Hisobni yopish va to'lovni tasdiqlash afitsiant/admin tomonidan amalga oshiriladi.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-lg bg-[#d9a441] px-4 py-2.5 text-sm font-medium text-black hover:bg-[#edbd58]"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
}