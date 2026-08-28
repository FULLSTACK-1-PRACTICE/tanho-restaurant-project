import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { STATUS_COLORS } from '../../../constants/status';

export interface Order {
    id?: number | string;
    status: keyof typeof STATUS_COLORS;
    [key: string]: unknown;
}

interface OrderStatusChartProps {
    orders: Order[];
}

export function OrderStatusChart({ orders }: OrderStatusChartProps) {
    const counts = useMemo(() => {
        const result: Record<string, number> = {
            Yangi: 0,
            Tayyorlanmoqda: 0,
            Tayyor: 0,
            'Yetkazib berilgan': 0,
        };

        orders.forEach(order => {
            const statusKey = String(order.status);
            if (result[statusKey] !== undefined) {
                result[statusKey]++;
            }
        });

        return result;
    }, [orders]);

    const total = orders.length;

    const data = Object.keys(counts).map(status => ({
        name: status,
        value: counts[status],
    }));

    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col'>
            <h3 className='font-semibold text-white mb-2'>Buyurtmalar holati</h3>

            <div className='relative h-44 w-full shrink-0'>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey='value'
                            nameKey='name'
                            innerRadius={52}
                            outerRadius={72}
                            paddingAngle={3}
                            stroke='none'
                        >
                            {data.map(item => (
                                <Cell
                                    key={item.name}
                                    fill={STATUS_COLORS[item.name as keyof typeof STATUS_COLORS]?.hex}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: '#1a1a1e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 10,
                                fontSize: 12,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                    <span className='text-2xl font-bold text-white'>{total}</span>
                    <span className='text-[11px] text-gray-500'>Jami</span>
                </div>
            </div>

            <div className='mt-3 space-y-2'>
                {data.map(item => {
                    const color = STATUS_COLORS[item.name as keyof typeof STATUS_COLORS];
                    const percentage = total
                        ? ((item.value / total) * 100).toFixed(1)
                        : '0.0';

                    return (
                        <div
                            key={item.name}
                            className='flex items-center justify-between text-sm'
                        >
                            <div className='flex items-center gap-2 min-w-0'>
                                <span
                                    className={`w-2 h-2 rounded-full shrink-0 ${color?.dot || ''}`}
                                />

                                <span className='text-gray-400 truncate'>{item.name}</span>
                            </div>

                            <span className='text-gray-200 font-medium shrink-0'>
                                {item.value}{' '}
                                <span className='text-gray-500'>({percentage}%)</span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}