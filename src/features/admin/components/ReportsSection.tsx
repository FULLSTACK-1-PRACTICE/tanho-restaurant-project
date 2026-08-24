export function ReportsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Hisobotlar</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Kunlik hisobot", "Haftalik hisobot", "Oylik hisobot"].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-[#121619] p-6"
          >
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-400">Daromad: 0 so'm</p>
            <p className="text-sm text-gray-400">Buyurtmalar: 0</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        * Bu bo'lim API ulanganda real ma'lumotlar bilan to'ldiriladi.
      </p>
    </div>
  );
}