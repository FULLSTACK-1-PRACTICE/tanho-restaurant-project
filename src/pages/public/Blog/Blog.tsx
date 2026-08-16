import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Utensils, 
  Coffee, 
  Lightbulb, 
  PartyPopper, 
  Building2, 
  LayoutGrid,
  Sparkles
} from 'lucide-react';

// Kategoriya interfeysi
interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

// Maqola interfeysi
interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  image: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Barchasi', icon: LayoutGrid },
  { id: 'taomlar', name: 'Taomlar', icon: Utensils },
  { id: 'ichimliklar', name: 'Ichimliklar', icon: Coffee },
  { id: 'maslahatlar', name: 'Maslahatlar', icon: Lightbulb },
  { id: 'tadbirlar', name: 'Tadbirlar', icon: PartyPopper },
  { id: 'restoran-hayoti', name: 'Restoran hayoti', icon: Building2 },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'TANHO taomlari qanday tayyorlanadi?',
    description: 'Taomlarimizning sirli retseptlari, sifatli mahsulotlar va oshpazlarimizning mahorati.',
    category: 'taomlar',
    categoryLabel: 'Taomlar',
    date: '12 May, 2024',
    readTime: '5 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Steak tanlash bo\'yicha qo\'llanma',
    description: 'Steak turlari, pishirish darajalari va qaysi biri sizga mos kelishini bilib oling.',
    category: 'maslahatlar',
    categoryLabel: 'Maslahatlar',
    date: '8 May, 2024',
    readTime: '4 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Qahva tanlash bo\'yicha qo\'llanma',
    description: 'Espresso, Cappuccino, Latte va boshqa qahva turlari haqida batafsil.',
    category: 'ichimliklar',
    categoryLabel: 'Ichimliklar',
    date: '3 May, 2024',
    readTime: '6 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Sog\'lom ovqatlanish: TANHO menyusidan nimalarni tanlash mumkin?',
    description: 'Yengil, foydali va muvozanatli taomlar haqida maslahatlar.',
    category: 'maslahatlar',
    categoryLabel: 'Maslahatlar',
    date: '28 Apr, 2024',
    readTime: '4 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'TANHO\'da tadbir tashkli qilish',
    description: 'Tug\'ilgan kun, oilaviy kecha yoki biznes uchrashuvlari uchun eng yaxshi joy.',
    category: 'tadbirlar',
    categoryLabel: 'Tadbirlar',
    date: '20 Apr, 2024',
    readTime: '5 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Dessertlar: Shirinliklar olamini kashf eting',
    description: 'TANHO dessertlari va ularning o\'ziga xosligi haqida bilib oling.',
    category: 'taomlar',
    categoryLabel: 'Taomlar',
    date: '15 Apr, 2024',
    readTime: '4 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'TANHO restoran hayotidan',
    description: 'Bizning kunlarimiz, jamoamiz va siz bilan birga yaratilgan lahzalar.',
    category: 'restoran-hayoti',
    categoryLabel: 'Restoran hayoti',
    date: '10 Apr, 2024',
    readTime: '3 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'TANHO\'dagi yangi taomlar',
    description: 'Menyuga qo\'shilgan yangi taomlar va ularning mazasi haqida.',
    category: 'yangiliklar',
    categoryLabel: 'Yangiliklar',
    date: '5 Apr, 2024',
    readTime: '3 daqiqasi o\'qish',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
  },
];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-200 font-sans pb-20">
      {/* Banner / Hero Section */}
      <div 
        className="relative bg-cover bg-center py-24 px-4 text-center border-b border-amber-900/20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(13, 15, 18, 0.75), rgba(13, 15, 18, 0.95)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop')`,
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Oltinsimon milliy bezak / Naqsh belgisi */}
          <div className="flex items-center justify-center gap-2 mb-3 text-amber-500">
            <span className="w-8 h-[1px] bg-amber-500/50"></span>
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="w-8 h-[1px] bg-amber-500/50"></span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 tracking-wide">
            Maqolalar
          </h1>
          
          <p className="text-gray-300 text-sm md:text-base max-w-xl font-light leading-relaxed">
            TANHO restorani va oshxonasi haqida foydali maqolalar, maslahatlar va qiziqarli ma'lumotlar
          </p>
        </div>
      </div>

      {/* Asosiy Kontent (Filterlar + Qidiruv + Maqolalar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Filtr paneli va Qidiruv qatori */}
        <div className="bg-[#14171d] border border-gray-800/80 rounded-xl p-3 md:p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Kategoriyalar tugmalari */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-amber-600/10 text-amber-400 border-amber-500/50 shadow-sm'
                      : 'bg-transparent text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Qidiruv inputi */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Maqola qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d0f12] border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Maqolalar Grid ro'yxati */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-[#14171d] border border-gray-800/80 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                <div>
                  {/* Rasm va Badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Kategoriya Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-gray-700/60 rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                      <Utensils className="w-3 h-3" />
                      <span>{post.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Kontent */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Card Pastki Qismi (Sana va Vaqt) */}
                <div className="p-4 pt-0 border-t border-gray-800/40 mt-auto flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{post.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{post.readTime}</span>
                  </div>

                  <button className="text-gray-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Maqolalar topilmadi.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;