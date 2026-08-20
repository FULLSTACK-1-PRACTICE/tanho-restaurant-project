import { useState, useMemo } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { formatSum } from '@/lib/utils';

export function RevenueChart() {
    const [range, setRange] = useState('7');

    const data = useMemo(() => {
        const days = [
            '13 May',
            '14 May',
            '15 May',
            '16 May',
            '17 May',
            '18 May',
            '19 May',
        ];

        const base = [
            8200000, 9100000, 7600000, 10400000, 11800000, 9900000, 12450000,
        ];

        const multiplier = range === '7' ? 1 : range === '14' ? 0.9 : 0.8;

        return days.map((day, index) => ({
            day,
            revenue: Math.round(base[index] * multiplier),
        }));
    }, [range]);

    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='font-semibold text-white'>Daromad statistikasi</h3>

                <div className='flex items-center gap-1 bg-[#0e0e10] rounded-lg p-1 border border-white/5'>
                    {['7', '14', '30'].map(item => (
                        <button
                            key={item}
                            onClick={() => setRange(item)}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                range === item
                                    ? 'bg-amber-500 text-black'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            {item} kun
                        </button>
                    ))}
                </div>
            </div>

            <div className='h-64 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id='revenueFill' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor='#f59e0b' stopOpacity={0.35} />
                                <stop offset='100%' stopColor='#f59e0b' stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid stroke='rgba(255,255,255,0.06)' vertical={false} />

                        <XAxis
                            dataKey='day'
                            stroke='#6b7280'
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            stroke='#6b7280'
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={value => `${Math.round(value / 1000000)}M`}
                        />

                        <Tooltip
                            contentStyle={{
                                background: '#1a1a1e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 10,
                                fontSize: 12,
                            }}
                            labelStyle={{ color: '#e5e7eb' }}
                            formatter={(value: any) => [formatSum(Number(value)), 'Daromad']}
                        />

                        <Area
                            type='monotone'
                            dataKey='revenue'
                            stroke='#f59e0b'
                            strokeWidth={2.5}
                            fill='url(#revenueFill)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}