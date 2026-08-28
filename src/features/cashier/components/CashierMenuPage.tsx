import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit3, Search, Utensils, X, Upload, ChevronDown } from 'lucide-react';
import { cashierMenuItems } from '@/data/cashierData';

interface MenuItem {
  id: string | number;
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
}

export const CashierMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    (cashierMenuItems as Array<{ id: number | string; name: string; category: string; price: number | string; image: string; available: boolean }>).map((item) => ({
      ...item,
      price: typeof item.price === 'string' ? Number(item.price) : item.price,
    }))
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('Asosiy ovqatlar');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');

  // Custom select uchun state
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['Asosiy ovqatlar', 'Ichimliklar', 'Salatlar', 'Fast-food', 'Shirinliklar'];

  // Tashqariga bosganda dropdown'ni yopish uchun
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setCategory(item.category);
      setPrice(item.price.toString());
      setImage(item.image);
    } else {
      setEditingItem(null);
      setName('');
      setCategory('Asosiy ovqatlar');
      setPrice('');
      setImage('');
    }
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent: ProgressEvent<FileReader>) => {
        if (uploadEvent.target?.result) {
          setImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editingItem) {
      setMenuItems(menuItems.map(i => i.id === editingItem.id ? {
        ...i,
        name,
        category,
        price: Number(price),
        image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
      } : i));
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name,
        category,
        price: Number(price),
        image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        available: true
      };
      setMenuItems([newItem, ...menuItems]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number) => {
    setMenuItems(menuItems.filter(i => String(i.id) !== String(id)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#141414] p-4 rounded-xl border border-[#222]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Taom nomini qidirish..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530]"
          />
        </div>

        <button
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: '#F6B530' }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-zinc-950 font-medium px-4 py-2.5 rounded-lg text-sm transition hover:opacity-90 cursor-pointer"
        >
          <Plus size={18} /> Yangi taom qo'shish
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', ...categories].map((cat: string) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={selectedCategory === cat ? { backgroundColor: '#F6B530', color: '#09090b' } : {}}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition ${
              selectedCategory === cat 
                ? 'font-semibold' 
                : 'bg-[#141414] text-zinc-400 hover:text-zinc-200 border border-[#222]'
            }`}
          >
            {cat === 'all' ? 'Barcha kategoriyalar' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item: MenuItem) => (
          <div key={item.id} className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="h-40 w-full overflow-hidden relative bg-[#1c1c1c]">
                <img 
                  loading="lazy"
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-zinc-200 text-[11px] px-2.5 py-1 rounded-md font-medium border border-white/10">
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-medium text-zinc-200 text-sm">{item.name}</h4>
                <p style={{ color: '#F6B530' }} className="font-semibold text-sm">
                  {item.price.toLocaleString()} so'm
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center gap-2 border-t border-[#222] mt-2 pt-3">
              <button
                onClick={() => handleOpenModal(item)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#1c1c1c] hover:bg-[#262626] text-zinc-300 py-2 rounded-lg text-xs font-medium transition border border-[#2a2a2a] cursor-pointer"
              >
                <Edit3 size={14} /> Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/10 cursor-pointer"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#262626] w-full max-w-md rounded-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#222] pb-4">
              <h3 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                <Utensils size={16} style={{ color: '#F6B530' }} />
                {editingItem ? "Taomni tahrirlash" : "Yangi taom qo'shish"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-200 transition cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Taom nomi</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530]"
                  placeholder="Masalan: Osh"
                />
              </div>

              {/* CUSTOM DROPDOWN (Brauzerning ko'k select oynasidan qutulish uchun) */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Kategoriya</label>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{ borderColor: isDropdownOpen ? '#F6B530' : undefined }}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 flex items-center justify-between cursor-pointer transition select-none"
                >
                  <span>{category}</span>
                  <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden z-20">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-3.5 py-2.5 text-sm cursor-pointer transition flex items-center justify-between ${
                          category === cat 
                            ? 'bg-[#262626] text-[#F6B530] font-medium' 
                            : 'text-zinc-300 hover:bg-[#222] hover:text-zinc-100'
                        }`}
                      >
                        <span>{cat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Narxi (so'mda)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530]"
                  placeholder="25000"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Rasm yuklash</label>
                <label className="flex flex-col items-center justify-center border border-dashed border-[#2a2a2a] hover:border-[#F6B530] bg-[#1c1c1c] rounded-lg p-4 cursor-pointer transition">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                    <Upload size={15} style={{ color: '#F6B530' }} />
                    <span>{image ? "Rasm tanlandi (o'zgartirish uchun bosing)" : "Kompyuterdan rasm tanlang"}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {image && (
                  <div className="mt-2.5 h-16 w-16 rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#1c1c1c]">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#222]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-[#1c1c1c] hover:bg-[#262626] text-zinc-300 py-2.5 rounded-lg text-xs font-medium transition border border-[#2a2a2a] cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#F6B530' }}
                  className="flex-1 text-zinc-950 py-2.5 rounded-lg text-xs font-semibold transition hover:opacity-90 cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierMenuPage;