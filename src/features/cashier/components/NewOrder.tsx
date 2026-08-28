import React from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  ShoppingCart, 
  CheckCircle2, 
  Utensils,
  Coffee,
  Pizza,
  Soup,
  Beef,
  Flame,
  GlassWater
} from 'lucide-react';
import { initialTables, cashierCategories } from '@/data/cashierData';
import { useNewOrder } from '../hooks/useNewOrder';
import { CustomTableSelect, type TableOption } from './CustomTableSelect';

interface InitialTableItem {
  id: string | number;
  hall: string;
  seats: number;
  status: string;
}

const getItemIcon = (category: string, name: string) => {
  const lowerName = name.toLowerCase();
  const lowerCat = category.toLowerCase();
  
  if (lowerName.includes('cola') || lowerName.includes('fanta') || lowerName.includes('suv') || lowerCat.includes('ichimlik')) {
    return <GlassWater size={24} style={{ color: '#F6B530' }} />;
  }
  if (lowerName.includes('shashlik') || lowerName.includes('gosht') || lowerName.includes('steak')) {
    return <Beef size={24} style={{ color: '#F6B530' }} />;
  }
  if (lowerName.includes('sho‘rva') || lowerName.includes('shorva')) {
    return <Soup size={24} style={{ color: '#F6B530' }} />;
  }
  if (lowerName.includes('pitsa') || lowerName.includes('fast') || lowerCat.includes('fast-food')) {
    return <Pizza size={24} style={{ color: '#F6B530' }} />;
  }
  if (lowerName.includes('choy') || lowerName.includes('qahva') || lowerName.includes('coffee')) {
    return <Coffee size={24} style={{ color: '#F6B530' }} />;
  }
  if (lowerName.includes('issiq') || lowerName.includes('qozon')) {
    return <Flame size={24} style={{ color: '#F6B530' }} />;
  }
  return <Utensils size={24} style={{ color: '#F6B530' }} />;
};

export const NewOrder: React.FC = () => {
  const {
    selectedTable,
    setSelectedTable,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cart,
    filteredItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalAmount,
    handleCompleteOrder
  } = useNewOrder();

  const formattedTables: TableOption[] = initialTables.map((t: InitialTableItem) => ({
    id: t.id,
    name: `Stol #${t.id}`,
    location: t.hall,
    seats: t.seats,
    isOccupied: t.status === 'busy'
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-[#141414] p-5 rounded-xl border border-[#222] flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-auto flex-1">
            <CustomTableSelect
              tables={formattedTables}
              selectedId={selectedTable}
              onSelect={(table) => setSelectedTable(table.id.toString())}
            />
          </div>

          <div className="w-full sm:w-72">
            <label className="block text-xs text-zinc-400 mb-1">Taomni qidirish</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Taom nomi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {cashierCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={selectedCategory === cat ? { backgroundColor: '#F6B530', color: '#09090b' } : {}}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer focus:outline-none ${
                selectedCategory === cat 
                  ? 'font-semibold' 
                  : 'bg-[#141414] border border-[#222] text-zinc-400 hover:text-zinc-200 hover:bg-[#1c1c1c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => addToCart(item)}
                className="bg-[#141414] border border-[#222] hover:border-[#F6B530]/50 p-4 rounded-xl flex flex-col justify-between gap-4 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-[#1c1c1c] rounded-xl border border-[#2a2a2a]">
                    {getItemIcon(item.category, item.name)}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
                    {item.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-200 mb-1">{item.name}</h4>
                  <div className="font-semibold text-sm" style={{ color: '#F6B530' }}>{item.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500 bg-[#141414] rounded-xl border border-[#222]">
              <Utensils size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Hech qanday taom topilmadi</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#141414] p-5 rounded-xl border border-[#222] flex flex-col justify-between h-[calc(100vh-140px)] sticky top-6">
        <div>
          <div className="flex justify-between items-center border-b border-[#222] pb-4 mb-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-zinc-200">
              <ShoppingCart size={18} style={{ color: '#F6B530' }} /> Joriy buyurtma
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
              Stol #{selectedTable}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-360px)] pr-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="p-3 bg-[#1c1c1c]/50 rounded-xl border border-[#222] flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-zinc-200 truncate">{item.name}</h5>
                    <p className="text-[11px] font-medium" style={{ color: '#F6B530' }}>{(item.price * item.quantity).toLocaleString()} so'm</p>
                  </div>

                  <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[#2a2a2a]">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-[#1c1c1c] rounded text-zinc-400 hover:text-zinc-200 cursor-pointer focus:outline-none"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold px-2 text-zinc-200">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-[#1c1c1c] rounded text-zinc-400 hover:text-zinc-200 cursor-pointer focus:outline-none"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 p-1 cursor-pointer focus:outline-none"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-zinc-500 space-y-2">
                <ShoppingCart size={36} className="mx-auto opacity-30" />
                <p className="text-xs">Savat hozircha bo'sh</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#222] pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Taomlar soni:</span>
              <span className="text-zinc-200 font-medium">{cart.reduce((acc, i) => acc + i.quantity, 0)} ta</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-zinc-300">Jami to'lov:</span>
              <span className="text-base" style={{ color: '#F6B530' }}>{totalAmount.toLocaleString()} so'm</span>
            </div>
          </div>

          <button 
            onClick={handleCompleteOrder}
            style={{ backgroundColor: '#F6B530', color: '#09090b' }}
            className="w-full py-3 hover:opacity-90 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none shadow-lg shadow-black/20"
          >
            <CheckCircle2 size={18} /> Buyurtmani managerga yuborish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;