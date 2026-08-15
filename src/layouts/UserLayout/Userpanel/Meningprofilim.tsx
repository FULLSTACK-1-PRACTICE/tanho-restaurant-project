import React from 'react';
import {
  Camera,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  CalendarRange,
  Heart,
  Star,
  ChevronRight,
  Plus,
  MoreVertical,
} from 'lucide-react';
// --- MOCK DATA ---
const RECENT_ORDERS = [
  {
    title: 'TANHO Plov',
    date: '18 May, 2024 • 19:45',
    price: "250 000 so'm",
    status: 'Yetkazib berildi',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=120',
  },
  {
    title: 'Margherita Pizza',
    date: '15 May, 2024 • 20:10',
    price: "180 000 so'm",
    status: 'Yetkazib berildi',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=120',
  },
  {
    title: 'Caesar Salad',
    date: '12 May, 2024 • 13:20',
    price: "95 000 so'm",
    status: 'Bajarilgan',
    statusBg: 'bg-gray-800/60 text-gray-300 border-gray-700/50',
    img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=120',
  },
  {
    title: "Lag'mon",
    date: '8 May, 2024 • 13:10',
    price: "45 000 so'm",
    status: 'Bekor qilindi',
    statusBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=120',
  },
];

const RESERVATIONS = [
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

const CARDS = [
  {
    type: 'VISA',
    number: '•••• •••• •••• 1234',
    isPrimary: true,
    logoBg: 'text-white font-black italic tracking-tighter text-lg',
  },
  {
    type: 'MasterCard',
    number: '•••• •••• •••• 5678',
    isPrimary: false,
    isMaster: true,
  },
  {
    type: 'UZCARD',
    number: '•••• •••• •••• 9012',
    isPrimary: false,
    logoBg: 'text-gray-300 font-bold text-xs tracking-widest',
  },
];

export default function MeningProfilim() {
  return (
    <div className="w-full bg-[#0b0b0c] text-white p-4 lg:p-6 space-y-6 selection:bg-[#e2a543] selection:text-black animate-fadeIn">
      
      {/* TOP SECTION: User Profile Info & Account Details */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* Profile Card */}
        <div className="xl:col-span-5 bg-[#141416] border border-[#222226] hover:border-[#e2a543]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-5 shadow-lg transition-all duration-300 group">
          {/* Avatar with Camera Icon */}
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
              alt="Asadbek Saidov"
              className="w-28 h-28 rounded-full object-cover border-2 border-[#e2a543]/40 p-1 group-hover:scale-105 transition-transform duration-300"
            />
            <button className="absolute bottom-1 right-1 bg-[#e2a543] hover:bg-[#cf9230] text-black p-2 rounded-full shadow-md transition-all duration-200 cursor-pointer active:scale-90">
              <Camera size={14} />
            </button>
          </div>

          {/* User Bio */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-xl font-bold text-white tracking-wide group-hover:text-[#e2a543] transition-colors">
              Asadbek Saidov
            </h2>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#231b0f] border border-[#e2a543]/30 rounded-full text-[#e2a543] text-xs font-medium">
              <Star size={12} className="fill-[#e2a543]" />
              Bronze mijoz
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-gray-400">
              <p className="flex items-center justify-center md:justify-start gap-2 hover:text-gray-200 transition-colors">
                <Mail size={14} className="text-[#e2a543]" />
                <span>asadbek@mail.com</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 hover:text-gray-200 transition-colors">
                <Phone size={14} className="text-[#e2a543]" />
                <span>+998 90 123 45 67</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 hover:text-gray-200 transition-colors">
                <MapPin size={14} className="text-[#e2a543]" />
                <span>Qarshi shahri, Mustaqillik ko'chasi 15-uy</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 hover:text-gray-200 transition-colors">
                <Calendar size={14} className="text-[#e2a543]" />
                <span>A'zo bo'lgan sana: 12 May, 2024</span>
              </p>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="xl:col-span-7 bg-[#141416] border border-[#222226] hover:border-[#e2a543]/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all duration-300">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-semibold text-white">Hisob ma'lumotlari</h3>
              <button className="flex items-center gap-1.5 text-xs text-[#e2a543] hover:underline cursor-pointer transition-all">
                <Edit2 size={13} />
                <span>Tahrirlash</span>
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
              <div className="space-y-1">
                <span className="text-gray-500 font-medium">To'liq ism</span>
                <p className="text-gray-200 font-semibold text-sm">Asadbek Saidov</p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 font-medium">Telefon raqami</span>
                <p className="text-gray-200 font-semibold text-sm">+998 90 123 45 67</p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 font-medium">Email manzil</span>
                <p className="text-gray-200 font-semibold text-sm">asadbek@mail.com</p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 font-medium">Parol</span>
                <div className="flex items-center justify-between">
                  <p className="text-gray-200 font-semibold tracking-widest text-sm">••••••••••••</p>
                  <button className="text-[11px] text-[#e2a543] hover:underline cursor-pointer">
                    O'zgartirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK STATS BAR (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatItem
          title="Jami buyurtmalar"
          value="12 ta"
          actionText="Barchasini ko'rish"
          icon={<ShoppingBag size={20} />}
          iconBg="bg-[#231c12]"
          iconColor="text-[#e2a543]"
        />
        <StatItem
          title="Jami rezervatsiyalar"
          value="3 ta"
          actionText="Barchasini ko'rish"
          icon={<CalendarRange size={20} />}
          iconBg="bg-[#231c12]"
          iconColor="text-[#e2a543]"
        />
        <StatItem
          title="Sevimlilar"
          value="8 ta"
          actionText="Barchasini ko'rish"
          icon={<Heart size={20} />}
          iconBg="bg-[#231c12]"
          iconColor="text-[#e2a543]"
        />
        <StatItem
          title="Bonus ballar"
          value="120 000 ball"
          actionText="Tarixini ko'rish"
          icon={<Star size={20} />}
          iconBg="bg-[#231c12]"
          iconColor="text-[#e2a543]"
        />
      </div>

      {/* RECENT ORDERS & RESERVATIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        
        {/* Recent Orders */}
        <SectionContainer title="So'nggi buyurtmalarim">
          <div className="space-y-3">
            {RECENT_ORDERS.map((order, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#19191d] hover:bg-[#222229] border border-[#24242a] hover:border-[#e2a543]/30 transition-all duration-200 cursor-pointer active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={order.img}
                    alt={order.title}
                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-[#e2a543] transition-colors">
                      {order.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-white">{order.price}</span>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-md border font-medium ${order.statusBg}`}
                  >
                    {order.status}
                  </span>
                  <ChevronRight size={16} className="text-gray-500 group-hover:text-[#e2a543] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Recent Reservations */}
        <SectionContainer title="So'nggi rezervatsiyalarim">
          <div className="space-y-3">
            {RESERVATIONS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#19191d] hover:bg-[#222229] border border-[#24242a] hover:border-[#e2a543]/30 transition-all duration-200 cursor-pointer active:scale-[0.99] group"
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

      {/* PAYMENT METHODS SECTION */}
      <div className="bg-[#141416] border border-[#222226] hover:border-[#2c2c34] rounded-2xl p-5 shadow-lg transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="text-sm font-semibold text-white">To'lov usullarim</h3>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <button className="flex items-center gap-1 text-xs text-[#e2a543] hover:underline cursor-pointer">
              <span>Barchasini ko'rish</span>
              <ChevronRight size={14} />
            </button>
            <button className="flex items-center gap-1.5 text-xs text-[#e2a543] border border-[#e2a543]/40 hover:bg-[#e2a543]/10 px-3 py-1.5 rounded-xl transition-all cursor-pointer active:scale-95">
              <Plus size={14} />
              <span>Yangi karta qo'shish</span>
            </button>
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#19191d] border border-[#24242a] hover:border-[#e2a543]/40 rounded-xl p-4 flex items-center justify-between hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Logo graphics */}
                <div className="w-12 h-8 bg-[#202026] rounded-md border border-gray-800 flex items-center justify-center shrink-0">
                  {card.isMaster ? (
                    <div className="flex -space-x-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500 opacity-90"></div>
                    </div>
                  ) : (
                    <span className={card.logoBg}>{card.type}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white tracking-wider">
                      {card.number}
                    </span>
                  </div>
                  {card.isPrimary && (
                    <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">
                      Asosiy karta
                    </span>
                  )}
                </div>
              </div>

              <button className="text-gray-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer">
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS ---

interface StatItemProps {
  title: string;
  value: string;
  actionText: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function StatItem({ title, value, actionText, icon, iconBg, iconColor }: StatItemProps) {
  return (
    <div className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/40 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium">{title}</p>
          <div className="text-sm font-bold text-white mt-0.5 group-hover:text-[#e2a543] transition-colors">
            {value}
          </div>
          <button className="flex items-center gap-0.5 text-[10px] text-[#e2a543] hover:underline mt-1 cursor-pointer">
            <span>{actionText}</span>
            <ChevronRight size={11} />
          </button>
        </div>
      </div>
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