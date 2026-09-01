import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Camera,
  Save,
  User,
  Mail,
  Phone,
  Shield,
  Activity,
  Clock,
  CalendarCheck,
} from "lucide-react";

const INITIAL_DATA = {
  name: "Menejer Boshqaruvchi",
  email: "manager@tanhorestaurant.uz",
  phone: "+998 90 123 45 67",
  role: "Restoran Menejeri (Cheklangan huquq)",
  avatar: null as string | null,
};

const ALLOWED_DOMAINS = [
  "com",
  "uz",
  "ru",
  "co",
  "io",
  "me",
  "biz",
];

const PHONE_REGEX = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,10})$/;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [initialData, setInitialData] = useState(INITIAL_DATA);

  const isChanged =
    formData.name !== initialData.name ||
    formData.email !== initialData.email ||
    formData.phone !== initialData.phone ||
    formData.avatar !== initialData.avatar;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;

    if (!inputVal.startsWith("+998")) {
      inputVal = "+998";
    }

    const digitsAfterPrefix = inputVal.slice(4).replace(/\D/g, "");
    const limitedDigits = digitsAfterPrefix.slice(0, 9);

    let formattedPhone = "+998";
    if (limitedDigits.length > 0) {
      formattedPhone += " " + limitedDigits.slice(0, 2);
    }
    if (limitedDigits.length > 2) {
      formattedPhone += " " + limitedDigits.slice(2, 5);
    }
    if (limitedDigits.length > 5) {
      formattedPhone += " " + limitedDigits.slice(5, 7);
    }
    if (limitedDigits.length > 7) {
      formattedPhone += " " + limitedDigits.slice(7, 9);
    }

    setFormData((prev) => ({ ...prev, phone: formattedPhone }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
      toast.info("Rasm tanlandi");
    }
  };

  const validateEmail = (email: string) => {
    const match = email.trim().match(EMAIL_REGEX);
    if (!match) return false;

    const domainExtension = match[1].toLowerCase();
    return ALLOWED_DOMAINS.includes(domainExtension);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;

    if (!validateEmail(formData.email)) {
      toast.error(
        "Noto'g'ri email domeni kiritildi! Faqat haqiqiy email domenlariga ruxsat berilgan (.com, .uz, .ru va h.k.)"
      );
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 12 || !PHONE_REGEX.test(formData.phone.trim())) {
      toast.error("Telefon raqami to'liq 9 ta raqamdan iborat bo'lishi kerak!");
      return;
    }

    setInitialData(formData);
    toast.success("Profil ma'lumotlari saqlandi!");
  };

  const inputClass =
    "w-full px-3.5 py-2.5 bg-[#1a1b1e] border border-white/5 rounded-xl text-sm font-medium text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/40 transition-colors";

  const disabledInputClass =
    "w-full px-3.5 py-2.5 bg-[#1a1b1e] border border-white/5 rounded-xl text-sm font-medium text-amber-500/90 cursor-not-allowed select-none truncate";

  return (
    <div className="w-full space-y-6">
      <button
        type="button"
        onClick={() => navigate("/manager/bosh-sahifa")}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-normal text-gray-400 transition-colors hover:text-white cursor-pointer md:hidden"
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        <span>Bosh sahifaga qaytish</span>
      </button>

      <div>
        <h1 className="text-2xl font-bold text-white">Profil</h1>
        <p className="mt-1 text-xs text-gray-400">
          Shaxsiy ma'lumotlaringiz va profil sozlamalarini boshqaring.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#141416] shadow-2xl">
        <div className="relative h-36 w-full bg-[#271e16]/60 p-4">
          <div className="flex justify-end">
            <span className="rounded-full border border-amber-500/20 bg-[#2b2219] px-3 py-1 text-xs font-medium text-amber-500">
              Restoran Menejeri
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#141416] bg-[#1c1d22] text-3xl font-bold text-amber-500 shadow-2xl">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  formData.name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="mb-1 space-y-0.5">
                <h2 className="text-xl font-bold text-white">{formData.name}</h2>
                <p className="text-xs text-gray-400">{formData.email}</p>
              </div>
            </div>

            <div className="shrink-0">
              <label
                htmlFor="avatar-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-[#1e1f23] px-3.5 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 active:scale-95"
              >
                <Camera size={14} className="text-amber-500" />
                <span>Rasmni almashtirish</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <User size={14} className="text-gray-400" />
                  <span>F.I.Sh (Ism va Familiya)</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <Phone size={14} className="text-gray-400" />
                  <span>Telefon raqami</span>
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <Mail size={14} className="text-gray-400" />
                  <span>Email manzili</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <Shield size={14} className="text-gray-400" />
                  <span>Tizimdagi Rol va Ruxsatlar</span>
                </label>
                <input
                  type="text"
                  value="Restoran Menejeri (Cheklangan huquq)"
                  disabled
                  readOnly
                  className={disabledInputClass}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!isChanged}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#c2862b] px-5 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:bg-[#d49432] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#c2862b]"
              >
                <Save size={15} />
                <span>O'zgarishlarni Saqlash</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#141416] p-4 shadow-xl">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
            <CalendarCheck size={20} />
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