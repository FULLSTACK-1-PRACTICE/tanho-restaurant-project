import React from 'react';
import { Printer } from 'lucide-react';

export const ReceiptsView: React.FC = () => {
  return (
    <div className="bg-[#141414] p-6 rounded-xl border border-[#222] space-y-6 max-w-md mx-auto">
      <div className="text-center border-b border-[#222] pb-4">
        <h3 className="font-bold text-lg text-zinc-200">RESTORAN KASSASI</h3>
        <p className="text-xs text-zinc-400">Soliq cheki namunasi</p>
      </div>
      <div className="space-y-2 text-xs text-zinc-300">
        <div className="flex justify-between"><span>Chek ID:</span> <span className="text-zinc-200 font-medium">#CH-8921</span></div>
        <div className="flex justify-between"><span>Sana:</span> <span className="text-zinc-200 font-medium">24.08.2026 21:00</span></div>
        <div className="border-t border-dashed border-[#2a2a2a] my-2 pt-2 space-y-1">
          <div className="flex justify-between"><span>Filadelfiya maki x2</span> <span>90,000 so'm</span></div>
          <div className="flex justify-between"><span>Coca Cola 1L x1</span> <span>15,000 so'm</span></div>
        </div>
        <div className="border-t border-[#222] pt-2 flex justify-between font-bold text-sm">
          <span className="text-zinc-300">Jami:</span>
          <span style={{ color: '#F6B530' }}>105,000 so'm</span>
        </div>
      </div>
      <button 
        onClick={() => alert("Chek printerga jo'natildi!")} 
        style={{ backgroundColor: '#F6B530', color: '#09090b' }}
        className="w-full py-3 hover:opacity-90 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-black/20"
      >
        <Printer size={16} /> Chekni qayta chop etish
      </button>
    </div>
  );
};

export default ReceiptsView;