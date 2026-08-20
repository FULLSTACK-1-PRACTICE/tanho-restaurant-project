import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export function StatCard({ title, value, change, icon: Icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-lg">
      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <h4 className="text-lg font-bold text-white mt-1">{value}</h4>
        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
          {change}
        </span>
      </div>
      <div className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={20} />
      </div>
    </div>
  );
}