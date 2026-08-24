import React from 'react';
import { Grid, Utensils, Users } from 'lucide-react';
import { initialTables, cashierMenuItems } from '@/data/cashierData';
import { CashierTable } from './CashierTable';

export const CashierPage: React.FC = () => {
  const busyTablesCount = initialTables.filter(t => t.status === 'busy').length;
  const freeTablesCount = initialTables.filter(t => t.status === 'free').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] p-5 rounded-xl border border-[#222]">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-xs">Band stollar</span>
            <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold mt-2" style={{ color: '#F6B530' }}>
            {busyTablesCount} <span className="text-xs font-normal text-zinc-400">ta</span>
          </div>
          <div className="text-zinc-400 text-xs mt-1">Hozirda xizmat ko'rsatilmoqda</div>
        </div>

        <div className="bg-[#141414] p-5 rounded-xl border border-[#222]">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-xs">Bo'sh stollar</span>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Grid size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">
            {freeTablesCount} <span className="text-xs font-normal text-zinc-400">ta</span>
          </div>
          <div className="text-zinc-400 text-xs mt-1">Mijozlar uchun tayyor</div>
        </div>

        <div className="bg-[#141414] p-5 rounded-xl border border-[#222]">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-xs">Menyu taomlari</span>
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
              <Utensils size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold mt-2 text-zinc-200">
            {cashierMenuItems.length} <span className="text-xs font-normal text-zinc-400">ta</span>
          </div>
          <div className="text-zinc-400 text-xs mt-1">Faol mahsulotlar</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-zinc-200">Stollar holati sharhi</h3>
        <CashierTable />
      </div>
    </div>
  );
};

export default CashierPage;