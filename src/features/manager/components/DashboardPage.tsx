import { DollarSign, Utensils, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { StatCard } from "./StatCard";
import { formatSum } from "../../../lib/utils";

export interface Order {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: "Yakunlandi" | "Tayyorlanmoqda" | "Kutilmoqda";
  time: string;
}

interface DashboardPageProps {
  orders: Order[];
  onViewAllOrders: () => void;
}

export default function DashboardPage({ orders = [], onViewAllOrders }: DashboardPageProps) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "Yakunlandi").length;
  const pendingOrders = orders.filter(
    (o) => o.status === "Tayyorlanmoqda" || o.status === "Kutilmoqda"
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          iconBg="bg-amber-500/15"
          iconColor="text-amber-400"
          label="Jami tushum"
          value={`${formatSum ? formatSum(totalRevenue) : totalRevenue} so‘m`}
          sub="+12.5% bu hafta"
          subColor="text-emerald-400"
        />

        <StatCard
          icon={Utensils}
          iconBg="bg-sky-500/15"
          iconColor="text-sky-400"
          label="Jami buyurtmalar"
          value={`${totalOrders} ta`}
          sub="Bugungi ko'rsatkich"
          subColor="text-gray-400"
        />

        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-500/15"
          iconColor="text-emerald-400"
          label="Yakunlangan"
          value={`${completedOrders} ta`}
          sub="Muvaffaqiyatli"
          subColor="text-emerald-400"
        />

        <StatCard
          icon={Clock}
          iconBg="bg-purple-500/15"
          iconColor="text-purple-400"
          label="Jarayonda"
          value={`${pendingOrders} ta`}
          sub="Kutilmoqda / Tayyorlanmoqda"
          subColor="text-amber-400"
        />
      </div>

      <div className="bg-[#111113] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-white text-base">So'nggi buyurtmalar</h3>
            <p className="text-xs text-gray-400">Eng oxirgi tushgan buyurtmalar ro'yxati</p>
          </div>
          <button
            onClick={onViewAllOrders}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium transition-colors cursor-pointer"
          >
            Barchasini ko'rish <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
            >
              <div>
                <h4 className="text-sm font-medium text-white">{order.customerName}</h4>
                <p className="text-xs text-gray-400">{order.items}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> {order.time}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    order.status === "Yakunlandi"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : order.status === "Tayyorlanmoqda"
                      ? "bg-sky-500/10 text-sky-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {order.status}
                </span>

                <span className="text-sm font-semibold text-amber-400">
                  {formatSum ? formatSum(order.total) : order.total} so‘m
                </span>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center py-6 text-xs text-gray-500">Buyurtmalar yo'q</p>
          )}
        </div>
      </div>
    </div>
  );
}