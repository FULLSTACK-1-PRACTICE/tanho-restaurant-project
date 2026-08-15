import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Calendar,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  UserPlus,
} from 'lucide-react';

// --- MOCK DATA ---
const RECENT_ORDERS = [
  {
    id: '#1256',
    date: '18 May, 2024 • 19:45',
    price: "250 000 so'm",
    status: 'Yetkazib berildi',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: '#1248',
    date: '15 May, 2024 • 20:10',
    price: "180 000 so'm",
    status: 'Yetkazib berildi',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: '#1240',
    date: '12 May, 2024 • 18:30',
    price: "120 000 so'm",
    status: 'Bajarilgan',
    statusBg: 'bg-gray-800/60 text-gray-300 border-gray-700/50',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: '#1232',
    date: '8 May, 2024 • 13:20',
    price: "95 000 so'm",
    status: 'Bajarilgan',
    statusBg: 'bg-gray-800/60 text-gray-300 border-gray-700/50',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=120',
  },
];

const TABLE_BOOKINGS = [
  {
    date: '18 May, 2024',
    time: 'Shanba • 20:00',
    table: 'Stol 6',
    guests: '4 kishi',
    status: 'Tasdiqlandi',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=120',
  },
  {
    date: '25 May, 2024',
    time: 'Shanba • 19:00',
    table: 'Stol 3',
    guests: '2 kishi',
    status: 'Tasdiqlandi',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=120',
  },
  {
    date: '1 Iyun, 2024',
    time: 'Shanba • 18:30',
    table: 'Stol 8',
    guests: '6 kishi',
    status: 'Kutilmoqda',
    statusBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=120',
  },
  {
    date: '8 Iyun, 2024',
    time: 'Shanba • 20:30',
    table: 'Stol 2',
    guests: '3 kishi',
    status: 'Bekor qilindi',
    statusBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    img: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=120',
  },
];

const INITIAL_FAVORITES = [
  {
    id: 1,
    name: 'TANHO Plov',
    price: "65 000 so'm",
    liked: true,
    img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 2,
    name: 'Beef Steak',
    price: "120 000 so'm",
    liked: true,
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 3,
    name: 'Caesar Salat',
    price: "55 000 so'm",
    liked: false,
    img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 4,
    name: 'Margherita Pizza',
    price: "75 000 so'm",
    liked: false,
    img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=120',
  },
];

const NEWS = [
  {
    title: 'Yangi yozgi menyu',
    date: '20 May, 2024',
    badge: 'Menyu',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=120',
  },
  {
    title: "TANHO'da jonli musiqa kechalari",
    date: '15 May, 2024',
    badge: 'Tadbir',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=120',
  },
  {
    title: 'Sodiqlik dasturimiz yangilandi!',
    date: '10 May, 2024',
    badge: 'Yangilik',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=120',
  },
];

export default function BoshSahifa() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item))
    );
  };

  return (
    <div className="w-full bg-[#0b0b0c] text-white p-4 lg:p-6 space-y-6 selection:bg-[#e2a543] selection:text-black animate-fadeIn">
      
      {/* TOP SECTION: User Profile & Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* User Profile Card (Ballarsiz, Toza va Muvozanatli) */}
        <div className="xl:col-span-4 bg-[#141416] border border-[#222226] hover:border-[#e2a543]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 hover:shadow-[#e2a543]/5 group">
          <div className="relative mb-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
              alt="Asadbek Saidov"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#e2a543]/40 p-1 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#141416] rounded-full"></span>
          </div>

          <h2 className="text-lg font-bold text-white tracking-wide group-hover:text-[#e2a543] transition-colors">
            Asadbek Saidov
          </h2>
          <p className="text-xs text-gray-400 mt-1 mb-3">asadbek@gmail.com</p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#231b0f] border border-[#e2a543]/30 rounded-full text-[#e2a543] text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#e2a543] animate-pulse"></span>
            VIP Mijoz • Bronza
          </div>
        </div>

        {/* Top Stat Cards Grid */}
        <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Jami buyurtmalar"
            value="12"
            unit="ta"
            actionText="Barchasini ko'rish"
            icon={<ShoppingBag size={20} />}
            iconBg="bg-[#231c12]"
            iconColor="text-[#e2a543]"
          />
          <StatCard
            title="Jami sarflangan"
            value="1 850 000"
            unit="so'm"
            actionText="Hisobotni ko'rish"
            icon={<DollarSign size={20} />}
            iconBg="bg-[#122417]"
            iconColor="text-emerald-500"
          />
          <StatCard
            title="Stol band qilishlarim"
            value="4"
            unit="ta"
            actionText="Barchasini ko'rish"
            icon={<Calendar size={20} />}
            iconBg="bg-[#261517]"
            iconColor="text-rose-500"
          />
          <StatCard
            title="Sevimlilarim"
            value="8"
            unit="ta"
            actionText="Barchasini ko'rish"
            icon={<Heart size={20} className="fill-red-500/20" />}
            iconBg="bg-[#251417]"
            iconColor="text-red-500"
          />
        </div>
      </div>

      {/* MIDDLE SECTION: Orders & Bookings */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        
        {/* Recent Orders */}
        <SectionContainer title="So'nggi buyurtmalarim">
          <div className="space-y-3">
            {RECENT_ORDERS.map((order, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#19191d] hover:bg-[#222229] border border-[#24242a] hover:border-[#e2a543]/30 transition-all duration-200 cursor-pointer active:scale-[0.99] group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={order.img}
                    alt="food"
                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white group-hover:text-[#e2a543] transition-colors">
                      {order.id}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-white">{order.price}</p>
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded-md border mt-1 font-medium ${order.statusBg}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500 group-hover:text-[#e2a543] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Table Bookings */}
        <SectionContainer title="Stol band qilishlarim">
          <div className="space-y-3">
            {TABLE_BOOKINGS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#19191d] hover:bg-[#222229] border border-[#24242a] hover:border-[#e2a543]/30 transition-all duration-200 cursor-pointer active:scale-[0.99] group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.img}
                    alt="table"
                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white group-hover:text-[#e2a543] transition-colors">
                      {item.date}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-white block">{item.table}</span>
                    <span className="text-[11px] text-gray-400">{item.guests}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-md border font-medium ${item.statusBg}`}
                  >
                    {item.status}
                  </span>
                  <ChevronRight size={16} className="text-gray-500 group-hover:text-[#e2a543] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

      </div>

      {/* BOTTOM SECTION: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Favorite Dishes */}
        <SectionContainer title="Sevimli taomlarim">
          <div className="space-y-2.5">
            {favorites.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#19191d]/50 hover:bg-[#1f1f26] border border-transparent hover:border-[#2a2a32] transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="w-11 h-11 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-[#e2a543] transition-colors">
                      {food.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{food.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(food.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 cursor-pointer active:scale-90"
                >
                  <Heart
                    size={16}
                    className={food.liked ? 'text-[#e2a543] fill-[#e2a543]' : 'text-gray-500'}
                  />
                </button>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Recommended Dish Banner */}
        <div className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">Sizga tavsiya</h3>
            </div>

            <div className="relative rounded-xl overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
                alt="Ribeye Steak"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 bg-[#e2a543] text-black font-semibold text-[10px] px-2.5 py-0.5 rounded-md shadow-md">
                Tavsiya
              </span>

              <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-[#e2a543] hover:text-black rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-90">
                <ChevronLeft size={16} />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-[#e2a543] hover:text-black rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-90">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex justify-between items-start mb-1">
              <div>
                <h4 className="text-xs font-semibold text-white group-hover:text-[#e2a543] transition-colors">
                  Ribeye Steak
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Yumshoq va shirali mol go'shti, maxsus sous bilan.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-white">135 000 so'm</span>
              <button className="bg-[#e2a543] hover:bg-[#cf9230] text-black font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-[#e2a543]/20 active:scale-95 cursor-pointer">
                <ShoppingBag size={14} />
                <span>Buyurtma qilish</span>
              </button>
            </div>

            <div className="flex justify-center gap-1.5">
              <span className="w-4 h-1 bg-[#e2a543] rounded-full"></span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            </div>
          </div>
        </div>

        {/* News */}
        <SectionContainer title="Yangiliklar">
          <div className="space-y-3">
            {NEWS.map((news, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#19191d]/50 hover:bg-[#1f1f26] border border-transparent hover:border-[#2a2a32] transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={news.img}
                    alt={news.title}
                    className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white line-clamp-1 group-hover:text-[#e2a543] transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{news.date}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-md border font-medium ${news.badgeBg}`}
                >
                  {news.badge}
                </span>
              </div>
            ))}
          </div>
        </SectionContainer>

      </div>

      {/* BOTTOM BANNER: Invite Friends */}
      <div className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/40 rounded-2xl p-4 lg:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg transition-all duration-300 hover:shadow-[#e2a543]/5 group">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#231c12] border border-[#e2a543]/20 flex items-center justify-center text-[#e2a543] shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
            <UserPlus size={22} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-[#e2a543] transition-colors">
              Do'stlaringizni taklif qiling va maxsus chegirmalarga ega bo'ling!
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Taklif qilingan har bir do'stingiz uchun eksklyuziv sovg'alar va bonuslarga ega bo'lasiz.
            </p>
          </div>
        </div>

        <button className="w-full md:w-auto bg-[#e2a543] hover:bg-[#cf9230] text-black font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer shrink-0 shadow-md hover:shadow-[#e2a543]/20">
          <UserPlus size={15} />
          <span>Taklif qilish</span>
        </button>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEAN CODE ---

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  actionText: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function StatCard({ title, value, unit, actionText, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 group cursor-pointer">
      <div className="flex items-center gap-3.5 mb-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium">{title}</p>
          <div className="text-lg font-bold text-white mt-0.5 group-hover:text-[#e2a543] transition-colors">
            {value} <span className="text-xs font-normal text-gray-400">{unit}</span>
          </div>
        </div>
      </div>
      <button className="flex items-center justify-end gap-1 text-[11px] text-[#e2a543] hover:underline pt-2 border-t border-[#1e1e22] cursor-pointer group-hover:gap-2 transition-all">
        <span>{actionText}</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
}

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

function SectionContainer({ title, children }: SectionContainerProps) {
  return (
    <div className="bg-[#141416] border border-[#222226] hover:border-[#2c2c34] rounded-2xl p-5 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <button className="flex items-center gap-1 text-xs text-[#e2a543] hover:underline hover:gap-1.5 transition-all cursor-pointer">
          <span>Barchasini ko'rish</span>
          <ChevronRight size={14} />
        </button>
      </div>
      {children}
    </div>
  );
}