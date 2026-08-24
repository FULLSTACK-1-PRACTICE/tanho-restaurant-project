import {
  ShoppingBag,
  DollarSign,
  CalendarCheck,
  Users,
  Plus,
  PackageSearch,
  BarChart3,
} from "lucide-react";

// SectionKey tipingizni mos ravishda import qiling
type SectionKey = "menyu" | "buyurtmalar" | "rezervatsiyalar" | "hisobotlar" | "stollar" | "profil";

interface DashboardSectionProps {
  goTo: (section: SectionKey) => void;
}

export function DashboardSection({ goTo }: DashboardSectionProps) {
  const stats = [
    {
      label: "Jami buyurtmalar",
      value: "0",
      change: "0% bu hafta",
      icon: ShoppingBag,
      bg: "bg-purple-500/20",
      color: "text-purple-400",
    },
    {
      label: "Jami daromad",
      value: "0 so'm",
      change: "0% bu hafta",
      icon: DollarSign,
      bg: "bg-green-500/20",
      color: "text-green-400",
    },
    {
      label: "Rezervatsiyalar",
      value: "0",
      change: "0% bu hafta",
      icon: CalendarCheck,
      bg: "bg-blue-500/20",
      color: "text-blue-400",
    },
    {
      label: "Faol mijozlar",
      value: "0",
      change: "0% bu hafta",
      icon: Users,
      bg: "bg-red-500/20",
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-[#121619] p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon size={20} className={stat.color} />
              </div>

              <div>
                <div className="text-xs text-gray-400">{stat.label}</div>
                <div className="text-xl font-semibold">{stat.value}</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#121619] p-5">
        <h2 className="mb-4 text-base font-semibold">Tezkor amallar</h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            onClick={() => goTo("menyu")}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <Plus className="text-[#d9a441]" size={22} />
            Taom qo'shish
          </button>

          <button
            onClick={() => goTo("buyurtmalar")}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <PackageSearch className="text-green-400" size={22} />
            Buyurtmalar
          </button>

          <button
            onClick={() => goTo("rezervatsiyalar")}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <CalendarCheck className="text-blue-400" size={22} />
            Rezervatsiya
          </button>

          <button
            onClick={() => goTo("hisobotlar")}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 py-4 text-xs hover:border-[#d9a441]/50 hover:bg-[#191e22]"
          >
            <BarChart3 className="text-red-400" size={22} />
            Hisobotlar
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        * Statistikalar hozircha statik ko'rsatilgan — API ulanganda real raqamlar bilan almashtiriladi.
      </p>
    </div>
  );
}