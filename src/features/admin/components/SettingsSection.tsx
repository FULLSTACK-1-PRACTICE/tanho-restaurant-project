import { useState } from "react";

export function SettingsSection() {
  const [restaurantName, setRestaurantName] = useState("TANHO Restaurant");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [waiterFeePercent, setWaiterFeePercent] = useState(10);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      alert("Sozlamalar saqlandi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold">Sozlamalar</h1>

      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
        <div>
          <label className="mb-1 block text-xs text-gray-400">Restoran nomi</label>
          <input
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">Manzil</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">Telefon</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">
            Afitsiant (xizmat) haqi — umumiy shotdan foiz (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={waiterFeePercent}
            onChange={(e) => setWaiterFeePercent(Number(e.target.value))}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
          <p className="mt-1 text-[11px] text-gray-500">
            Har bir mijozning shotiga shu foiz avtomatik qo'shiladi.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
}