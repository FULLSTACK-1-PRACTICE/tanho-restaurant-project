import React from "react";

interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
}

export function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  subColor = "text-gray-400",
}: StatCardProps) {
  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs text-gray-400">{label}</p>
        <h4 className="text-xl font-bold text-white">{value}</h4>
        {sub && <p className={`text-xs font-medium ${subColor}`}>{sub}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={22} strokeWidth={1.75} />
      </div>
    </div>
  );
}