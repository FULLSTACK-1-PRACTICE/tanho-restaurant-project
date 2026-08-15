import React, { useState } from 'react';
import {
  ChevronDown,
  RotateCcw,
  Calendar,
  Truck,
  MapPin,
  FileText,
  Gift,
  X,
  ShoppingBag,
} from 'lucide-react';

// --- MOCK DATA ---
const ORDERS_DATA = [
  {
    id: '#1258',
    date: '08 May, 2024 • 19:30',
    rawDate: '08 May, 2024 • 19:30',
    type: 'Yetkazib berish',
    address: "Qarshi shahri, Mustaqillik ko'chasi 15-uy",
    note: "Eshik oldiga qo'ying",
    status: 'Yetkazib berildi',
    statusType: 'success',
    category: 'Yetkazib berildi',
    totalPrice: "250 000 so'm",
    subtotal: "250 000 so'm",
    deliveryFee: "0 so'm",
    img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=150',
    items: [
      { name: 'TANHO Plov', qty: 1, price: "160 000 so'm", img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=100' },
      { name: 'Caesar Salad', qty: 1, price: "55 000 so'm", img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=100' },
      { name: 'Coca-Cola 1L', qty: 2, price: "35 000 so'm", img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=100' },
    ],
  },
  {
    id: '#1203',
    date: '06 May, 2024 • 20:10',
    rawDate: '06 May, 2024 • 20:10',
    type: 'Olib ketish',
    address: "Qarshi shahri, Mustaqillik ko'chasi 15-uy",
    note: "Issiqroq o'rab bering",
    status: 'Yetkazib berildi',
    statusType: 'success',
    category: 'Yetkazib berildi',
    totalPrice: "180 000 so'm",
    subtotal: "180 000 so'm",
    deliveryFee: "0 so'm",
    img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=150',
    items: [
      { name: 'Margherita Pizza', qty: 1, price: "110 000 so'm", img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=100' },
      { name: 'French Fries', qty: 1, price: "35 000 so'm", img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=100' },
      { name: 'Sprite 1L', qty: 1, price: "35 000 so'm", img: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=100' },
    ],
  },
  {
    id: '#1157',
    date: '04 May, 2024 • 13:20',
    rawDate: '04 May, 2024 • 13:20',
    type: 'Yetkazib berish',
    address: "Qarshi shahri, Universitet ko'chasi 8-uy",
    note: "Qo'ng'iroq qilmang",
    status: 'Yetkazib berildi',
    statusType: 'success',
    category: 'Yetkazib berildi',
    totalPrice: "95 000 so'm",
    subtotal: "95 000 so'm",
    deliveryFee: "0 so'm",
    img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=150',
    items: [
      { name: 'Caesar Salad', qty: 1, price: "55 000 so'm", img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=100' },
      { name: 'Lavash', qty: 1, price: "30 000 so'm", img: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=100' },
      { name: 'Ayran', qty: 1, price: "10 000 so'm", img: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=100' },
    ],
  },
  {
    id: '#1102',
    date: '02 May, 2024 • 14:10',
    rawDate: '02 May, 2024 • 14:10',
    type: 'Olib ketish',
    address: "Qarshi shahri, Mustaqillik ko'chasi 15-uy",
    note: '-',
    status: 'Bekor qilingan',
    statusType: 'canceled',
    category: 'Bekor qilingan',
    totalPrice: "65 000 so'm",
    subtotal: "65 000 so'm",
    deliveryFee: "0 so'm",
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=150',
    items: [
      { name: "Lag'mon", qty: 1, price: "35 000 so'm", img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=100' },
      { name: 'Xonim', qty: 1, price: "20 000 so'm", img: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=100' },
      { name: 'Kompot', qty: 1, price: "10 000 so'm", img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=100' },
    ],
  },
];

const TABS = ['Barchasi', 'Yangi', 'Qabul qilindi', 'Tayyorlanmoqda', 'Yetkazib berildi', 'Bekor qilingan'];

export default function MeningBuyurtmalarim() {
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS_DATA[0] | null>(ORDERS_DATA[2]); // Default #1157 selected

  const filteredOrders = ORDERS_DATA.filter((item) => {
    if (activeTab === 'Barchasi') return true;
    return item.category === activeTab;
  });

  return (
    <div className="w-full max-w-full overflow-hidden bg-[#0b0b0c] text-white p-3 sm:p-5 space-y-5 selection:bg-[#e2a543] selection:text-black">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white">Mening buyurtmalarim</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Bu yerda siz barcha buyurtmalaringizni ko'rishingiz va kuzatishingiz mumkin.
          </p>
        </div>

        <div className="relative shrink-0">
          <button className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/40 text-xs text-gray-200 px-3.5 py-1.5 rounded-xl flex items-center gap-4 transition-all cursor-pointer">
            <span>Barchasi</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#231b0f] text-[#e2a543] border border-[#e2a543]/40 shadow-sm'
                  : 'bg-[#141416] text-gray-400 hover:text-white border border-[#222226] hover:border-[#2f2f36]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* MAIN LAYOUT: Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT LIST SECTION (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-[#141416] border border-[#222226] rounded-2xl p-10 text-center text-gray-400">
              <ShoppingBag size={36} className="mx-auto mb-2 opacity-30 text-[#e2a543]" />
              <p className="text-xs">Ushbu bo'limda buyurtmalar mavjud emas.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-[#141416] border rounded-2xl p-3.5 sm:p-4 transition-all duration-200 cursor-pointer group shadow-md ${
                    isSelected
                      ? 'border-[#e2a543]/60 bg-[#17171a] shadow-[#e2a543]/5 ring-1 ring-[#e2a543]/30'
                      : 'border-[#222226] hover:border-[#33333d]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    
                    {/* Left Info: Image & Titles */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <img
                        src={order.img}
                        alt={order.id}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#e2a543] transition-colors truncate">
                            Buyurtma {order.id}
                          </h3>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{order.date}</p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-300">
                          <Truck size={11} className="text-[#e2a543] shrink-0" />
                          <span className="truncate">{order.type}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5 max-w-[180px]">
                          {order.address}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Dish names list */}
                    <div className="hidden md:block border-l border-[#222226] pl-3 space-y-0.5 text-[11px] text-gray-300">
                      <span className="text-[10px] font-semibold text-gray-500 block mb-0.5">Taomlar</span>
                      {order.items.slice(0, 3).map((item, i) => (
                        <p key={i} className="truncate max-w-[130px]">
                          <span className="font-semibold text-white">{item.qty}x</span> {item.name}
                        </p>
                      ))}
                    </div>

                    {/* Right: Price & Status & Reorder Button */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#222226] gap-2">
                      <div className="text-left sm:text-right">
                        <span className="text-[9px] text-gray-500 block">Jami summa</span>
                        <span className="text-xs sm:text-sm font-bold text-white">{order.totalPrice}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusBadge status={order.status} type={order.statusType} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#e2a543]/30 hover:bg-[#e2a543]/10 text-[#e2a543] text-[10px] font-medium transition-all cursor-pointer active:scale-95 shrink-0"
                        >
                          <RotateCcw size={10} />
                          <span className="hidden sm:inline">Qayta buyurtma qilish</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}

          {/* 10% BONUS BANNER (To'g'rilangan Kenglik va Dizayn) */}
          <div className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#231c12] border border-[#e2a543]/30 flex items-center justify-center text-[#e2a543] shrink-0 mx-auto sm:mx-0">
                <Gift size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sodiq mijozlar uchun maxsus taklif!</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Har 5 ta buyurtmadan so'ng sizga <span className="text-[#e2a543] font-semibold">10% chegirma kuponi</span> taqdim etiladi.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#222226]">
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-medium">3 / 5 buyurtma</span>
                <div className="w-24 h-1.5 bg-[#222226] rounded-full mt-1 overflow-hidden">
                  <div className="w-[60%] h-full bg-[#e2a543] rounded-full"></div>
                </div>
              </div>
              <button className="bg-[#1f1f24] hover:bg-[#282830] text-gray-200 border border-[#2f2f38] text-xs font-medium px-3.5 py-1.5 rounded-xl transition-all cursor-pointer active:scale-95">
                Batafsil
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR DETAILS SECTION (col-span-5) */}
        {selectedOrder && (
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#141416] border border-[#222226] rounded-2xl p-4 sm:p-5 shadow-xl sticky top-4 space-y-4">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#222226]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Buyurtma {selectedOrder.id}</h3>
                  <StatusBadge status={selectedOrder.status} type={selectedOrder.statusType} />
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Order Info */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Buyurtma tafsilotlari</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2 text-gray-300">
                    <span className="flex items-center gap-1.5 text-gray-500 shrink-0">
                      <Calendar size={13} className="text-[#e2a543]" />
                      Sana va vaqt
                    </span>
                    <span className="font-medium text-white text-right">{selectedOrder.rawDate}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2 text-gray-300">
                    <span className="flex items-center gap-1.5 text-gray-500 shrink-0">
                      <Truck size={13} className="text-[#e2a543]" />
                      Buyurtma turi
                    </span>
                    <span className="font-medium text-white text-right">{selectedOrder.type}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2 text-gray-300">
                    <span className="flex items-center gap-1.5 text-gray-500 shrink-0">
                      <MapPin size={13} className="text-[#e2a543]" />
                      Yetkazib berish manzili
                    </span>
                    <span className="font-medium text-white text-right max-w-[180px]">{selectedOrder.address}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2 text-gray-300">
                    <span className="flex items-center gap-1.5 text-gray-500 shrink-0">
                      <FileText size={13} className="text-[#e2a543]" />
                      Izoh
                    </span>
                    <span className="font-medium text-white text-right">{selectedOrder.note}</span>
                  </div>
                </div>
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2.5 pt-3 border-t border-[#222226]">
                <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Taomlar</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                  {selectedOrder.items.map((dish, i) => (
                    <div key={i} className="flex items-center justify-between text-xs group p-1.5 rounded-xl hover:bg-[#1a1a1d] transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={dish.img}
                          alt={dish.name}
                          className="w-9 h-9 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-medium text-white truncate group-hover:text-[#e2a543] transition-colors">
                            {dish.name}
                          </h5>
                          <span className="text-[10px] text-gray-400">{dish.qty} ta</span>
                        </div>
                      </div>
                      <span className="font-semibold text-white shrink-0 ml-2">{dish.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-[#222226] space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Yetkazib berish xizmati</span>
                  <span className="text-emerald-400 font-medium">{selectedOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-white pt-2 border-t border-[#222226]">
                  <span>Jami summa</span>
                  <span className="text-[#e2a543]">{selectedOrder.totalPrice}</span>
                </div>
              </div>

              {/* Reorder Action Button */}
              <button className="w-full bg-[#e2a543] hover:bg-[#cf9230] text-black font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer shadow-md hover:shadow-[#e2a543]/20">
                <RotateCcw size={14} />
                <span>Qayta buyurtma qilish</span>
              </button>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}

// --- BADGE SUB-COMPONENT ---
function StatusBadge({ status, type }: { status: string; type: string }) {
  let colorStyle = 'bg-gray-800 text-gray-300 border-gray-700';

  if (type === 'success') {
    colorStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (type === 'canceled') {
    colorStyle = 'bg-red-500/10 text-red-400 border-red-500/20';
  } else if (type === 'pending') {
    colorStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border font-medium shrink-0 ${colorStyle}`}>
      <span className="w-1 h-1 rounded-full bg-current"></span>
      {status}
    </span>
  );
}