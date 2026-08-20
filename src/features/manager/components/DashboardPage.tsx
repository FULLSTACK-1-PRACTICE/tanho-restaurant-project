import { ArrowRight, ShoppingCart, TrendingUp, Users, Clock, AlertCircle, CheckCircle2, DollarSign } from "lucide-react";
import { formatSum } from "../../../lib/utils";

interface Order {
  id: number;
  customer: string;
  items: string;
  total: number;
  status: string;
  time: string;
}

interface DashboardPageProps {
  orders: Order[];
  onViewAllOrders: () => void;
}

export function DashboardPage({ orders, onViewAllOrders }: DashboardPageProps) {
  const recentOrders = orders.length > 0 ? orders : [
    { id: 101, customer: "Anvar Toshmatov", items: "Osh Palov (2x), Coca-Cola", total: 85000, status: "Tayyorlanmoqda", time: "12:40" },
    { id: 102, customer: "Malika Karimova", items: "Manti (3x), Salat", total: 110000, status: "Yetkazib berilgan", time: "12:15" },
    { id: 103, customer: "Jasur Bek", items: "Kebab, Non", total: 65000, status: "Yangi", time: "12:50" },
    { id: 104, customer: "Zilola Rahimova", items: "Mix pizza, Fanta", total: 95000, status: "Yetkazib berilgan", time: "11:30" },
  ];

  const topFoods = [
    { name: "Kaboblar lag'mon", count: 45, width: "100%", color: "bg-amber-500" },
    { name: "Mix pizza", count: 38, width: "85%", color: "bg-amber-500" },
    { name: "Cheeseburger", count: 32, width: "70%", color: "bg-amber-500" },
    { name: "Caesar salat", count: 28, width: "60%", color: "bg-emerald-500" },
    { name: "Tandir somsa", count: 24, width: "50%", color: "bg-amber-500" },
  ];

  const reminders = [
    { title: "18:00 da 6 kishilik rezervatsiya mavjud", time: "10:30", type: "info" },
    { title: "Menyudagi 2 ta taom tugagan", time: "09:15", type: "danger" },
    { title: "Yangi mijoz Dilshod A. birinchi marta buyurtma qildi", time: "Bugun", type: "success" },
  ];

  return (
    <div className="space-y-6 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-gray-400">Bugungi tushum</p>
            <h4 className="text-lg font-bold text-white mt-1">2,450,000 so'm</h4>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +12.5% kechagiga nisbatan
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-gray-400">Faol buyurtmalar</p>
            <h4 className="text-lg font-bold text-white mt-1">8 ta</h4>
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1 mt-1">
              <Clock size={12} /> 3 tasi tayyorlanmoqda
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <ShoppingCart size={20} />
          </div>
        </div>

        <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-gray-400">Band stollar</p>
            <h4 className="text-lg font-bold text-white mt-1">14 / 24</h4>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
              58% band qilingan
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-gray-400">Mijozlar soni</p>
            <h4 className="text-lg font-bold text-white mt-1">64 ta</h4>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
              +8 ta yangi mijoz
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Oxirgi buyurtmalar</h2>
              <button 
                onClick={onViewAllOrders}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer font-medium"
              >
                Barchasini ko'rish <ArrowRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left text-gray-500 text-xs uppercase tracking-wide">
                    <th className="pb-3 font-medium">#ID</th>
                    <th className="pb-3 font-medium">Mijoz</th>
                    <th className="pb-3 font-medium">Taomlar</th>
                    <th className="pb-3 font-medium">Summa</th>
                    <th className="pb-3 font-medium">Holat</th>
                    <th className="pb-3 font-medium text-right">Vaqt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentOrders.map((order, idx) => (
                    <tr key={order.id || idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 text-amber-400 font-medium">#{order.id}</td>
                      <td className="py-3.5 text-white font-medium">{order.customer}</td>
                      <td className="py-3.5 text-gray-300 truncate max-w-[180px]">{order.items}</td>
                      <td className="py-3.5 text-white font-semibold">{formatSum(order.total)}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Yetkazib berilgan' 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : order.status === 'Tayyorlanmoqda'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-sky-500/10 text-sky-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-gray-400 text-xs">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Stollar holati</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-white/5 text-white flex items-center justify-center font-bold mb-2 text-sm">24</div>
                <p className="text-xs text-gray-400">Jami stollar</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-2 text-sm">14</div>
                <p className="text-xs text-gray-400">Egallangan (58%)</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-2 text-sm">8</div>
                <p className="text-xs text-gray-400">Bo'sh (33%)</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mb-2 text-sm">2</div>
                <p className="text-xs text-gray-400">Rezervatsiya (9%)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Eng ko'p buyurtma qilingan taomlar</h3>
            <div className="space-y-4">
              {topFoods.map((food, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-200 font-medium">{food.name}</span>
                    <span className="text-xs text-gray-400">{food.count} ta</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${food.color} rounded-full`} style={{ width: food.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111113] border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Eslatmalar</h3>
            <div className="space-y-3">
              {reminders.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  {item.type === 'danger' ? (
                    <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  ) : item.type === 'success' ? (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-200 font-medium leading-relaxed">{item.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}