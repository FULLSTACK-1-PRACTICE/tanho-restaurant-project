import { useState } from "react";
import {
  Save,
  Loader2,
  Plus,
  Minus,
  Store,
  Lock,
  Bell,
  Check,
} from "lucide-react";

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications">("general");

  // Restoran umumiy sozlamalari
  const [restaurantName, setRestaurantName] = useState(
    () => localStorage.getItem("restaurant_name") || "TANHO Restaurant"
  );
  const [address, setAddress] = useState(
    () => localStorage.getItem("restaurant_address") || ""
  );
  const [phone, setPhone] = useState(
    () => localStorage.getItem("restaurant_phone") || ""
  );
  const [waiterFeePercent, setWaiterFeePercent] = useState<string | number>(
    () => {
      const savedFee = localStorage.getItem("restaurant_waiter_fee");
      return savedFee !== null ? Number(savedFee) : 10;
    }
  );

  // Xavfsizlik sozlamalari
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Bildirishnoma sozlamalari
  const [notifications, setNotifications] = useState({
    newOrders: true,
    tableReservations: true,
    systemAlerts: false,
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{
    restaurantName?: string;
    address?: string;
    phone?: string;
    waiterFeePercent?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const nameRegex = /^[A-Za-z0-9ʻ’'`\s-]{2,50}$/;
  const phoneRegex = /^(\+?998)?[0-9]{9}$/;

  const validateGeneral = () => {
    const newErrors: typeof errors = {};

    if (!restaurantName.trim()) {
      newErrors.restaurantName = "Restoran nomi kiritilishi shart";
    } else if (!nameRegex.test(restaurantName.trim())) {
      newErrors.restaurantName = "Restoran nomi noto'g'ri formatda";
    }

    if (address.trim() && address.trim().length < 3) {
      newErrors.address = "Manzil juda qisqa";
    }

    if (!phone.trim()) {
      newErrors.phone = "Telefon raqam kiritilishi shart";
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone =
        "To'g'ri telefon raqam kiriting (masalan: +998901234567 yoki 901234567)";
    }

    const feeNum = Number(waiterFeePercent);
    if (waiterFeePercent === "" || isNaN(feeNum) || feeNum < 0 || feeNum > 100) {
      newErrors.waiterFeePercent = "Foiz 0 dan 100 gacha bo'lishi kerak";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecurity = () => {
    const newErrors: typeof errors = {};

    if (!security.currentPassword) {
      newErrors.currentPassword = "Joriy parolni kiriting";
    }
    if (!security.newPassword || security.newPassword.length < 6) {
      newErrors.newPassword = "Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak";
    }
    if (security.newPassword !== security.confirmPassword) {
      newErrors.confirmPassword = "Parollar bir xil emas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    setSuccessMessage("");
    setErrors({});

    if (activeTab === "general" && !validateGeneral()) return;
    if (activeTab === "security" && !validateSecurity()) return;

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (activeTab === "general") {
        localStorage.setItem("restaurant_name", restaurantName.trim());
        localStorage.setItem("restaurant_address", address.trim());
        localStorage.setItem("restaurant_phone", phone.trim());
        localStorage.setItem("restaurant_waiter_fee", String(waiterFeePercent));
        window.dispatchEvent(new Event("settings-change"));
      }

      setSuccessMessage("Sozlamalar muvaffaqiyatli saqlandi!");
      if (activeTab === "security") {
        setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Saqlashda xatolik yuz berdi. Qayta urinib ko'ring.",
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleIncrement = () => {
    const current = Number(waiterFeePercent) || 0;
    if (current < 100) {
      setWaiterFeePercent(current + 1);
      if (errors.waiterFeePercent)
        setErrors((p) => ({ ...p, waiterFeePercent: undefined }));
    }
  };

  const handleDecrement = () => {
    const current = Number(waiterFeePercent) || 0;
    if (current > 0) {
      setWaiterFeePercent(current - 1);
      if (errors.waiterFeePercent)
        setErrors((p) => ({ ...p, waiterFeePercent: undefined }));
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4 sm:space-y-5 px-1 sm:px-0">
      <h1 className="text-lg sm:text-xl font-semibold text-white">Sozlamalar</h1>

      {/* Responsive Tab bar (Scrollable on mobile) */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
        <button
          onClick={() => {
            setActiveTab("general");
            setSuccessMessage("");
            setErrors({});
          }}
          className={`flex shrink-0 items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "general"
              ? "bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/30"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Store size={15} /> <span>Restoran Sozlamalari</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("security");
            setSuccessMessage("");
            setErrors({});
          }}
          className={`flex shrink-0 items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "security"
              ? "bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/30"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Lock size={15} /> <span>Xavfsizlik</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("notifications");
            setSuccessMessage("");
            setErrors({});
          }}
          className={`flex shrink-0 items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "notifications"
              ? "bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/30"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Bell size={15} /> <span>Bildirishnomalar</span>
        </button>
      </div>

      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-4 sm:p-6">
        {successMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-xs text-green-400">
            <Check size={14} className="shrink-0" /> <span>{successMessage}</span>
          </div>
        )}

        {errors.general && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            {errors.general}
          </div>
        )}

        {/* Tab 1: Restoran Sozlamalari */}
        {activeTab === "general" && (
          <>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Restoran nomi</label>
              <input
                value={restaurantName}
                onChange={(e) => {
                  setRestaurantName(e.target.value);
                  if (errors.restaurantName)
                    setErrors((p) => ({ ...p, restaurantName: undefined }));
                }}
                className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
                  errors.restaurantName
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-[#FF9500]/50"
                }`}
              />
              {errors.restaurantName && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.restaurantName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">Manzil</label>
              <input
                value={address}
                placeholder="Masalan: Samarqand sh., Registon ko'chasi"
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors((p) => ({ ...p, address: undefined }));
                }}
                className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
                  errors.address
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-[#FF9500]/50"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-[11px] text-red-400">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">Telefon</label>
              <input
                value={phone}
                placeholder="+998901234567"
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
                className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
                  errors.phone
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-[#FF9500]/50"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Afitsiant (xizmat) haqi — umumiy shotdan foiz (%)
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={waiterFeePercent}
                  onChange={(e) => {
                    setWaiterFeePercent(e.target.value);
                    if (errors.waiterFeePercent)
                      setErrors((p) => ({ ...p, waiterFeePercent: undefined }));
                  }}
                  className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 pr-20 text-sm text-white outline-none transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                    errors.waiterFeePercent
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 focus:border-[#FF9500]/50"
                  }`}
                />
                <div className="absolute right-1.5 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              {errors.waiterFeePercent ? (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.waiterFeePercent}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-gray-500">
                  Har bir mijozning shotiga shu foiz avtomatik qo'shiladi.
                </p>
              )}
            </div>
          </>
        )}

        {/* Tab 2: Xavfsizlik */}
        {activeTab === "security" && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Joriy parol</label>
              <input
                type="password"
                placeholder="••••••••"
                value={security.currentPassword}
                onChange={(e) => {
                  setSecurity({ ...security, currentPassword: e.target.value });
                  if (errors.currentPassword)
                    setErrors((p) => ({ ...p, currentPassword: undefined }));
                }}
                className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
                  errors.currentPassword
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-[#FF9500]/50"
                }`}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">Yangi parol</label>
              <input
                type="password"
                placeholder="••••••••"
                value={security.newPassword}
                onChange={(e) => {
                  setSecurity({ ...security, newPassword: e.target.value });
                  if (errors.newPassword)
                    setErrors((p) => ({ ...p, newPassword: undefined }));
                }}
                className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
                  errors.newPassword
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-[#FF9500]/50"
                }`}
              />
              {errors.newPassword && (
                <p className="mt-1 text-[11px] text-red-400">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Yangi parolni tasdiqlang
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={security.confirmPassword}
                onChange={(e) => {
                  setSecurity({ ...security, confirmPassword: e.target.value });
                  if (errors.confirmPassword)
                    setErrors((p) => ({ ...p, confirmPassword: undefined }));
                }}
                className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
                  errors.confirmPassword
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-[#FF9500]/50"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Bildirishnomalar */}
        {activeTab === "notifications" && (
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 sm:p-3.5 bg-[#0d1114] border border-white/10 rounded-xl cursor-pointer gap-2">
              <span className="text-xs text-gray-200 font-medium">
                Yangi buyurtmalar va bildirishnomalar
              </span>
              <input
                type="checkbox"
                checked={notifications.newOrders}
                onChange={(e) =>
                  setNotifications({ ...notifications, newOrders: e.target.checked })
                }
                className="accent-[#FF9500] w-4 h-4 rounded cursor-pointer shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 sm:p-3.5 bg-[#0d1114] border border-white/10 rounded-xl cursor-pointer gap-2">
              <span className="text-xs text-gray-200 font-medium">
                Stol bron qilish xabarnomalari
              </span>
              <input
                type="checkbox"
                checked={notifications.tableReservations}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    tableReservations: e.target.checked,
                  })
                }
                className="accent-[#FF9500] w-4 h-4 rounded cursor-pointer shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 sm:p-3.5 bg-[#0d1114] border border-white/10 rounded-xl cursor-pointer gap-2">
              <span className="text-xs text-gray-200 font-medium">
                Tizim va xavfsizlik ogohlantirishlari
              </span>
              <input
                type="checkbox"
                checked={notifications.systemAlerts}
                onChange={(e) =>
                  setNotifications({ ...notifications, systemAlerts: e.target.checked })
                }
                className="accent-[#FF9500] w-4 h-4 rounded cursor-pointer shrink-0"
              />
            </label>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FF9500] px-7 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#ff8400] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-black" />
              <span>Saqlanmoqda...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4 text-black" strokeWidth={2.2} />
              <span>
                {activeTab === "security" ? "Parolni Yangilash" : "Saqlash"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}