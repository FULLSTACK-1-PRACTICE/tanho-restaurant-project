interface CircularStatProps {
    label: string;
    value: number;
    pct?: number;
    color: string;
}

function CircularStat({ label, value, pct, color }: CircularStatProps) {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const dash = pct !== undefined ? (pct / 100) * circumference : 0;

    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='relative w-[72px] h-[72px]'>
                <svg viewBox='0 0 72 72' className='w-full h-full -rotate-90'>
                    <circle
                        cx='36'
                        cy='36'
                        r={radius}
                        fill='none'
                        stroke='rgba(255,255,255,0.06)'
                        strokeWidth='6'
                    />

                    {pct !== undefined && (
                        <circle
                            cx='36'
                            cy='36'
                            r={radius}
                            fill='none'
                            stroke={color}
                            strokeWidth='6'
                            strokeLinecap='round'
                            strokeDasharray={`${dash} ${circumference}`}
                        />
                    )}
                </svg>

                <div className='absolute inset-0 flex items-center justify-center text-base font-bold text-white'>
                    {value}
                </div>
            </div>

            <div className='text-center'>
                <p className='text-xs text-gray-400'>{label}</p>
                {pct !== undefined && (
                    <p className='text-[11px] text-gray-500'>{pct}%</p>
                )}
            </div>
        </div>
    );
}

export function TableStatusCard() {
    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5'>
            <h3 className='font-semibold text-white mb-4'>Stollar holati</h3>

            <div className='grid grid-cols-4 gap-2'>
                <CircularStat label='Jami stollar' value={24} color='#6b7280' />
                <CircularStat label='Egallangan' value={14} pct={58} color='#f59e0b' />
                <CircularStat label='Bo‘sh' value={8} pct={33} color='#34d399' />
                <CircularStat label='Rezervatsiya' value={2} pct={9} color='#a78bfa' />
            </div>
        </div>
    );
}