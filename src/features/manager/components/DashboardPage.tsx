import { useState, useEffect } from "react";
import {
  Table2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { StatCard } from "./StatCard";

export interface Reservation {
  id: string;
  customerName: string;
  guestsCount: number;
  tableNumber: number;
  status: "Tasdiqlandi" | "Kutilmoqda" | "Bekor qilindi";
  time: string;
}

export interface DashboardPageProps {
  reservations?: Reservation[];
  onViewAllReservations?: () => void;
}

export default function DashboardPage({
  reservations = [],
  onViewAllReservations,
}: DashboardPageProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // 3 soniyadan so'ng tepaga sirpanib yo'qolish animatsiyasini boshlash
    const timer = setTimeout(() => {
      setIsAnimating(true);

      // Animatsiya tugagach DOM dan to'liq olib tashlash (500ms duration ga mos)
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const confirmedReservations = reservations.filter(
    (r) => r.status === "Tasdiqlandi"
  ).length;

  const pendingReservations = reservations.filter(
    (r) => r.status === "Kutilmoqda"
  ).length;

  const totalTables = 12;
  const activeTables = Math.min(confirmedReservations, totalTables);

  return (
    <div className="space-y-6">
      {/* Admin dashboard bilan bir xil tuzilishdagi va animatsiyali Menejer Xush kelibsiz banneri */}
      {isVisible && (
        <section
          className={`relative rounded-2xl border border-white/10 bg-[#121619] p-5 sm:p-6 transition-all duration-500 ease-in-out ${
            isAnimating
              ? "opacity-0 -translate-y-6 scale-95 max-h-0 p-0 overflow-hidden border-0 mb-0"
              : "opacity-100 translate-y-0 scale-100 max-h-40"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-500/15 p-3 text-amber-400">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Xush kelibsiz, Menejer!
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Restoran rezervatsiyalari va stollar holatini shu yerdan boshqaring.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Statistik kartalar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          icon={Table2}
          iconBg="bg-amber-500/15"
          iconColor="text-amber-400"
          label="Faol stollar"
          value={`${activeTables} / ${totalTables} ta`}
          sub="Band / Jami"
          subColor="text-emerald-400"
        />

        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-500/15"
          iconColor="text-emerald-400"
          label="Tasdiqlangan"
          value={`${confirmedReservations} ta`}
          sub="Rezervatsiya mavjud"
          subColor="text-emerald-400"
        />

        <StatCard
          icon={Clock}
          iconBg="bg-purple-500/15"
          iconColor="text-purple-400"
          label="Kutilmoqda"
          value={`${pendingReservations} ta`}
          sub="Tasdiqlash kutilmoqda"
          subColor="text-amber-400"
        />
      </div>

      {/* So'nggi rezervatsiyalar */}
      <div className="bg-[#111113] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-white text-base">
              So'nggi rezervatsiyalar
            </h3>
            <p className="text-xs text-gray-400">
              Eng oxirgi tushgan stol band qilish so'rovlari
            </p>
          </div>

          {onViewAllReservations && (
            <button
              onClick={onViewAllReservations}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium transition-colors cursor-pointer"
            >
              Barchasini ko'rish
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {reservations.slice(0, 5).map((reservation) => (
            <div
              key={reservation.id}
              className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
            >
              <div>
                <h4 className="text-sm font-medium text-white">
                  {reservation.customerName}
                </h4>

                <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Users size={12} className="text-amber-400" />
                    {reservation.guestsCount} kishi
                  </span>
                  <span>•</span>
                  <span>Stol №{reservation.tableNumber}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {reservation.time}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    reservation.status === "Tasdiqlandi"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : reservation.status === "Kutilmoqda"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {reservation.status}
                </span>
              </div>
            </div>
          ))}

          {reservations.length === 0 && (
            <p className="text-center py-6 text-xs text-gray-500">
              Rezervatsiyalar yo'q
            </p>
          )}
        </div>
      </div>
    </div>
  );
}