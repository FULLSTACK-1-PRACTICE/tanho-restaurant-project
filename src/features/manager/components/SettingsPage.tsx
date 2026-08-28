import { useState } from "react";
import {
  Lock,
  Bell,
  Save,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"security" | "notifications">("security");
  const [saved, setSaved] = useState(false);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    tableReservations: true,
    systemAlerts: false,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Sozlamalar</h2>
          <p className="text-xs text-gray-400">
            Xavfsizlik va bildirishnoma sozlamalarini boshqarish
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium">
            <Check size={14} /> Ma'lumotlar muvaffaqiyatli saqlandi!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        <div className="space-y-1">
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
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "notifications"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Bell size={16} />
            Bildirishnomalar
          </button>
        </div>

        <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 md:p-6">
          {activeTab === "security" && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-400" /> Parolni O'zgartirish
              </h3>

              <div className="space-y-3 max-w-md">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    Joriy parol
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.currentPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, currentPassword: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    Yangi parol
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.newPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, newPassword: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                    Yangi parolni tasdiqlang
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, confirmPassword: e.target.value })
                    }
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

          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Bell size={16} className="text-amber-400" /> Bildirishnoma Sozlamalari
              </h3>

              <div className="space-y-3 max-w-md">
                <label className="flex items-center justify-between p-3 bg-[#1a1a1e] border border-white/10 rounded-xl cursor-pointer">
                  <span className="text-xs text-gray-200 font-medium">Yangi buyurtmalar xabarnomasi</span>
                  <input
                    type="checkbox"
                    checked={notifications.newOrders}
                    onChange={(e) =>
                      setNotifications({ ...notifications, newOrders: e.target.checked })
                    }
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1a1a1e] border border-white/10 rounded-xl cursor-pointer">
                  <span className="text-xs text-gray-200 font-medium">Stol bron qilish xabarnomasi</span>
                  <input
                    type="checkbox"
                    checked={notifications.tableReservations}
                    onChange={(e) =>
                      setNotifications({ ...notifications, tableReservations: e.target.checked })
                    }
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1a1a1e] border border-white/10 rounded-xl cursor-pointer">
                  <span className="text-xs text-gray-200 font-medium">Tizim yangilanishlari</span>
                  <input
                    type="checkbox"
                    checked={notifications.systemAlerts}
                    onChange={(e) =>
                      setNotifications({ ...notifications, systemAlerts: e.target.checked })
                    }
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
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