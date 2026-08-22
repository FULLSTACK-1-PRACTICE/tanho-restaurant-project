import React, { useState, useRef, useEffect } from 'react';
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
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import { initialTables, initialRecentOrders, cashierMenuItems } from '@/data/cashierData';
import type { Table } from '@/data/cashierData';
import { NewOrder } from './NewOrder';

export const CashierPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'orders' | 'menu' | 'new-order'>('overview');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<string>('1');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [tables] = useState<Table[]>(initialTables);
  const [recentOrders] = useState(initialRecentOrders);
  const [menuItems] = useState(cashierMenuItems);

  const currentTable = tables.find((t) => t.id === selectedTableId);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 relative">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-500 text-black font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-[#262626]">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${activeTab === 'overview' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Asosiy panel
          </button>
          <button 
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${activeTab === 'tables' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Stollar boshqaruvi
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${activeTab === 'orders' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Buyurtmalar tarixi
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${activeTab === 'menu' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-[#262626] hover:text-white'}`}
          >
            Menyu va narxlar
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center justify-between gap-3 bg-[#262626] hover:bg-[#333] border border-[#383838] text-white text-sm py-2 px-3.5 rounded-xl transition cursor-pointer min-w-[240px]"
            >
              <span className="truncate">
                Stol #{currentTable?.id} ({currentTable?.hall} - {currentTable?.seats} kishilik)
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-full min-w-[260px] max-h-60 overflow-y-auto bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-1.5 scrollbar-thin scrollbar-thumb-[#333]">
                {tables.map((table) => {
                  const isBusy = table.status === 'busy';
                  const isSelected = table.id === selectedTableId;

                  return (
                    <button
                      key={table.id}
                      type="button"
                      disabled={isBusy}
                      onClick={() => {
                        setSelectedTableId(table.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition ${
                        isBusy
                          ? 'opacity-40 cursor-not-allowed bg-transparent text-gray-500'
                          : isSelected
                          ? 'bg-amber-500/10 text-amber-400 font-semibold cursor-pointer'
                          : 'text-gray-200 hover:bg-[#262626] cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isBusy ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        <span>
                          Stol #{table.id} ({table.hall} - {table.seats} kishilik)
                        </span>
                      </div>
                      {isBusy ? (
                        <span className="text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-normal">
                          Band
                        </span>
                      ) : isSelected ? (
                        <Check size={14} className="text-amber-500" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button 
            onClick={() => setActiveTab('new-order')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors cursor-pointer focus:outline-none"
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
                className="w-full py-3 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none"
              >
                Barcha stollarni boshqarish <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626]">
                <h3 className="text-lg font-semibold mb-4">Tezkor amallar</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setActiveTab('new-order')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors cursor-pointer focus:outline-none"
                  >
                    <Plus size={20} />
                    <span className="text-xs text-white text-center">Yangi buyurtma</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('tables')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors cursor-pointer focus:outline-none"
                  >
                    <Grid size={20} />
                    <span className="text-xs text-white text-center">Stol tanlash</span>
                  </button>
                  <button 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors cursor-pointer focus:outline-none"
                  >
                    <CreditCard size={20} />
                    <span className="text-xs text-white text-center">To'lov qabul qilish</span>
                  </button>
                  <button 
                    onClick={() => showNotification("Chek printerga yuborildi!")}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors cursor-pointer focus:outline-none"
                  >
                    <Printer size={20} />
                    <span className="text-xs text-white text-center">Chek chiqarish</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors cursor-pointer focus:outline-none"
                  >
                    <ClipboardList size={20} />
                    <span className="text-xs text-white text-center">Buyurtmalar</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('menu')}
                    className="flex flex-col items-center justify-center p-4 bg-[#262626] hover:bg-[#333] rounded-xl text-amber-500 gap-2 transition-colors cursor-pointer focus:outline-none"
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
                      className="flex-1 py-2 bg-[#262626] hover:bg-[#333] text-xs font-medium rounded-lg text-center transition-colors cursor-pointer focus:outline-none"
                    >
                      To'lov qilish
                    </button>
                    <button 
                      onClick={() => setActiveTab('new-order')}
                      className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-medium rounded-lg transition-colors cursor-pointer focus:outline-none"
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
              <button className="p-2 bg-[#262626] border border-[#333] rounded-lg text-gray-300 hover:text-white cursor-pointer focus:outline-none">
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
                      <button onClick={() => setIsPaymentModalOpen(true)} className="px-3 py-1.5 bg-[#262626] hover:bg-[#333] rounded-lg text-xs font-medium text-amber-400 transition-colors cursor-pointer focus:outline-none">
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

      {activeTab === 'new-order' && (
        <NewOrder />
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#262626] pb-4">
              <h3 className="text-lg font-bold">
                To'lovni qabul qilish {selectedTable ? `- Stol ${selectedTable.id}` : ''}
              </h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer focus:outline-none">
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
                  <button className="p-3 bg-amber-500 text-black font-semibold rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer focus:outline-none">
                    <DollarSign size={18} /> Naqd pul
                  </button>
                  <button className="p-3 bg-[#262626] hover:bg-[#333] text-white font-semibold rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer focus:outline-none">
                    <CreditCard size={18} /> Plastik karta
                  </button>
                  <button className="p-3 bg-[#262626] hover:bg-[#333] text-white font-semibold rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer focus:outline-none">
                    <Send size={18} /> Payme / Click
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#262626]">
              <button onClick={() => setIsPaymentModalOpen(false)} className="px-4 py-2 rounded-xl bg-[#262626] text-sm text-gray-300 hover:bg-[#333] cursor-pointer focus:outline-none">
                Bekor qilish
              </button>
              <button 
                onClick={() => {
                  showNotification("To'lov muvaffaqiyatli yakunlandi!");
                  setIsPaymentModalOpen(false);
                }} 
                className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 cursor-pointer focus:outline-none"
              >
                To'lovni tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierPage;