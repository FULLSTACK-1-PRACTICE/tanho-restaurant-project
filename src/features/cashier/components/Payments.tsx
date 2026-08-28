import React, { useState } from 'react';
import { Search, CreditCard, Banknote, QrCode, ArrowDownLeft, Receipt, CheckCircle2, X } from 'lucide-react';

const mockPayments = [
  {
    id: 'PAY-8821',
    orderId: '1026',
    table: '08',
    amount: 110000,
    method: 'card',
    cashier: 'Jamshid V.',
    time: '15:12',
    date: '22.08.2026',
    status: 'completed'
  },
  {
    id: 'PAY-8820',
    orderId: '1023',
    table: '02',
    amount: 245000,
    method: 'cash',
    cashier: 'Jamshid V.',
    time: '14:55',
    date: '22.08.2026',
    status: 'completed'
  },
  {
    id: 'PAY-8819',
    orderId: '1020',
    table: '05',
    amount: 95000,
    method: 'app',
    cashier: 'Jamshid V.',
    time: '14:20',
    date: '22.08.2026',
    status: 'completed'
  }
];

export const Payments: React.FC = () => {
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<typeof mockPayments[0] | null>(null);

  const filteredPayments = mockPayments.filter(payment => {
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.orderId.includes(searchQuery) ||
      payment.table.includes(searchQuery);
    return matchesMethod && matchesSearch;
  });

  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'cash':
        return { label: 'Naqd pul', icon: Banknote, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      case 'card':
        return { label: 'Bank kartasi', icon: CreditCard, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
      case 'app':
        return { label: 'Click / Payme', icon: QrCode, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      default:
        return { label: 'Noma\'lum', icon: CreditCard, color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] p-5 rounded-xl border border-[#222] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 mb-1">Bugungi tushum</p>
            <h3 className="text-xl font-bold" style={{ color: '#F6B530' }}>{totalRevenue.toLocaleString()} so'm</h3>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' }}>
            <ArrowDownLeft size={22} />
          </div>
        </div>

        <div className="bg-[#141414] p-5 rounded-xl border border-[#222] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 mb-1">Naqd to'lovlar</p>
            <h3 className="text-xl font-bold text-zinc-200">
              {mockPayments.filter(p => p.method === 'cash').reduce((sum, p) => sum + p.amount, 0).toLocaleString()} so'm
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Banknote size={22} />
          </div>
        </div>

        <div className="bg-[#141414] p-5 rounded-xl border border-[#222] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 mb-1">Karta / App to'lovlar</p>
            <h3 className="text-xl font-bold text-zinc-200">
              {mockPayments.filter(p => p.method !== 'cash').reduce((sum, p) => sum + p.amount, 0).toLocaleString()} so'm
            </h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <CreditCard size={22} />
          </div>
        </div>
      </div>

      <div className="bg-[#141414] p-4 rounded-xl border border-[#222] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Barcha to\'lovlar' },
            { id: 'cash', label: 'Naqd' },
            { id: 'card', label: 'Karta' },
            { id: 'app', label: 'Click / Payme' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMethod(tab.id)}
              style={filterMethod === tab.id ? { backgroundColor: '#F6B530', color: '#09090b' } : {}}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer focus:outline-none ${
                filterMethod === tab.id
                  ? 'font-semibold'
                  : 'bg-[#1c1c1c] text-zinc-400 hover:text-zinc-200 border border-[#2a2a2a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="To'lov ID yoki Stol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-[#F6B530]"
          />
        </div>
      </div>

      <div className="bg-[#141414] rounded-xl border border-[#222] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1c1c1c]/50 text-zinc-400 text-xs uppercase border-b border-[#222]">
              <tr>
                <th className="py-3.5 px-4">To'lov ID</th>
                <th className="py-3.5 px-4">Stol / Buyurtma</th>
                <th className="py-3.5 px-4">Usul</th>
                <th className="py-3.5 px-4">Sana va Vaqt</th>
                <th className="py-3.5 px-4">Summa</th>
                <th className="py-3.5 px-4 text-right">Chek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222] text-zinc-300">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => {
                  const methodBadge = getMethodBadge(payment.method);
                  const Icon = methodBadge.icon;
                  return (
                    <tr key={payment.id} className="hover:bg-[#1c1c1c]/30 transition">
                      <td className="py-4 px-4 font-semibold text-zinc-200">{payment.id}</td>
                      <td className="py-4 px-4">
                        <span className="font-medium" style={{ color: '#F6B530' }}>Stol #{payment.table}</span>
                        <span className="text-xs text-zinc-500 block">#{payment.orderId}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${methodBadge.color}`}>
                          <Icon size={13} />
                          {methodBadge.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs">
                        <span className="text-zinc-200 block">{payment.time}</span>
                        <span className="text-zinc-500">{payment.date}</span>
                      </td>
                      <td className="py-4 px-4 font-bold" style={{ color: '#F6B530' }}>{payment.amount.toLocaleString()} so'm</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedReceipt(payment)}
                          className="p-2 bg-[#1c1c1c] border border-[#2a2a2a] hover:bg-[#252525] text-zinc-300 hover:text-zinc-100 rounded-lg transition cursor-pointer focus:outline-none"
                        >
                          <Receipt size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    To'lovlar topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#222] rounded-2xl w-full max-w-sm p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-base font-bold text-zinc-200">To'lov muvaffaqiyatli</h3>
              <p className="text-xs text-zinc-400">{selectedReceipt.id}</p>
            </div>

            <div className="bg-[#1c1c1c]/50 rounded-xl p-4 space-y-2 text-xs border border-[#222]">
              <div className="flex justify-between">
                <span className="text-zinc-400">Stol raqami:</span>
                <span className="text-zinc-200 font-medium">Stol #{selectedReceipt.table}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Buyurtma ID:</span>
                <span className="text-zinc-200 font-medium">#{selectedReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Kassir:</span>
                <span className="text-zinc-200 font-medium">{selectedReceipt.cashier}</span>
              </div>
              <div className="flex justify-between border-t border-[#2a2a2a] pt-2 mt-2">
                <span className="text-zinc-400">Jami to'lov:</span>
                <span className="font-bold text-sm" style={{ color: '#F6B530' }}>{selectedReceipt.amount.toLocaleString()} so'm</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              style={{ backgroundColor: '#F6B530', color: '#09090b' }}
              className="w-full py-2.5 hover:opacity-90 font-semibold rounded-xl text-sm transition cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;