import React, { useState } from 'react';
import { User, Lock, Printer, Save, CheckCircle2, Loader2 } from 'lucide-react';

export const CashierSettingsSection: React.FC = () => {
  const [fullName, setFullName] = useState<string>("Izzatbek Xaydarov");
  const [phone, setPhone] = useState<string>("+998 90 123 45 67");
  const [printerName, setPrinterName] = useState<string>("XP-80C (USB)");
  const [autoPrint, setAutoPrint] = useState<boolean>(true);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Sozlamalar va parol muvaffaqiyatli yangilandi!");
      setCurrentPassword("");
      setNewPassword("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch {
      setErrorMessage("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-2 sm:p-4 md:p-6">
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-4 sm:p-6 md:p-8 relative shadow-xl">
        
        <div className="mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-zinc-200 mb-1">Kassir Sozlamalari</h2>
          <p className="text-[11px] sm:text-xs text-zinc-400">Shaxsiy ma'lumotlar, xavfsizlik va kassa qurilma moslamalarini boshqarish</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-medium animate-fadeIn">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs font-medium animate-fadeIn">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-300 flex items-center gap-2 border-b border-[#222] pb-2">
              <User size={16} style={{ color: '#F6B530' }} /> Shaxsiy ma'lumotlar
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs text-zinc-400 mb-1">F.I.O (Ism familiya)</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs text-zinc-400 mb-1">Telefon raqam</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530] transition"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-300 flex items-center gap-2 border-b border-[#222] pb-2">
              <Printer size={16} style={{ color: '#F6B530' }} /> Kassa printeri moslamalari
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-[11px] sm:text-xs text-zinc-400 mb-1">Ulangan printer</label>
                <input 
                  type="text" 
                  value={printerName}
                  onChange={(e) => setPrinterName(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530] transition"
                />
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-5">
                <input 
                  type="checkbox" 
                  id="autoPrint"
                  checked={autoPrint}
                  onChange={(e) => setAutoPrint(e.target.checked)}
                  className="w-4 h-4 accent-[#F6B530] rounded cursor-pointer"
                />
                <label htmlFor="autoPrint" className="text-xs text-zinc-300 cursor-pointer select-none">
                  To'lov tasdiqlanganda chekni avtomatik chiqarish
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-300 flex items-center gap-2 border-b border-[#222] pb-2">
              <Lock size={16} style={{ color: '#F6B530' }} /> Xavfsizlik (Parolni o'zgartirish)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs text-zinc-400 mb-1">Joriy parol</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs text-zinc-400 mb-1">Yangi parol</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530] transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end">
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#F6B530', color: '#09090b' }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
              {loading ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CashierSettingsSection;