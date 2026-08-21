import { useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  Bell,
  Percent,
  Save,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications" | "system">("general");
  const [saved, setSaved] = useState(false);

  // Form ma'lumotlari
  const [generalInfo, setGeneralInfo] = useState({
    restaurantName: "Tanho Restaurant",
    phone: "+998 90 123 45 67",
    email: "info@tanhorestaurant.uz",
    address: "Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi 45-uy",
    openingTime: "09:00",
    closingTime: "23:00",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [system, setSystem] = useState({
    serviceFee: 10, // %
    vatTax: 12, // %
    autoConfirmOrders: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full px-3.5 py-2.5 bg-[#1a1a1e] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Sarlavha va Tablar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Sozlamalar</h2>
          <p className="text-xs text-gray-400">
            Restoran va profil ma'lumotlarini boshqarish
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium">
            <Check size={14} /> Ma'lumotlar muvaffaqiyatli saqlandi!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Yon menyu (Tablar) */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "general"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Building2 size={16} />
            Restoran profili
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "security"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Lock size={16} />
            Xavfsizlik
          </button>

          <button
            onClick={() => setActiveTab("system")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "system"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Percent size={16} />
            Xizmat va Soliq
          </button>
        </div>

        {/* Tab Kontenti */}
        <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 md:p-6">
          {activeTab === "general" && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 size={16} className="text-amber-400" /> Restoran Asosiy Ma'lumotlari
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium"> Restoran nomi</label>
                  <input
                    type="text"
                    value={generalInfo.restaurantName}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, restaurantName: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    <Phone size={12} className="inline mr-1" /> Telefon raqami
                  </label>
                  <input
                    type="text"
                    value={generalInfo.phone}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    <Mail size={12} className="inline mr-1" /> Email manzili
                  </label>
                  <input
                    type="email"
                    value={generalInfo.email}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    <MapPin size={12} className="inline mr-1" /> Manzil
                  </label>
                  <input
                    type="text"
                    value={generalInfo.address}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, address: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    <Clock size={12} className="inline mr-1" /> Ochilish vaqti
                  </label>
                  <input
                    type="time"
                    value={generalInfo.openingTime}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, openingTime: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    <Clock size={12} className="inline mr-1" /> Yopilish vaqti
                  </label>
                  <input
                    type="time"
                    value={generalInfo.closingTime}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, closingTime: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Save size={15} /> Saqlash
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-400" /> Parolni O'zgartirish
              </h3>

              <div className="space-y-3 max-w-md">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Joriy parol</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Yangi parol</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Yangi parolni tasdiqlang</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Save size={15} /> Parolni Yangilash
                </button>
              </div>
            </form>
          )}

          {activeTab === "system" && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Percent size={16} className="text-amber-400" /> Xizmat ko'rsatish va Soliqlar
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Xizmat haqi (%)</label>
                  <input
                    type="number"
                    value={system.serviceFee}
                    onChange={(e) => setSystem({ ...system, serviceFee: Number(e.target.value) })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">QQS / Soliq (%)</label>
                  <input
                    type="number"
                    value={system.vatTax}
                    onChange={(e) => setSystem({ ...system, vatTax: Number(e.target.value) })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Save size={15} /> Saqlash
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}