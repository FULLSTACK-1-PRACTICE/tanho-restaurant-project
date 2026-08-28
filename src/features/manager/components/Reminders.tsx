import { CalendarCheck, CircleAlert, UserPlus } from 'lucide-react';

export function Reminders() {
    const items = [
        {
            icon: CalendarCheck,
            color: 'text-sky-400',
            bg: 'bg-sky-500/10',
            text: '18:00 da 6 kishilik rezervatsiya mavjud',
            time: '10:30',
        },
        {
            icon: CircleAlert,
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            text: 'Menyudagi 2 ta taom tugagan',
            time: '09:15',
        },
        {
            icon: UserPlus,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            text: 'Yangi mijoz Dilshod A. birinchi marta buyurtma qildi',
            time: 'Bugun',
        },
    ];

    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5'>
            <h3 className='font-semibold text-white mb-3'>Eslatmalar</h3>

            <div className='space-y-3'>
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className='flex items-start gap-3'>
                            <div
                                className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                                <Icon size={15} className={item.color} />
                            </div>

                            <div className='min-w-0'>
                                <p className='text-sm text-gray-200 leading-snug'>
                                    {item.text}
                                </p>

                                <p className='text-xs text-gray-500 mt-0.5'>{item.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}