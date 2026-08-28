import { ChevronRight } from 'lucide-react';
import { formatSum } from '../../../lib/utils';
import { STATUS_COLORS } from '../../../constants/status';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
}

export interface Order {
    id: number;
    customer: string;
    items: OrderItem[];
    total: number;
    status: keyof typeof STATUS_COLORS;
    time: string;
}

interface RecentOrdersProps {
    orders: Order[];
    onViewAll: () => void;
}

export function RecentOrders({ orders, onViewAll }: RecentOrdersProps) {
    const recent = orders.slice(0, 5);

    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl overflow-hidden'>
            <div className='flex items-center justify-between px-4 md:px-5 py-4 border-b border-white/5'>
                <h3 className='font-semibold text-white'>Oxirgi buyurtmalar</h3>

                <button
                    onClick={onViewAll}
                    className='text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1'
                >
                    Barchasini ko‘rish
                    <ChevronRight size={13} />
                </button>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='border-b border-white/5 text-left text-gray-500 text-xs uppercase tracking-wide'>
                            <th className='px-4 md:px-5 py-3 font-medium'>#</th>
                            <th className='px-4 py-3 font-medium'>Mijoz</th>
                            <th className='px-4 py-3 font-medium'>Taomlar</th>
                            <th className='px-4 py-3 font-medium'>Summa</th>
                            <th className='px-4 py-3 font-medium'>Holat</th>
                            <th className='px-4 py-3 font-medium'>Vaqt</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recent.map(order => {
                            const color = STATUS_COLORS[order.status];

                            return (
                                <tr
                                    key={order.id}
                                    className='border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors'
                                >
                                    <td className='px-4 md:px-5 py-3 text-gray-500 whitespace-nowrap'>
                                        #{order.id}
                                    </td>

                                    <td className='px-4 py-3 text-gray-200 whitespace-nowrap font-medium'>
                                        {order.customer}
                                    </td>

                                    <td className='px-4 py-3 text-gray-400 whitespace-nowrap'>
                                        {order.items.length} ta taom
                                    </td>

                                    <td className='px-4 py-3 text-gray-200 whitespace-nowrap font-medium'>
                                        {formatSum(order.total)}
                                    </td>

                                    <td className='px-4 py-3 whitespace-nowrap'>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color?.bg || ''} ${color?.text || ''}`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${color?.dot || ''}`}
                                            />
                                            {String(order.status)}
                                        </span>
                                    </td>

                                    <td className='px-4 py-3 text-gray-500 whitespace-nowrap'>
                                        {order.time}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}