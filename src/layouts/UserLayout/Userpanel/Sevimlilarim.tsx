import { useState } from 'react';
import {
  Heart,
  Plus,
  Trash2,
  ChevronRight,
  Gift,
  Grid,
  List,
  ChevronDown,
  Send,
  Globe,
  Share2,
} from 'lucide-react';

// --- MOCK DATA ---
const FAVORITES_DATA = [
  {
    id: 1,
    title: 'TANHO Plov',
    category: 'Taomlar',
    subCategory: 'Asosiy taomlar',
    price: "160 000 so'm",
    img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=300',
    addedCount: 28,
  },
  {
    id: 2,
    title: 'Beef Steak',
    category: 'Taomlar',
    subCategory: 'Asosiy taomlar',
    price: "120 000 so'm",
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300',
    addedCount: 22,
  },
  {
    id: 3,
    title: 'Caesar Salad',
    category: 'Taomlar',
    subCategory: 'Salatlar',
    price: "55 000 so'm",
    img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=300',
    addedCount: 18,
  },
  {
    id: 4,
    title: "Lag'mon",
    category: 'Taomlar',
    subCategory: 'Asosiy taomlar',
    price: "45 000 so'm",
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=300',
    addedCount: 15,
  },
  {
    id: 5,
    title: 'Mojito',
    category: 'Ichimliklar',
    subCategory: 'Ichimliklar',
    price: "35 000 so'm",
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=300',
    addedCount: 12,
  },
  {
    id: 6,
    title: 'Coca-Cola',
    category: 'Ichimliklar',
    subCategory: 'Ichimliklar',
    price: "20 000 so'm",
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300',
    addedCount: 30,
  },
  {
    id: 7,
    title: 'Cheesecake',
    category: 'Desertlar',
    subCategory: 'Desertlar',
    price: "40 000 so'm",
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=300',
    addedCount: 9,
  },
];

const TABS = [
  { name: 'Barcha', count: 12 },
  { name: 'Taomlar', count: 9 },
  { name: 'Ichimliklar', count: 2 },
  { name: 'Desertlar', count: 1 },
];

export default function Sevimliklarim() {
  const [activeTab, setActiveTab] = useState('Barcha');
  const [favorites, setFavorites] = useState(FAVORITES_DATA);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter items based on selected tab
  const filteredItems = favorites.filter((item) => {
    if (activeTab === 'Barcha') return true;
    return item.category === activeTab;
  });

  // Remove item from favorites
  const handleRemove = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-full overflow-hidden bg-[#0b0b0c] text-white p-3 sm:p-5 space-y-5 selection:bg-[#e2a543] selection:text-black">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="text-[#e2a543] fill-[#e2a543]/20" size={22} />
            <h1 className="text-lg sm:text-xl font-bold text-white">Sevimliklarim</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Sevimli taomlaringizni saqlang va keyinroq oson toping.
          </p>
        </div>

        {/* Top Right Action Button */}
        <button className="bg-[#1f1911] hover:bg-[#2a2115] border border-[#e2a543]/40 text-[#e2a543] text-xs font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0 shadow-sm">
          <Plus size={14} />
          <span>Sevimlilarga qo'shish</span>
        </button>
      </div>

      {/* FILTER TABS & SORT / VIEW CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#231b0f] text-[#e2a543] border border-[#e2a543]/40 shadow-sm'
                    : 'bg-[#141416] text-gray-400 hover:text-white border border-[#222226] hover:border-[#2f2f36]'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Filter Dropdown and Grid/List Switcher */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/40 text-xs text-gray-300 px-3 py-1.5 rounded-xl flex items-center gap-3 transition-all cursor-pointer">
            <span>Yangilangan sana</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          <div className="bg-[#141416] border border-[#222226] p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#231b0f] text-[#e2a543]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#231b0f] text-[#e2a543]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT SECTION: FAVORITES ITEMS GRID (col-span-8) */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/40 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-md relative"
              >
                {/* Heart Badge Top Right */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#e2a543] hover:scale-110 transition-transform cursor-pointer"
                  title="O'chirish"
                >
                  <Heart size={14} className="fill-[#e2a543]" />
                </button>

                <div>
                  {/* Dish Image */}
                  <div className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-[#1e1e24]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-xs font-bold text-white group-hover:text-[#e2a543] transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">{item.subCategory}</p>
                  <p className="text-xs font-bold text-white mt-1.5">{item.price}</p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#222226]">
                  <button className="flex-1 bg-[#1f1911] hover:bg-[#e2a543] text-[#e2a543] hover:text-black border border-[#e2a543]/30 text-[10px] font-semibold py-1.5 rounded-lg transition-all text-center cursor-pointer active:scale-95">
                    Menyuga o'tish
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}

            {/* "Yangi sevimli qo'shish" Card */}
            <div className="bg-[#141416]/50 border border-dashed border-[#2d2d35] hover:border-[#e2a543]/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 group min-h-[220px]">
              <div className="w-10 h-10 rounded-full bg-[#1c1c21] group-hover:bg-[#231b0f] border border-[#2d2d35] group-hover:border-[#e2a543]/40 flex items-center justify-center text-gray-400 group-hover:text-[#e2a543] transition-all">
                <Plus size={18} />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-[#e2a543] transition-colors">
                Yangi sevimli qo'shish
              </h4>
              <p className="text-[10px] text-gray-500 max-w-[130px]">
                Menyu sahifasidan sevimlilarga qo'shing
              </p>
            </div>
          </div>

          {/* 10% COUPON BANNER */}
          <div className="bg-[#141416] border border-[#222226] hover:border-[#e2a543]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg transition-all">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#231c12] border border-[#e2a543]/30 flex items-center justify-center text-[#e2a543] shrink-0 mx-auto sm:mx-0">
                <Gift size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  Sevimliklar ro'yxatingizga 5 ta va undan ortiq taom qo'shing
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Maxsus <span className="text-[#e2a543] font-semibold">10% chegirma kuponi</span> oling!
                </p>
              </div>
            </div>

            <button className="bg-[#1f1911] hover:bg-[#2a2115] border border-[#e2a543]/40 text-[#e2a543] text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap">
              Kuponni olish
            </button>
          </div>

        </div>

        {/* RIGHT SIDEBAR STATS & RECOMMENDATIONS (col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Sevimlilar ro'yxati Summary */}
          <div className="bg-[#141416] border border-[#222226] rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-[#222226]">
              Sevimlilar ro'yxati
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-[#e2a543]"></span>
                  Taomlar
                </span>
                <span className="font-bold text-white">9</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Ichimliklar
                </span>
                <span className="font-bold text-white">2</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  Desertlar
                </span>
                <span className="font-bold text-white">1</span>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-white pt-2 border-t border-[#222226]">
                <span className="text-gray-400">Jami sevimliklar</span>
                <span className="text-[#e2a543]">12</span>
              </div>
            </div>
          </div>

          {/* Eng tez-tez qo'shilganlar */}
          <div className="bg-[#141416] border border-[#222226] rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-[#222226]">
              Eng tez-tez qo'shilganlar
            </h3>

            <div className="space-y-2.5">
              {FAVORITES_DATA.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs group cursor-pointer hover:bg-[#1a1a1d] p-1.5 rounded-xl transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-medium text-white truncate group-hover:text-[#e2a543] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 shrink-0">
                    <span className="text-[10px]">{item.addedCount} marta</span>
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restoran sevimliklari Promotion Card */}
          <div className="bg-[#141416] border border-[#222226] rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white">Restoran sevimliklari</h3>

            <div className="relative h-28 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400"
                alt="Restaurant interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">TANHO Restaurant</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Sevimli taomlaringizni biz bilan baham ko'ring. Yangi taomlar va aksiyalar haqida xabardor bo'lib boring!
              </p>
            </div>

            <button className="w-full bg-[#1c1c21] hover:bg-[#25252b] border border-[#2d2d35] text-gray-200 text-xs font-medium py-2 rounded-xl transition-all cursor-pointer active:scale-95">
              Bizni kuzatib boring
            </button>

            {/* Social Icons (Globe, Send, Share2) */}
            <div className="flex items-center justify-center gap-3 pt-1 text-gray-400">
              <a href="#" className="p-1.5 bg-[#1c1c21] hover:text-[#e2a543] rounded-lg border border-[#27272f] transition-colors">
                <Globe size={14} />
              </a>
              <a href="#" className="p-1.5 bg-[#1c1c21] hover:text-[#e2a543] rounded-lg border border-[#27272f] transition-colors">
                <Send size={14} />
              </a>
              <a href="#" className="p-1.5 bg-[#1c1c21] hover:text-[#e2a543] rounded-lg border border-[#27272f] transition-colors">
                <Share2 size={14} />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}