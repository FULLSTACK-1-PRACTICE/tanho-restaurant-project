import { useState } from "react";
import {
  Save,
  Loader2,
  Camera,
  Check,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Activity,
  Clock,
  ArrowLeft,
} from "lucide-react";

const INITIAL_DATA = {
  name: "Admin Boshqaruvchi",
  email: "admin@tanhorestaurant.uz",
  phone: "+998 90 123 45 67",
  photo: "",
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface ProfileSectionProps {
  onGoHome?: () => void;
}

export function ProfileSection({ onGoHome }: ProfileSectionProps) {
  const [initialData, setInitialData] = useState(INITIAL_DATA);
  const [name, setName] = useState(INITIAL_DATA.name);
  const [email, setEmail] = useState(INITIAL_DATA.email);
  const [phone, setPhone] = useState(INITIAL_DATA.phone);
  const [photo, setPhoto] = useState(INITIAL_DATA.photo);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
    general?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const nameRegex = /^[A-Za-zʻ’'`\s-]{2,50}$/;
  const phoneRegex = /^(\+?998)?[0-9]{9}$/;

  const isChanged =
    name !== initialData.name ||
    email !== initialData.email ||
    phone !== initialData.phone ||
    photo !== initialData.photo;

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrors((prev) => ({ ...prev, photo: undefined }));

    try {
      setPhoto(await fileToBase64(file));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        photo:
          "Rasmni yuklashda xatolik: " +
          (error instanceof Error ? error.message : "Noma'lum xatolik"),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Ism kiritilishi shart";
    } else if (!nameRegex.test(name.trim())) {
      newErrors.name =
        "Ism faqat harflardan iborat va kamida 2 ta belgidan iborat bo'lishi kerak";
    }

    if (!phone.trim()) {
      newErrors.phone = "Telefon raqam kiritilishi shart";
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone =
        "To'g'ri telefon raqam kiriting (masalan: +998901234567 yoki 901234567)";
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
      setInitialData({ name, email, phone, photo });
      setSuccessMessage("Profil ma'lumotlari saqlandi!");
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Saqlashda xatolik yuz berdi. Qayta urinib ko'ring.",
      }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {onGoHome && (
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-white md:hidden"
        >
          <ArrowLeft size={16} />
          <span>Bosh sahifaga qaytish</span>
        </button>
      )}

      <div>
        <h1 className="text-2xl font-bold text-white">Profil</h1>
        <p className="mt-1 text-xs text-gray-400">
          Shaxsiya ma'lumotlaringiz va profil sozlamalarini boshqaring.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-400">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-black">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {errors.general && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-400">
          {errors.general}
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#141416] shadow-2xl">
        <div className="relative h-36 w-full bg-[#271e16]/60 p-4">
          <div className="flex justify-end">
            <span className="rounded-full border border-amber-500/20 bg-[#2b2219] px-3 py-1 text-xs font-medium text-amber-500">
              Bosh Administrator
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#141416] bg-[#1c1d22] text-3xl font-bold text-amber-500 shadow-2xl">
                {photo ? (
                  <img
                    loading="lazy"
                    src={photo}
                    alt="Profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="mb-1 space-y-0.5">
                <h2 className="text-xl font-bold text-white">{name}</h2>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            </div>

            <div className="shrink-0">
              <label
                htmlFor="admin-photo-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-[#1e1f23] px-3.5 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 active:scale-95"
              >
                <Camera size={14} className="text-amber-500" />
                <span>Rasmni almashtirish</span>
              </label>
              <input
                id="admin-photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="hidden"
              />
              {errors.photo && (
                <p className="mt-1.5 text-[11px] text-red-400">{errors.photo}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                <User size={14} className="text-gray-400" />
                <span>F.I.Sh (Ism va Familiya)</span>
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
                className={`w-full rounded-xl border bg-[#1a1b1e] px-3.5 py-2.5 text-sm font-medium text-white outline-none transition-colors ${
                  errors.name
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/5 focus:border-amber-500/40"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                <Phone size={14} className="text-gray-400" />
                <span>Telefon raqami</span>
              </label>
              <input
                value={phone}
                placeholder="+998 90 123 45 67"
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
                className={`w-full rounded-xl border bg-[#1a1b1e] px-3.5 py-2.5 text-sm font-medium text-white outline-none transition-colors ${
                  errors.phone
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/5 focus:border-amber-500/40"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                <Mail size={14} className="text-gray-400" />
                <span>Email manzili</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-[#1a1b1e] px-3.5 py-2.5 text-sm font-medium text-white outline-none transition-colors focus:border-amber-500/40"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                <Shield size={14} className="text-gray-400" />
                <span>Tizimdagi Rol va Ruxsatlar</span>
              </label>
              <input
                value="Bosh Administrator (To'liq huquqli)"
                disabled
                readOnly
                className="w-full cursor-not-allowed select-none rounded-xl border border-white/5 bg-[#1a1b1e] px-3.5 py-2.5 text-sm font-medium text-amber-500/90 outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || !isChanged}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#c2862b] px-5 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:bg-[#d49432] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#c2862b]"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Saqlanmoqda...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 text-black" />
                  <span>O'zgarishlarni Saqlash</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#141416] p-4 shadow-xl">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Bugungi Rezervatsiyalar</p>
            <p className="text-lg font-bold text-white">2 ta</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#141416] p-4 shadow-xl">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Tizim holati</p>
            <p className="text-lg font-bold text-emerald-500">Faol</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#141416] p-4 shadow-xl">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-500">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Oxirgi kirish</p>
            <p className="text-lg font-bold text-white">Bugun, 09:15</p>
          </div>
        </div>
      </div>
    </div>
  );
}