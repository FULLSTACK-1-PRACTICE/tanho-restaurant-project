import React from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  ShoppingCart, 
  CheckCircle2, 
  Utensils 
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
        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#262626] flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-auto flex-1">
            <CustomTableSelect
              tables={formattedTables}
              selectedId={selectedTable}
              onSelect={(table) => setSelectedTable(table.id.toString())}
            />
          </div>

          <div className="w-full sm:w-72">
            <label className="block text-xs text-gray-400 mb-1">Taomni qidirish</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Taom nomi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#262626] border border-[#333] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {cashierCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer focus:outline-none ${
                selectedCategory === cat 
                  ? 'bg-amber-500 text-black font-semibold' 
                  : 'bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white hover:bg-[#262626]'
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
                className="bg-[#1a1a1a] border border-[#262626] hover:border-amber-500/50 p-4 rounded-xl flex flex-col justify-between gap-4 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl p-2.5 bg-[#262626] rounded-xl">{item.image}</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">{item.name}</h4>
                  <div className="text-amber-500 font-semibold text-sm">{item.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 bg-[#1a1a1a] rounded-xl border border-[#262626]">
              <Utensils size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Hech qanday taom topilmadi</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#262626] flex flex-col justify-between h-[calc(100vh-140px)] sticky top-6">
        <div>
          <div className="flex justify-between items-center border-b border-[#262626] pb-4 mb-4">
            <h3 className="text-base font-bold flex items-center gap-2">
              <ShoppingCart size={18} className="text-amber-500" /> Joriy buyurtma
            </h3>
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-semibold">
              Stol #{selectedTable}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-360px)] pr-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="p-3 bg-[#262626]/50 rounded-xl border border-[#262626] flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-white truncate">{item.name}</h5>
                    <p className="text-[11px] text-amber-400 font-medium">{(item.price * item.quantity).toLocaleString()} so'm</p>
                  </div>

                  <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-[#333]">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-[#262626] rounded text-gray-300 hover:text-white cursor-pointer focus:outline-none"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold px-2 text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-[#262626] rounded text-gray-300 hover:text-white cursor-pointer focus:outline-none"
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
              <div className="text-center py-16 text-gray-500 space-y-2">
                <ShoppingCart size={36} className="mx-auto opacity-30" />
                <p className="text-xs">Savat hozircha bo'sh</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#262626] pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Taomlar soni:</span>
              <span className="text-white font-medium">{cart.reduce((acc, i) => acc + i.quantity, 0)} ta</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-300">Jami to'lov:</span>
              <span className="text-amber-500 text-base">{totalAmount.toLocaleString()} so'm</span>
            </div>
          </div>

          <button 
            onClick={handleCompleteOrder}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-none shadow-lg shadow-amber-500/10"
          >
            <CheckCircle2 size={18} /> Buyurtmani oshxonaga yuborish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;