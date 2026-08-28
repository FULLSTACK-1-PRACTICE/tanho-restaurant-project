import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function ProfileSection() {
  const [name, setName] = useState("Admin");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    photo?: string;
    general?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const nameRegex = /^[A-Za-zʻ’'`\s-]{2,50}$/;
  const phoneRegex = /^(\+?998)?[0-9]{9}$/;

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
      setSuccessMessage("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
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
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold text-white">Profil</h1>

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

        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-[#191e22]">
            {photo && (
              <img
                src={photo}
                alt="Profil"
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="text-xs text-gray-400 file:mr-2 file:cursor-pointer file:rounded-md file:border-0 file:bg-white/10 file:px-2.5 file:py-1 file:text-xs file:text-white hover:file:bg-white/20"
            />
            {errors.photo && (
              <span className="text-[11px] text-red-400">{errors.photo}</span>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">Ism</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            className={`w-full rounded-lg border bg-[#0d1114] px-3 py-2 text-sm text-white outline-none transition-colors ${
              errors.name
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-[#FF9500]/50"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>
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

        {/* Rasmdagi uslubga mos to'liq yumaloq (rounded-full) tugma */}
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