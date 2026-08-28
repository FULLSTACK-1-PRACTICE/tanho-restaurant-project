import React from 'react';
import { TrendingUp } from 'lucide-react';

export const CashierReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] p-5 rounded-xl border border-[#222]">
          <span className="text-zinc-400 text-xs">Kunlik tushum</span>
          <div className="text-2xl font-bold mt-1 text-zinc-200">8,450,000 <span className="text-xs font-normal text-zinc-400">so'm</span></div>
          <div className="text-emerald-500 text-xs flex items-center gap-1 mt-2"><TrendingUp size={14} /> +15% o'sish</div>
        </div>
        <div className="bg-[#141414] p-5 rounded-xl border border-[#222]">
          <span className="text-zinc-400 text-xs">Naqd pul ulushi</span>
          <div className="text-2xl font-bold mt-1 text-zinc-200">5,620,000 <span className="text-xs font-normal text-zinc-400">so'm</span></div>
          <div className="text-zinc-400 text-xs mt-2">Jami tushumning 66%</div>
        </div>
        <div className="bg-[#141414] p-5 rounded-xl border border-[#222]">
          <span className="text-zinc-400 text-xs">Terminal (Plastik)</span>
          <div className="text-2xl font-bold mt-1 text-zinc-200">2,830,000 <span className="text-xs font-normal text-zinc-400">so'm</span></div>
          <div className="text-zinc-400 text-xs mt-2">Jami tushumning 34%</div>
        </div>
      </div>
    </div>
  );
};

export default CashierReports;