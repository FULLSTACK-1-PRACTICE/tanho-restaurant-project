import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    label: string;
    value: string | number;
    sub?: string;
    subColor?: string;
    trendUp?: boolean;
}

export function StatCard({
    icon: Icon,
    iconBg,
    iconColor,
    label,
    value,
    sub,
    subColor,
    trendUp = true,
}: StatCardProps) {
    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5'>
            <div
                className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
            >
                <Icon size={22} className={iconColor} strokeWidth={1.75} />
            </div>

            <div className='min-w-0'>
                <p className='text-xs text-gray-500 truncate'>{label}</p>

                <p className='text-2xl font-bold text-white leading-tight truncate'>
                    {value}
                </p>

                {sub && (
                    <p
                        className={`text-xs font-medium flex items-center gap-1 ${subColor}`}
                    >
                        <TrendingUp size={11} className={trendUp ? '' : 'rotate-180'} />
                        {sub}
                    </p>
                )}
            </div>
        </div>
    );
}