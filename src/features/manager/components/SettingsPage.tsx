import { useState } from "react";
import {
  Lock,
  Bell,
  Save,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  ShieldAlert,
} from "lucide-react";

const INITIAL_SECURITY = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactor: false,
};

const INITIAL_NOTIFICATIONS = {
  newOrders: true,
  tableReservations: true,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"security" | "notifications">("security");
  const [saved, setSaved] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [security, setSecurity] = useState(INITIAL_SECURITY);
  const [initialSecurity, setInitialSecurity] = useState(INITIAL_SECURITY);

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [initialNotifications, setInitialNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Taqqoslash operatorlari `&&` bilan tuzatildi
  const isSecurityChanged =
    security.currentPassword !== initialSecurity.currentPassword ||
    security.newPassword !== initialSecurity.newPassword ||
    security.confirmPassword !== initialSecurity.confirmPassword ||
    security.twoFactor !== initialSecurity.twoFactor;

  const isNotificationsChanged =
    notifications.newOrders !== initialNotifications.newOrders ||
    notifications.tableReservations !== initialNotifications.tableReservations;

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSecurityChanged) return;

    setInitialSecurity(security);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleNotificationsSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNotificationsChanged) return;

    setInitialNotifications(notifications);
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
            <Check size={14} /> Ma'lumotlar saqlandi!
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

        <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 md:p-6 space-y-6">
          {activeTab === "security" && (
            <form onSubmit={handleSecuritySave} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-amber-400" /> Parolni O'zgartirish
                </h3>

                <div className="space-y-3 max-w-md">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      Joriy parol
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={security.currentPassword}
                        onChange={(e) =>
                          setSecurity({ ...security, currentPassword: e.target.value })
                        }
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      Yangi parol
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={security.newPassword}
                        onChange={(e) =>
                          setSecurity({ ...security, newPassword: e.target.value })
                        }
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
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
              </div>

              <div className="border-t border-white/5 pt-5 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldAlert size={16} className="text-amber-400" /> Qo'shimcha Xavfsizlik
                </h3>
                <label className="flex items-center justify-between p-3.5 bg-[#1a1a1e] border border-white/10 rounded-xl cursor-pointer max-w-md">
                  <div>
                    <p className="text-xs text-gray-200 font-medium">2FA Autentifikatsiya</p>
                    <p className="text-[11px] text-gray-500">Kirishda SMS kod talab qilish</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={security.twoFactor}
                    onChange={(e) =>
                      setSecurity({ ...security, twoFactor: e.target.checked })
                    }
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!isSecurityChanged}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-500"
                >
                  <Save size={15} /> Parolni Yangilash
                </button>
              </div>
            </form>
          )}

          {activeTab === "notifications" && (
            <form onSubmit={handleNotificationsSave} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Bell size={16} className="text-amber-400" /> Bildirishnoma Sozlamalari
              </h3>

              <div className="space-y-3 max-w-md">
                <label className="flex items-center justify-between p-3.5 bg-[#1a1a1e] border border-white/10 rounded-xl cursor-pointer">
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

                <label className="flex items-center justify-between p-3.5 bg-[#1a1a1e] border border-white/10 rounded-xl cursor-pointer">
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
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={!isNotificationsChanged}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-500"
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