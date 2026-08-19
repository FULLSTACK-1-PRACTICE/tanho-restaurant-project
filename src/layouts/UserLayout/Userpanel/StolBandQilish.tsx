import { Table2 } from "lucide-react";

const StolBandQilish = () => {
  // Statik stollar ro'yxati (test uchun)
  const tables = [
    { id: 1, number: 1, seats: 4 },
    { id: 2, number: 2, seats: 2 },
    { id: 3, number: 3, seats: 6 },
    { id: 4, number: 4, seats: 4 },
    { id: 5, number: 5, seats: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-white">Stol band qilish</h1>
          <p className="mt-1 text-sm text-gray-400">
            O'zingizga ma'qul stolni tanlang.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tables.map((t) => (
          <button
            key={t.id}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.03] p-5 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.08]"
          >
            <Table2 size={22} className="text-gray-300" />
            <span className="font-medium text-lg">{t.number}-stol</span>
            {t.seats && (
              <span className="text-xs text-gray-400">{t.seats} kishilik</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StolBandQilish;