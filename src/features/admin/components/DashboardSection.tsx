import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Flame,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

type SectionKey =
  | "menyu"
  | "buyurtmalar"
  | "rezervatsiyalar"
  | "hisobotlar"
  | "xodimlar"
  | "mijozlar"
  | "sozlamalar";

interface DashboardSectionProps {
  goTo: (section: SectionKey) => void;
}

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  background: string;
  color: string;
}

export function DashboardSection({ goTo }: DashboardSectionProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // 4 soniyadan so'ng yo'qolish animatsiyasini boshlash
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      // Animatsiya tugagach DOM dan to'liq olib tashlash (500ms duration ga mos)
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const stats: StatItem[] = [
    {
      label: "Jami buyurtmalar",
      value: "0",
      change: "0% bu hafta",
      icon: ClipboardList,
      background: "bg-purple-500/20",
      color: "text-purple-400",
    },
    {
      label: "Eng mashhur taom",
      value: "Osh (Palov)",
      change: "Hafta hit-taomi",
      icon: Flame,
      background: "bg-amber-500/20",
      color: "text-amber-400",
    },
    {
      label: "Rezervatsiyalar",
      value: "0",
      change: "0% bu hafta",
      icon: CalendarCheck,
      background: "bg-blue-500/20",
      color: "text-blue-400",
    },
    {
      label: "Faol mijozlar",
      value: "0",
      change: "0% bu hafta",
      icon: Users,
      background: "bg-red-500/20",
      color: "text-red-400",
    },
  ];

  const quickActions = [
    {
      label: "Menyu boshqaruvi",
      description: "Taomlar va kategoriyalar",
      icon: Store,
      section: "menyu" as SectionKey,
    },
    {
      label: "Buyurtmalar",
      description: "Barcha buyurtmalarni ko‘rish",
      icon: ClipboardList,
      section: "buyurtmalar" as SectionKey,
    },
    {
      label: "Xodimlar",
      description: "Admin va xodimlar ro‘yxati",
      icon: ShieldCheck,
      section: "xodimlar" as SectionKey,
    },
    {
      label: "Hisobotlar",
      description: "Faoliyat statistikalari",
      icon: BarChart3,
      section: "hisobotlar" as SectionKey,
    },
    {
      label: "Mijozlar",
      description: "Mijozlar ma’lumotlari",
      icon: Users,
      section: "mijozlar" as SectionKey,
    },
    {
      label: "Sozlamalar",
      description: "Admin panel sozlamalari",
      icon: Settings,
      section: "sozlamalar" as SectionKey,
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      {isVisible && (
        <section
          className={`relative rounded-2xl border border-white/10 bg-[#121619] p-5 sm:p-6 transition-all duration-500 ease-in-out ${
            isAnimating
              ? "opacity-0 scale-95 max-h-0 p-0 overflow-hidden border-0 mb-0"
              : "opacity-100 scale-100 max-h-40"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-500/15 p-3 text-amber-400">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Xush kelibsiz, Admin!
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Restoran tizimi, xodimlar va barcha faoliyatni shu yerdan
                boshqaring.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-xl border border-white/10 bg-[#121619] p-5 transition-colors hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.background}`}
                >
                  <Icon size={20} className={stat.color} />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-xs text-gray-400">
                    {stat.label}
                  </div>

                  <div className="text-xl font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                {stat.change}
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-white/10 bg-[#121619] p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Admin boshqaruvi
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Kerakli bo‘limga tezda o‘tish uchun amalni tanlang.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => goTo(action.section)}
                className="flex min-h-[86px] cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-left transition hover:border-amber-500/50 hover:bg-amber-500/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <Icon size={20} />
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-gray-200">
                    {action.label}
                  </span>

                  <span className="mt-1 block truncate text-xs text-gray-500">
                    {action.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}