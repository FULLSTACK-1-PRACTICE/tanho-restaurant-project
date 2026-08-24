import React from 'react';
import { User, Phone, Shield, Calendar } from 'lucide-react';

export const CashierProfile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-2 sm:p-4 md:p-6">
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-4 sm:p-6 md:p-8 relative shadow-xl">
        
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#222]">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F6B530] text-[#09090b] flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg shadow-black/30">
            K
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-200">Kassir Xodim</h2>
            <p className="text-xs sm:text-sm text-[#F6B530] font-medium mt-1">Cashier Role</p>
            <p className="text-[11px] sm:text-xs text-zinc-400 mt-2">Restoran kassa bo'limi mas'ul xodimi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F6B530]/10 text-[#F6B530]">
              <User size={20} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400">F.I.O</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-200">Izzatbek Xaydarov</p>
            </div>
          </div>

          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F6B530]/10 text-[#F6B530]">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400">Telefon raqam</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-200">+998 90 123 45 67</p>
            </div>
          </div>

          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F6B530]/10 text-[#F6B530]">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400">Tizimdagi huquqi</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-200">Kassir (Cashier)</p>
            </div>
          </div>

          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F6B530]/10 text-[#F6B530]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400">Ish vaqti</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-200">09:00 - 21:00</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CashierProfile;