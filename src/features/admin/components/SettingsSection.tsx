import { useState } from "react";
import { Save, Loader2, Plus, Minus } from "lucide-react";

export function SettingsSection() {
  const [restaurantName, setRestaurantName] = useState(() => localStorage.getItem("restaurant_name") || "TANHO Restaurant");
  const [address, setAddress] = useState(() => localStorage.getItem("restaurant_address") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("restaurant_phone") || "");
  const [waiterFeePercent, setWaiterFeePercent] = useState<string | number>(() => {
    const savedFee = localStorage.getItem("restaurant_waiter_fee");
    return savedFee !== null ? Number(savedFee) : 10;
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{
    restaurantName?: string;
    address?: string;
    phone?: string;
    waiterFeePercent?: string;
    general?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const nameRegex = /^[A-Za-z0-9ʻ’'`\s-]{2,50}$/;
  const phoneRegex = /^(\+?998)?[0-9]{9}$/;

  const validateForm = () => {
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
      newErrors.phone = "To'g'ri telefon raqam kiriting (masalan: +998901234567 yoki 901234567)";
    }

    const feeNum = Number(waiterFeePercent);
    if (waiterFeePercent === "" || isNaN(feeNum) || feeNum < 0 || feeNum > 100) {
      newErrors.waiterFeePercent = "Foiz 0 dan 100 gacha bo'lishi kerak";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    setSuccessMessage("");
    if (!validateForm()) return;

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      localStorage.setItem("restaurant_name", restaurantName.trim());
      localStorage.setItem("restaurant_address", address.trim());
      localStorage.setItem("restaurant_phone", phone.trim());
      localStorage.setItem("restaurant_waiter_fee", String(waiterFeePercent));

      window.dispatchEvent(new Event("settings-change"));

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
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold text-white">Sozlamalar</h1>

      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
        {successMessage && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-xs text-green-400">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            {errors.general}
          </div>
        )}

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

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FF9500] px-7 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#ff8400] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-black" />
              <span>Saqlanmoqda...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4 text-black" strokeWidth={2.2} />
              <span>Saqlash</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}