import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ChevronRight, 
  Plus, 
  Grid, 
  CreditCard, 
  Printer, 
  ClipboardList, 
  Utensils,
  Receipt,
  Search,
  Filter,
  DollarSign,
  Send,
  X
} from 'lucide-react';

interface OrderInfo {
  id: string;
  total: string;
  time: string;
}

interface Table {
  id: string;
  number: number;
  seats: number;
  status: string;
  hall: string;
  order: OrderInfo | null;
}

export const CashierPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'orders' | 'menu'>('overview');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [tables] = useState<Table[]>([
    { id: "01", number: 1, seats: 4, status: "free", hall: "Asosiy zal", order: null },
    { id: "02", number: 2, seats: 2, status: "free", hall: "Asosiy zal", order: null },
    { id: "03", number: 3, seats: 6, status: "busy", hall: "Asosiy zal", order: { id: "#1258", total: "285 000 so'm", time: "19:45" } },
    { id: "04", number: 4, seats: 4, status: "reserved", hall: "Asosiy zal", order: null },
    { id: "05", number: 5, seats: 4, status: "free", hall: "Asosiy zal", order: null },
    { id: "06", number: 6, seats: 8, status: "busy", hall: "Terrassa", order: { id: "#1256", total: "95 000 so'm", time: "19:05" } },
    { id: "07", number: 7, seats: 2, status: "free", hall: "Terrassa", order: null },
    { id: "08", number: 8, seats: 4, status: "cleaning", hall: "Terrassa", order: null },
    { id: "09", number: 9, seats: 4, status: "free", hall: "VIP zal", order: null },
    { id: "10", number: 10, seats: 10, status: "busy", hall: "VIP zal", order: { id: "#1257", total: "180 000 so'm", time: "19:20" } },
  ]);

  const [recentOrders] = useState([
    { id: "#1258", table: "Stol 03", time: "19:45", price: "285 000 so'm", status: "To'landi", items: "Qozon kabob, Norin, 2x Cola" },
    { id: "#1257", table: "Stol 10", time: "19:20", price: "180 000 so'm", status: "To'landi", items: "Mastava, Somsa, Ko'k choy" },
    { id: "#1256", table: "Stol 06", time: "19:05", price: "95 000 so'm", status: "To'landi", items: "Manti, Achchiq-chuchuk" },
    { id: "#1255", table: "Stol 15", time: "18:40", price: "120 000 so'm", status: "Jarayonda", items: "Shashlik assorti" },
    { id: "#1254", table: "Stol 02", time: "18:15", price: "150 000 so'm", status: "To'landi", items: "Uyg'urcha lag'mon" },
  ]);

  const menuItems = [
    { id: 1, name: "Qozon kabob", price: "45 000 so'm", category: "Milliy taomlar", image: "🍖" },
    { id: 2, name: "Norin", price: "40 000 so'm", category: "Milliy taomlar", image: "🍜" },
    { id: 3, name: "Manti (4 dona)", price: "32 000 so'm", category: "Milliy taomlar", image: "🥟" },
    { id: 4, name: "Uyg'urcha lag'mon", price: "38 000 so'm", category: "Suyuq taomlar", image: "🍲" },
    { id: 5, name: "Kavkazcha shashlik", price: "18 000 so'm", category: "Fastfood & Grill", image: "🍢" },
    { id: 6, name: "Coca-Cola 1L", price: "12 000 so'm", category: "Ichimliklar", image: "🥤" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-[#262626]">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Asosiy panel
          </button>
          <button 
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'tables' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Stollar boshqaruvi
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Buyurtmalar tarixi
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'menu' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Menyu va narxlar
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOrderModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Yangi buyurtma
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#262626]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-400 text-sm">Bugungi savdo</span>
                <div className="p-2 bg-[#262626] rounded-lg text-amber-500">
                  <CreditCard size={20} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">8 450 000 <span className="text-sm font-normal text-gray-400">so'm</span></div>
              <div className="text-emerald-500 text-xs flex items-center gap-1">
                <ArrowUpRight size={14} /> 15.3% kechagiga nisbatan
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#262626]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-400 text-sm">Jami buyurtmalar</span>
                <div className="p-2 bg-[#262626] rounded-lg text-amber-500">
                  <ClipboardList size={20} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">96 <span className="text-sm font-normal text-gray-400">ta</span></div>
              <div className="text-emerald-500 text-xs flex items-center gap-1">
                <ArrowUpRight size={14} /> 8.6% kechagiga nisbatan
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#262626]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-400 text-sm">O'rtacha chek</span>
                <div className="p-2 bg-[#262626] rounded-lg text-amber-500">
                  <Receipt size={20} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">87 900 <span className="text-sm font-normal text-gray-400">so'm</span></div>
              <div className="text-emerald-500 text-xs flex items-center gap-1">
                <ArrowUpRight size={14} /> 6.4% kechagiga nisbatan
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#262626]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-400 text-sm">Naqd pul</span>
                <div className="p-2 bg-[#262626] rounded-lg text-amber-500">
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">5 620 000 <span className="text-sm font-normal text-gray-400">so'm</span></div>
              <div className="text-gray-400 text-xs">Kassadagi joriy summa</div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-[#1a1a1a] p-6 rounded-xl border border-[#262626]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Tezkor stol holati</h3>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Bo'sh</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Band</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Tozalanyapti</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Rezerv</span>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                {tables.map((t) => {
                  let bgClass = "bg-emerald-950/40 border-emerald-800 text-emerald-400";
                  if (t.status === "busy") bgClass = "bg-red-950/40 border-red-800 text-red-400";
                  if (t.status === "cleaning") bgClass = "bg-blue-950/40 border-blue-800 text-blue-400";
                  if (t.status === "reserved") bgClass = "bg-amber-950/40 border-amber-800 text-amber-400";

                  return (
                    <div 
                      key={t.id} 
                      onClick={() => { setSelectedTable(t); setIsPaymentModalOpen(true); }}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-105 ${bgClass}`}
                    >
                      <Grid size={18} />
                      <span className="font-bold text-base">Stol {t.id}</span>
                      <span className="text-[10px] text-gray-300">{t.hall}</span>
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => setActiveTab('tables')}
                className="w-full py-3 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                Barcha stollarni boshqarish <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626]">
                <h3 className="text-lg font-semibold mb-4">Tezkor amallar</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setIsOrderModalOpen(true)}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-xs text-white text-center">Yangi buyurtma</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('tables')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors"
                  >
                    <Grid size={20} />
                    <span className="text-xs text-white text-center">Stol tanlash</span>
                  </button>
                  <button 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors"
                  >
                    <CreditCard size={20} />
                    <span className="text-xs text-white text-center">To'lov qabul qilish</span>
                  </button>
                  <button 
                    onClick={() => alert("Chek printerga yuborildi!")}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors"
                  >
                    <Printer size={20} />
                    <span className="text-xs text-white text-center">Chek chiqarish</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors"
                  >
                    <ClipboardList size={20} />
                    <span className="text-xs text-white text-center">Buyurtmalar</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('menu')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors"
                  >
                    <Utensils size={20} />
                    <span className="text-xs text-white text-center">Menyu</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Oxirgi buyurtmalar</h3>
                  <span onClick={() => setActiveTab('orders')} className="text-amber-500 text-sm cursor-pointer hover:underline">Barchasi</span>
                </div>
                <div className="space-y-3">
                  {recentOrders.slice(0, 4).map((order, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#262626]/50 rounded-xl">
                      <div>
                        <div className="font-semibold text-sm">{order.id} <span className="text-xs text-gray-400 font-normal">({order.table})</span></div>
                        <div className="text-xs text-gray-400">{order.items}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{order.price}</div>
                        <div className={`text-xs ${order.status === 'To\'landi' ? 'text-emerald-400' : 'text-amber-400'}`}>{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'tables' && (
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-bold">Stollar va zallar holati</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Bo'sh</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Band</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Tozalanyapti</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Rezerv</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tables.map((t) => {
              let statusBorder = "border-emerald-800 bg-emerald-950/20";
              let badgeColor = "bg-emerald-500/10 text-emerald-400";
              let statusText = "Bo'sh";
              if (t.status === "busy") {
                statusBorder = "border-red-800 bg-red-950/20";
                badgeColor = "bg-red-500/10 text-red-400";
                statusText = "Band";
              } else if (t.status === "cleaning") {
                statusBorder = "border-blue-800 bg-blue-950/20";
                badgeColor = "bg-blue-500/10 text-blue-400";
                statusText = "Tozalanyapti";
              } else if (t.status === "reserved") {
                statusBorder = "border-amber-800 bg-amber-950/20";
                badgeColor = "bg-amber-500/10 text-amber-400";
                statusText = "Rezerv qilingan";
              }

              return (
                <div key={t.id} className={`p-5 rounded-xl border ${statusBorder} flex flex-col justify-between gap-4`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">Stol #{t.id}</h4>
                      <p className="text-xs text-gray-400">{t.hall} • {t.seats} kishilik</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
                      {statusText}
                    </span>
                  </div>

                  {t.order && (
                    <div className="bg-[#262626]/80 p-3 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between text-gray-300">
                        <span>Buyurtma:</span>
                        <span className="font-semibold text-white">{t.order.id}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Summa:</span>
                        <span className="font-semibold text-amber-400">{t.order.total}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-[#262626]">
                    <button 
                      onClick={() => { setSelectedTable(t); setIsPaymentModalOpen(true); }}
                      className="flex-1 py-2 bg-[#262626] hover:bg-[#333] text-xs font-medium rounded-lg text-center transition-colors"
                    >
                      To'lov qilish
                    </button>
                    <button 
                      onClick={() => setIsOrderModalOpen(true)}
                      className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-medium rounded-lg transition-colors"
                    >
                      Buyurtma
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626] space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-bold">Buyurtmalar tarixi</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="ID yoki stol bo'yicha..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#262626] border border-[#333] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button className="p-2 bg-[#262626] border border-[#333] rounded-lg text-gray-300 hover:text-white">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262626] text-gray-400 text-xs uppercase">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Stol</th>
                  <th className="py-3 px-4">Vaqt</th>
                  <th className="py-3 px-4">Taomlar</th>
                  <th className="py-3 px-4">Summa</th>
                  <th className="py-3 px-4">Holat</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] text-sm">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#222]">
                    <td className="py-3 px-4 font-semibold text-amber-400">{order.id}</td>
                    <td className="py-3 px-4">{order.table}</td>
                    <td className="py-3 px-4 text-gray-400">{order.time}</td>
                    <td className="py-3 px-4 text-gray-300">{order.items}</td>
                    <td className="py-3 px-4 font-bold">{order.price}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.status === 'To\'landi' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => setIsPaymentModalOpen(true)} className="px-3 py-1.5 bg-[#262626] hover:bg-[#333] rounded-lg text-xs font-medium text-amber-400 transition-colors">
                        Chek
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Menyu va mahsulotlar katalogi</h3>
            <span className="text-xs text-gray-400">Jami: {menuItems.length} ta mahsulot</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-[#262626]/50 border border-[#262626] p-4 rounded-xl flex items-center gap-4">
                <div className="text-3xl p-3 bg-[#1a1a1a] rounded-xl border border-[#333]">{item.image}</div>
                <div>
                  <span className="text-xs text-amber-500 font-medium">{item.category}</span>
                  <h4 className="font-bold text-base text-white">{item.name}</h4>
                  <p className="text-sm font-semibold text-gray-300 mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#262626] pb-4">
              <h3 className="text-lg font-bold">Yangi buyurtma yaratish</h3>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Stolni tanlang</label>
                <select className="w-full bg-[#262626] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
                  {tables.filter(t => t.status === 'free').map(t => (
                    <option key={t.id} value={t.id}>Stol #{t.id} ({t.hall} - {t.seats} kishilik)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Taomlar qo'shish</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-[#262626]/30 rounded-xl border border-[#262626]">
                  {menuItems.map(m => (
                    <div key={m.id} className="p-2.5 bg-[#262626] rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#333]">
                      <span className="text-xs font-medium">{m.name}</span>
                      <button className="p-1 bg-amber-500 text-black rounded"><Plus size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#262626]">
              <button onClick={() => setIsOrderModalOpen(false)} className="px-4 py-2 rounded-xl bg-[#262626] text-sm text-gray-300 hover:bg-[#333]">Bekor qilish</button>
              <button onClick={() => { alert("Buyurtma muvaffaqiyatli saqlandi!"); setIsOrderModalOpen(false); }} className="px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400">Saqlash va yuborish</button>
            </div>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#262626] pb-4">
              <h3 className="text-lg font-bold">
                To'lovni qabul qilish {selectedTable ? `- Stol ${selectedTable.id}` : ''}
              </h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#262626]/50 rounded-xl space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Jami summa:</span>
                  <span className="text-white font-bold text-lg">
                    {selectedTable?.order?.total || "0 so'm"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">To'lov turi</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-3 bg-amber-500 text-black font-semibold rounded-xl text-xs flex flex-col items-center gap-1">
                    <DollarSign size={18} /> Naqd pul
                  </button>
                  <button className="p-3 bg-[#262626] hover:bg-[#333] text-white font-semibold rounded-xl text-xs flex flex-col items-center gap-1">
                    <CreditCard size={18} /> Plastik karta
                  </button>
                  <button className="p-3 bg-[#262626] hover:bg-[#333] text-white font-semibold rounded-xl text-xs flex flex-col items-center gap-1">
                    <Send size={18} /> Payme / Click
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#262626]">
              <button onClick={() => setIsPaymentModalOpen(false)} className="px-4 py-2 rounded-xl bg-[#262626] text-sm text-gray-300 hover:bg-[#333]">Bekor qilish</button>
              <button onClick={() => { alert("To'lov muvaffaqiyatli yakunlandi!"); setIsPaymentModalOpen(false); }} className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400">To'lovni tasdiqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierPage;