import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, ChefHat, CreditCard, ChevronRight, X, Utensils } from 'lucide-react';

const mockOrders = [
  {
    id: '1024',
    table: '01',
    hall: 'Asosiy zal',
    status: 'pending',
    time: '14:30',
    guestCount: 4,
    waiter: 'Azizbek',
    items: [
      { name: 'Filadelfiya maki', qty: 2, price: 45000 },
      { name: 'Coca Cola 1L', qty: 1, price: 15000 }
    ],
    total: 105000
  },
  {
    id: '1025',
    table: '03',
    hall: 'Asosiy zal',
    status: 'preparing',
    time: '14:45',
    guestCount: 2,
    waiter: 'Sardor',
    items: [
      { name: 'Kaliforniya set', qty: 1, price: 120000 },
      { name: 'Fanta 1L', qty: 1, price: 15000 }
    ],
    total: 135000
  },
  {
    id: '1026',
    table: '08',
    hall: 'Terrassa',
    status: 'ready',
    time: '15:10',
    guestCount: 3,
    waiter: 'Jamshid',
    items: [
      { name: 'Issiq roll', qty: 2, price: 55000 }
    ],
    total: 110000
  }
];

const statuses = [
  { id: 'all', label: 'Barchasi' },
  { id: 'pending', label: 'Kutilyapti' },
  { id: 'preparing', label: 'Tayyorlanyapti' },
  { id: 'ready', label: 'Tayyor' }
];

export const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrderModal, setSelectedOrderModal] = useState<typeof mockOrders[0] | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = 
      order.id.includes(searchQuery) || 
      order.table.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Clock, label: 'Kutilyapti' };
      case 'preparing':
        return { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: ChefHat, label: 'Tayyorlanyapti' };
      case 'ready':
        return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle2, label: 'Tayyor' };
      default:
        return { color: 'text-zinc-400', bg: 'bg-zinc-500/10', icon: Clock, label: "Noma'lum" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#141414] p-4 rounded-xl border border-[#222] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {statuses.map(status => (
            <button
              key={status.id}
              onClick={() => setActiveTab(status.id)}
              style={activeTab === status.id ? { backgroundColor: '#F6B530', color: '#09090b' } : {}}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                activeTab === status.id 
                  ? 'font-semibold' 
                  : 'bg-[#1c1c1c] text-zinc-400 hover:text-zinc-200 border border-[#2a2a2a]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="ID yoki Stol raqami..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const StatusIcon = getStatusConfig(order.status).icon;
            return (
              <div key={order.id} className="bg-[#141414] rounded-xl border border-[#222] flex flex-col justify-between hover:border-[#F6B530]/30 transition-colors">
                
                <div className="p-4 border-b border-[#222]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-zinc-200 text-base">Stol #{order.table}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">ID: #{order.id} • {order.time}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusConfig(order.status).bg} ${getStatusConfig(order.status).color}`}>
                      <StatusIcon size={12} />
                      {getStatusConfig(order.status).label}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 max-h-36 overflow-y-auto pr-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-sm">
                      <div className="flex gap-2 items-start text-zinc-300">
                        <span className="font-bold" style={{ color: '#F6B530' }}>{item.qty}x</span>
                        <span className="leading-tight">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-[#222] space-y-3 bg-[#1c1c1c]/30 rounded-b-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Jami summa:</span>
                    <span className="text-sm font-bold" style={{ color: '#F6B530' }}>{order.total.toLocaleString()} so'm</span>
                  </div>
                  
                  {order.status === 'ready' ? (
                    <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none">
                      <CreditCard size={14} /> To'lovni qabul qilish
                    </button>
                  ) : (
                    <button 
                      onClick={() => setSelectedOrderModal(order)}
                      className="w-full py-2.5 bg-[#1c1c1c] border border-[#2a2a2a] hover:bg-[#252525] text-zinc-200 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none"
                    >
                      Batafsil ko'rish <ChevronRight size={14} />
                    </button>
                  )}
                </div>

              </div>
            )
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-[#141414] rounded-xl border border-[#222]">
            <Clock size={40} className="mx-auto text-zinc-600 mb-3 opacity-30" />
            <h3 className="text-base font-semibold text-zinc-200 mb-1">Buyurtmalar topilmadi</h3>
            <p className="text-xs text-zinc-400">Tanlangan holat bo'yicha hech qanday buyurtma yo'q.</p>
          </div>
        )}
      </div>

      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#222] rounded-2xl w-full max-w-lg p-6 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedOrderModal(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-[#222] pb-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
                <Utensils size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-200">Stol #{selectedOrderModal.table} buyurtmasi</h3>
                <p className="text-xs text-zinc-400">ID: #{selectedOrderModal.id} • Vaqti: {selectedOrderModal.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#1c1c1c]/50 p-3 rounded-xl border border-[#222]">
                <span className="text-zinc-500 block mb-1">Zal:</span>
                <span className="text-zinc-200 font-semibold">{selectedOrderModal.hall}</span>
              </div>
              <div className="bg-[#1c1c1c]/50 p-3 rounded-xl border border-[#222]">
                <span className="text-zinc-500 block mb-1">Mehmonlar:</span>
                <span className="text-zinc-200 font-semibold">{selectedOrderModal.guestCount} kishilik</span>
              </div>
              <div className="bg-[#1c1c1c]/50 p-3 rounded-xl border border-[#222]">
                <span className="text-zinc-500 block mb-1">Ofitsiant:</span>
                <span className="text-zinc-200 font-semibold">{selectedOrderModal.waiter}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Buyurtma qilingan taomlar:</h4>
              <div className="bg-[#1c1c1c]/40 rounded-xl p-3 border border-[#222] space-y-2 max-h-48 overflow-y-auto">
                {selectedOrderModal.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-[#2a2a2a] last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
                        {item.qty}x
                      </span>
                      <span className="text-zinc-200">{item.name}</span>
                    </div>
                    <span className="text-zinc-400 text-xs">{(item.price * item.qty).toLocaleString()} so'm</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1c1c1c]/70 rounded-xl p-4 flex justify-between items-center border border-[#222]">
              <span className="text-sm font-medium text-zinc-300">Jami to'lov summasi:</span>
              <span className="text-lg font-bold" style={{ color: '#F6B530' }}>
                {selectedOrderModal.total.toLocaleString()} so'm
              </span>
            </div>

            <button
              onClick={() => setSelectedOrderModal(null)}
              style={{ backgroundColor: '#F6B530', color: '#09090b' }}
              className="w-full py-3 hover:opacity-90 font-semibold rounded-xl text-sm transition cursor-pointer"
            >
              Oynani yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;