import { CalendarDays, Table2 } from "lucide-react";
import { useRestaurant } from "../../../context/RestaurantContext";


const StolBandQilish = () => {
  const { tables, tablesLoading, openReserveModal } = useRestaurant();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-white">Stol band qilish</h1>
          <p className="mt-1 text-sm text-gray-400">
            Bo'sh stolni tanlab, o'zingizga qulay vaqtni belgilang.
          </p>
        </div>

      </div>

      {tablesLoading ? (
        <div className="py-16 text-center text-sm text-gray-400">Yuklanmoqda...</div>
      ) : tables.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121619] p-10 text-center text-sm text-gray-400">
          Hozircha stollar qo'shilmagan
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tables.map((t) => {
            const isFree = t.status === "Bo'sh";
            return (
              <button
                key={t.id}
                onClick={openReserveModal}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-5 text-sm transition-all duration-300 ${
                  isFree
                    ? "border-green-500/30 bg-green-500/[0.06] text-green-300 hover:-translate-y-1 hover:border-green-400"
                    : "border-red-500/30 bg-red-500/[0.06] text-red-300 hover:-translate-y-1"
                }`}
              >
                <Table2 size={22} />
                <span className="font-medium">{t.number}-stol</span>
                {t.seats ? <span className="text-xs opacity-70">{t.seats} o'rin</span> : null}
                <span className="mt-1 rounded-full bg-black/20 px-2.5 py-1 text-[11px]">{t.status}</span>
                {!isFree && t.reservedAt && (
                  <span className="text-[10px] text-red-200/70">Band vaqti: {t.reservedAt}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StolBandQilish;