import { useState } from "react";

// Rasmni base64 ga o'tkazish funksiyasi (agar util faylingizda bo'lsa import qiling)
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

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setPhoto(await fileToBase64(file));
    } catch (error) {
      alert(
        "Rasmni yuklashda xatolik: " +
          (error instanceof Error ? error.message : "Noma'lum xatolik")
      );
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      alert("Saqlandi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-xl font-semibold">Profil</h1>

      <div className="space-y-4 rounded-xl border border-white/10 bg-[#121619] p-6">
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

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="text-xs"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">Ism</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-400">Telefon</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#0d1114] px-3 py-2 text-sm outline-none focus:border-[#d9a441]/50"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer rounded-lg bg-[#d9a441] px-4 py-2 text-sm font-medium text-black hover:bg-[#edbd58] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
}