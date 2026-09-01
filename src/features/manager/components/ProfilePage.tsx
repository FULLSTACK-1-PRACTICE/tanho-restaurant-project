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

    "biz"

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
    "w-full px-3.5 py-2.5 bg-[#1a1a1e] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors";

  const disabledInputClass =
    "w-full px-3.5 py-2.5 bg-[#1a1a1e]/50 border border-white/10 rounded-xl text-sm text-amber-500/90 font-medium cursor-not-allowed opacity-80 select-none truncate";

  return (
    <div className="max-w-4xl space-y-6">
      <button type="button" onClick={() => navigate("/manager/bosh-sahifa")} className="inline-flex md:hidden w-fit items-center gap-1.5 text-xs font-normal text-gray-400 hover:text-white transition-colors cursor-pointer">
        <ArrowLeft size={16} strokeWidth={1.8} />
        <span>Bosh sahifaga qaytish</span>
      </button>
      <div>
        <h1 className="text-2xl font-bold text-white">Profil</h1>
        <p className="mt-1 text-xs text-gray-400">
          Shaxsiy ma'lumotlaringiz va profil sozlamalarini boshqaring.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#111113] shadow-xl">
        <div className="relative h-28 border-b border-white/5 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent">
          <div className="absolute top-3 right-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-400">
            Restoran Menejeri
          </div>
        </div>

        <div className="relative px-6 pt-0 pb-6">
          <div className="-mt-12 mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex items-end gap-4">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#111113] bg-[#1a1a1e] shadow-2xl ring-1 ring-white/10">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-amber-400">
                    {formData.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{formData.name}</h2>
                <p className="text-xs text-gray-400">{formData.email}</p>
              </div>
            </div>

            <label
              htmlFor="avatar-upload"
              className="inline-flex cursor-pointer items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-gray-200 transition-colors hover:bg-white/10 sm:self-auto"
            >
              <Camera size={14} className="text-amber-400" />
              Rasmni almashtirish
            </label>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  <User size={12} className="mr-1 inline" /> F.I.Sh (Ism va Familiya)
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
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  <Phone size={12} className="mr-1 inline" /> Telefon raqami
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
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  <Mail size={12} className="mr-1 inline" /> Email manzili
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
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  <Shield size={12} className="mr-1 inline" /> Tizimdagi Rol va Ruxsatlar
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
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-amber-500"
              >
                <Save size={15} />
                O'zgarishlarni Saqlash
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#111113] p-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-400">
            <CalendarCheck size={18} />
          </div>
          <div>
            <p className="text-[11px] text-gray-400">Bugungi Rezervatsiyalar</p>
            <p className="text-base font-bold text-white">2 ta</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#111113] p-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-[11px] text-gray-400">Tizim holati</p>
            <p className="text-base font-bold text-emerald-400">Faol</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#111113] p-4">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-[11px] text-gray-400">Oxirgi kirish</p>
            <p className="text-base font-bold text-white">Bugun, 09:15</p>
          </div>
        </div>
      </div>
    </div>
  );
}