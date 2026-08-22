import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, ChefHat, CreditCard, ChevronRight } from 'lucide-react';

// Vaqtincha test uchun ma'lumotlar (Buni backend'dan keladigan ma'lumotlarga almashtirasiz)
const mockOrders = [
  {
    id: '1024',
    table: '01',
    status: 'pending',
    time: '14:30',
    guestCount: 4,
    items: [
      { name: 'Filadelfiya maki', qty: 2, price: 45000 },
      { name: 'Coca Cola 1L', qty: 1, price: 15000 }
    ],
    total: 105000
  },
  {
    id: '1025',
    table: '03',
    status: 'preparing',
    time: '14:45',
    guestCount: 2,
    items: [
      { name: 'Kaliforniya set', qty: 1, price: 120000 },
      { name: 'Fanta 1L', qty: 1, price: 15000 }
    ],
    total: 135000
  },
  {
    id: '1026',
    table: '08',
    status: 'ready',
    time: '15:10',
    guestCount: 3,
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
        return { color: 'text-gray-400', bg: 'bg-gray-500/10', icon: Clock, label: "Noma'lum" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Yuqori qism: Qidiruv va Filtrlar */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#262626] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {statuses.map(status => (
            <button
              key={status.id}
              onClick={() => setActiveTab(status.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                activeTab === status.id 
                  ? 'bg-amber-500 text-black font-semibold' 
                  : 'bg-[#262626] text-gray-400 hover:text-white hover:bg-[#333]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="ID yoki Stol raqami..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#262626] border border-[#333] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Buyurtmalar ro'yxati */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const StatusIcon = getStatusConfig(order.status).icon;
            return (
              <div key={order.id} className="bg-[#1a1a1a] rounded-xl border border-[#262626] flex flex-col justify-between hover:border-amber-500/30 transition-colors">
                
                {/* Karta Header qismi */}
                <div className="p-4 border-b border-[#262626]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg">Stol #{order.table}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">ID: #{order.id} • {order.time}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusConfig(order.status).bg} ${getStatusConfig(order.status).color}`}>
                      <StatusIcon size={12} />
                      {getStatusConfig(order.status).label}
                    </div>
                  </div>
                </div>

                {/* Karta Body qismi: Taomlar ro'yxati */}
                <div className="p-4 space-y-2 flex-1 max-h-36 overflow-y-auto pr-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-sm">
                      <div className="flex gap-2 items-start text-gray-300">
                        <span className="font-bold text-amber-500">{item.qty}x</span>
                        <span className="leading-tight">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Karta Footer qismi */}
                <div className="p-4 border-t border-[#262626] space-y-3 bg-[#262626]/20 rounded-b-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Jami summa:</span>
                    <span className="text-base font-bold text-amber-400">{order.total.toLocaleString()} so'm</span>
                  </div>
                  
                  {order.status === 'ready' ? (
                    <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none">
                      <CreditCard size={16} /> To'lovni qabul qilish
                    </button>
                  ) : (
                    <button className="w-full py-2.5 bg-[#262626] hover:bg-[#333] text-white rounded-lg text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none">
                      Batafsil ko'rish <ChevronRight size={16} />
                    </button>
                  )}
                </div>

              </div>
            )
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-[#1a1a1a] rounded-xl border border-[#262626]">
            <Clock size={40} className="mx-auto text-gray-500 mb-3 opacity-30" />
            <h3 className="text-lg font-semibold text-white mb-1">Buyurtmalar topilmadi</h3>
            <p className="text-sm text-gray-400">Tanlangan holat bo'yicha hech qanday buyurtma yo'q.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;