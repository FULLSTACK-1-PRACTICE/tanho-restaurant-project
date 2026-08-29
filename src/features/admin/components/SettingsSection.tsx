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
  Eye,
  EyeOff,
} from "lucide-react";

const INITIAL_SECURITY = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const INITIAL_NOTIFICATIONS = {
  newOrders: true,
  tableReservations: true,
  systemAlerts: false,
};

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState<
    "general" | "security" | "notifications"
  >("general");

  // Initial Restoran sozlamalari
  const [initialGeneral, setInitialGeneral] = useState(() => ({
    restaurantName:
      localStorage.getItem("restaurant_name") || "TANHO Restaurant",
    address: localStorage.getItem("restaurant_address") || "",
    phone: localStorage.getItem("restaurant_phone") || "",
    waiterFeePercent:
      localStorage.getItem("restaurant_waiter_fee") !== null
        ? Number(localStorage.getItem("restaurant_waiter_fee"))
        : 10,
  }));

  const [general, setGeneral] = useState(initialGeneral);

  // Xavfsizlik sozlamalari
  const [security, setSecurity] = useState(INITIAL_SECURITY);
  const [initialSecurity, setInitialSecurity] = useState(INITIAL_SECURITY);

  // Bildirishnoma sozlamalari
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [initialNotifications, setInitialNotifications] = useState(
    INITIAL_NOTIFICATIONS
  );

  // Parol ko'rinishi toggle
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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

  // Tablar bo'yicha o'zgarish bor-yo'qligini aniqlash
  const isGeneralChanged =
    general.restaurantName !== initialGeneral.restaurantName ||
    general.address !== initialGeneral.address ||
    general.phone !== initialGeneral.phone ||
    Number(general.waiterFeePercent) !==
      Number(initialGeneral.waiterFeePercent);

  const isSecurityChanged =
    security.currentPassword !== initialSecurity.currentPassword ||
    security.newPassword !== initialSecurity.newPassword ||
    security.confirmPassword !== initialSecurity.confirmPassword;

  const isNotificationsChanged =
    notifications.newOrders !== initialNotifications.newOrders ||
    notifications.tableReservations !== initialNotifications.tableReservations ||
    notifications.systemAlerts !== initialNotifications.systemAlerts;

  const isCurrentTabChanged =
    activeTab === "general"
      ? isGeneralChanged
      : activeTab === "security"
      ? isSecurityChanged
      : isNotificationsChanged;

  const validateGeneral = () => {
    const newErrors: typeof errors = {};

    if (!general.restaurantName.trim()) {
      newErrors.restaurantName = "Restoran nomi kiritilishi shart";
    } else if (!nameRegex.test(general.restaurantName.trim())) {
      newErrors.restaurantName = "Restoran nomi noto'g'ri formatda";
    }

    if (general.address.trim() && general.address.trim().length < 3) {
      newErrors.address = "Manzil juda qisqa";
    }

    if (!general.phone.trim()) {
      newErrors.phone = "Telefon raqam kiritilishi shart";
    } else if (!phoneRegex.test(general.phone.replace(/\s+/g, ""))) {
      newErrors.phone =
        "To'g'ri telefon raqam kiriting (masalan: +998901234567 yoki 901234567)";
    }

    const feeNum = Number(general.waiterFeePercent);
    if (isNaN(feeNum) || feeNum < 0 || feeNum > 100) {
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
      newErrors.newPassword =
        "Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak";
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

    if (!isCurrentTabChanged) return;
    if (activeTab === "general" && !validateGeneral()) return;
    if (activeTab === "security" && !validateSecurity()) return;

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (activeTab === "general") {
        localStorage.setItem(
          "restaurant_name",
          general.restaurantName.trim()
        );
        localStorage.setItem("restaurant_address", general.address.trim());
        localStorage.setItem("restaurant_phone", general.phone.trim());
        localStorage.setItem(
          "restaurant_waiter_fee",
          String(general.waiterFeePercent)
        );
        setInitialGeneral(general);
        window.dispatchEvent(new Event("settings-change"));
      } else if (activeTab === "security") {
        setInitialSecurity(security);
        setSecurity({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else if (activeTab === "notifications") {
        setInitialNotifications(notifications);
      }

      setSuccessMessage("Sozlamalar muvaffaqiyatli saqlandi!");
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
    const current = Number(general.waiterFeePercent) || 0;
    if (current < 100) {
      setGeneral({ ...general, waiterFeePercent: current + 1 });
      if (errors.waiterFeePercent)
        setErrors((p) => ({ ...p, waiterFeePercent: undefined }));
    }
  };

  const handleDecrement = () => {
    const current = Number(general.waiterFeePercent) || 0;
    if (current > 0) {
      setGeneral({ ...general, waiterFeePercent: current - 1 });
      if (errors.waiterFeePercent)
        setErrors((p) => ({ ...p, waiterFeePercent: undefined }));
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-xl border bg-[#1a1a1e] px-3.5 py-2.5 text-sm text-white outline-none transition-colors ${
      hasError
        ? "border-red-500/60 focus:border-red-500"
        : "border-white/10 focus:border-amber-500/50"
    }`;

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Sozlamalar</h1>
        <p className="mt-1 text-xs text-gray-400">
          Restoran tizimi, xavfsizlik va bildirishnomalarni sozlash.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        {/* Navigation Tab */}
        <div className="no-scrollbar flex border-b border-white/5 pb-2 gap-1 overflow-x-auto md:flex-col md:border-b-0 md:pb-0">
          <button
            onClick={() => {
              setActiveTab("general");
              setSuccessMessage("");
              setErrors({});
            }}
            className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
              activeTab === "general"
                ? "border border-amber-500/20 bg-amber-500/15 text-amber-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Store size={16} /> <span>Restoran Sozlamalari</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("security");
              setSuccessMessage("");
              setErrors({});
            }}
            className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
              activeTab === "security"
                ? "border border-amber-500/20 bg-amber-500/15 text-amber-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Lock size={16} /> <span>Xavfsizlik</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("notifications");
              setSuccessMessage("");
              setErrors({});
            }}
            className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
              activeTab === "notifications"
                ? "border border-amber-500/20 bg-amber-500/15 text-amber-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Bell size={16} /> <span>Bildirishnomalar</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="space-y-5 rounded-2xl border border-white/5 bg-[#111113] p-5 shadow-xl sm:p-6">
          {successMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-400">
              <Check size={16} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errors.general && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-400">
              {errors.general}
            </div>
          )}

          {/* Tab 1: Restoran Sozlamalari */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Restoran nomi
                </label>
                <input
                  value={general.restaurantName}
                  onChange={(e) => {
                    setGeneral({
                      ...general,
                      restaurantName: e.target.value,
                    });
                    if (errors.restaurantName)
                      setErrors((p) => ({
                        ...p,
                        restaurantName: undefined,
                      }));
                  }}
                  className={inputClass(!!errors.restaurantName)}
                />
                {errors.restaurantName && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.restaurantName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Manzil
                </label>
                <input
                  value={general.address}
                  placeholder="Masalan: Samarqand sh., Registon ko'chasi"
                  onChange={(e) => {
                    setGeneral({ ...general, address: e.target.value });
                    if (errors.address)
                      setErrors((p) => ({ ...p, address: undefined }));
                  }}
                  className={inputClass(!!errors.address)}
                />
                {errors.address && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Telefon
                </label>
                <input
                  value={general.phone}
                  placeholder="+998901234567"
                  onChange={(e) => {
                    setGeneral({ ...general, phone: e.target.value });
                    if (errors.phone)
                      setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  className={inputClass(!!errors.phone)}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Afitsiant (xizmat) haqi — umumiy shotdan foiz (%)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={general.waiterFeePercent}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      setGeneral({ ...general, waiterFeePercent: val });
                      if (errors.waiterFeePercent)
                        setErrors((p) => ({
                          ...p,
                          waiterFeePercent: undefined,
                        }));
                    }}
                    className={`w-full rounded-xl border bg-[#1a1a1e] px-3.5 py-2.5 pr-20 text-sm text-white outline-none transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                      errors.waiterFeePercent
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-amber-500/50"
                    }`}
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
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
            </div>
          )}

          {/* Tab 2: Xavfsizlik */}
          {activeTab === "security" && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Joriy parol
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={security.currentPassword}
                    onChange={(e) => {
                      setSecurity({
                        ...security,
                        currentPassword: e.target.value,
                      });
                      if (errors.currentPassword)
                        setErrors((p) => ({
                          ...p,
                          currentPassword: undefined,
                        }));
                    }}
                    className={inputClass(!!errors.currentPassword)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(!showCurrentPassword)
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Yangi parol
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={security.newPassword}
                    onChange={(e) => {
                      setSecurity({
                        ...security,
                        newPassword: e.target.value,
                      });
                      if (errors.newPassword)
                        setErrors((p) => ({
                          ...p,
                          newPassword: undefined,
                        }));
                    }}
                    className={inputClass(!!errors.newPassword)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Yangi parolni tasdiqlang
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={security.confirmPassword}
                  onChange={(e) => {
                    setSecurity({
                      ...security,
                      confirmPassword: e.target.value,
                    });
                    if (errors.confirmPassword)
                      setErrors((p) => ({
                        ...p,
                        confirmPassword: undefined,
                      }));
                  }}
                  className={inputClass(!!errors.confirmPassword)}
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
            <div className="max-w-md space-y-3">
              <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#1a1a1e] p-3.5">
                <span className="text-xs font-medium text-gray-200">
                  Yangi buyurtmalar va bildirishnomalar
                </span>
                <input
                  type="checkbox"
                  checked={notifications.newOrders}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      newOrders: e.target.checked,
                    })
                  }
                  className="h-4 w-4 shrink-0 cursor-pointer rounded accent-amber-500"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#1a1a1e] p-3.5">
                <span className="text-xs font-medium text-gray-200">
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
                  className="h-4 w-4 shrink-0 cursor-pointer rounded accent-amber-500"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#1a1a1e] p-3.5">
                <span className="text-xs font-medium text-gray-200">
                  Tizim va xavfsizlik ogohlantirishlari
                </span>
                <input
                  type="checkbox"
                  checked={notifications.systemAlerts}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      systemAlerts: e.target.checked,
                    })
                  }
                  className="h-4 w-4 shrink-0 cursor-pointer rounded accent-amber-500"
                />
              </label>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !isCurrentTabChanged}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-semibold text-black transition-all hover:bg-amber-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-amber-500 sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Saqlanmoqda...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 text-black" />
                  <span>
                    {activeTab === "security"
                      ? "Parolni Yangilash"
                      : "Saqlash"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}