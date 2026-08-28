import React, { useState } from 'react';
import { Grid, Users, X, ShoppingBag, CreditCard } from 'lucide-react';
import { initialTables } from '@/data/cashierData';
import type { Table } from '@/data/cashierData';

export const CashierTable: React.FC = () => {
  const [tables] = useState<Table[]>(initialTables);
  const [filter, setFilter] = useState<string>('all');
  const [selectedTableModal, setSelectedTableModal] = useState<Table | null>(null);

  const filteredTables = tables.filter(t => filter === 'all' || t.status === filter);

  const getStatusBadge = (status: Table['status']) => {
    switch (status) {
      case 'free': return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-medium">Bo'sh</span>;
      case 'busy': return <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 font-medium">Band</span>;
      case 'reserved': return <span className="px-2 py-0.5 rounded text-[10px] text-zinc-950 font-semibold" style={{ backgroundColor: '#F6B530' }}>Rezerv</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#141414] p-4 rounded-xl border border-[#222] flex gap-2 overflow-x-auto">
        {['all', 'free', 'busy', 'reserved'].map((s) => (
          <button 
            key={s} 
            onClick={() => setFilter(s)}
            style={filter === s ? { backgroundColor: '#F6B530', color: '#09090b' } : {}}
            className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition whitespace-nowrap ${
              filter === s ? 'font-semibold' : 'bg-[#1c1c1c] text-zinc-400 hover:text-zinc-200 border border-[#2a2a2a]'
            }`}
          >
            {s === 'all' ? 'Barchasi' : s === 'free' ? 'Bo\'sh' : s === 'busy' ? 'Band' : 'Rezerv'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTables.map((t) => (
          <div 
            key={t.id} 
            onClick={() => {
              if (t.status === 'busy') {
                setSelectedTableModal(t);
              }
            }}
            className={`bg-[#141414] border border-[#222] p-5 rounded-xl flex flex-col justify-between gap-4 transition-all ${
              t.status === 'busy' ? 'cursor-pointer hover:border-[#F6B530]/60 hover:bg-[#181818]' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Grid size={18} style={{ color: '#F6B530' }} />
                <span className="font-semibold text-base text-zinc-200">Stol #{t.id}</span>
              </div>
              {getStatusBadge(t.status)}
            </div>

            <div className="space-y-1.5 text-xs text-zinc-400">
              <p>Zal: <span className="text-zinc-200 font-medium">{t.hall}</span></p>
              <p className="flex items-center gap-1.5"><Users size={14} className="text-zinc-500" /> {t.seats} kishilik</p>
              {t.order && (
                <div className="mt-2 pt-2 border-t border-[#222] text-zinc-200 space-y-1">
                  <p>Buyurtma: {t.order.id}</p>
                  <p className="font-semibold" style={{ color: '#F6B530' }}>{t.order.total}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedTableModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#222] rounded-2xl w-full max-w-md p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setSelectedTableModal(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-[#222] pb-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
                <ShoppingBag size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-200">Stol #{selectedTableModal.id} ma'lumotlari</h3>
                <p className="text-xs text-zinc-400">Zal: {selectedTableModal.hall} • {selectedTableModal.seats} kishilik</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c]/50 rounded-xl p-4 space-y-3 text-xs border border-[#222]">
              <div className="flex justify-between text-zinc-400">
                <span>Buyurtma raqami:</span>
                <span className="text-zinc-200 font-medium">{selectedTableModal.order?.id || 'Noma\'lum'}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Holati:</span>
                <span className="text-red-400 font-medium">Band (Xizmat ko'rsatilmoqda)</span>
              </div>
              <div className="border-t border-[#2a2a2a] pt-3 flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">Joriy to'lov summasi:</span>
                <span className="font-bold text-base" style={{ color: '#F6B530' }}>
                  {selectedTableModal.order?.total || '0 so\'m'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTableModal(null)}
              style={{ backgroundColor: '#F6B530', color: '#09090b' }}
              className="w-full py-2.5 hover:opacity-90 font-semibold rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard size={16} /> Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierTable;