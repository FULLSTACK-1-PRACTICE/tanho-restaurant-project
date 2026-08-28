import { useState } from "react";
import { toast } from "sonner";
import { Camera, Save, User, Mail, Phone, Shield } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Menejer Boshqaruvchi");
  const [email, setEmail] = useState("manager@tanhorestaurant.uz");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      toast.info("Rasm tanlandi");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil ma'lumotlari saqlandi!");
  };

  const inputClass =
    "w-full px-3.5 py-2.5 bg-[#1a1a1e] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors";

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profil</h1>
        <p className="text-xs text-gray-400 mt-1">
          Shaxsiy ma'lumotlaringiz va profil sozlamalarini boshqaring.
        </p>
      </div>

      <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-full bg-[#1a1a1e] border border-white/10 flex items-center justify-center overflow-hidden group">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-amber-400">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
              >
                <Camera size={14} className="text-amber-400" />
                Rasm tanlash
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-[11px] text-gray-500 mt-1.5">
                PNG, JPG yoki WEBP formatidagi rasmlar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                <User size={12} className="inline mr-1" /> F.I.Sh (Ism va Familiya)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                <Phone size={12} className="inline mr-1" /> Telefon raqami
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                <Mail size={12} className="inline mr-1" /> Email manzili
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                <Shield size={12} className="inline mr-1" /> Lavozimi
              </label>
              <input
                type="text"
                value="Restoran Menejeri"
                disabled
                className="w-full px-3.5 py-2.5 bg-[#141417] border border-white/5 rounded-xl text-sm text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save size={15} />
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}