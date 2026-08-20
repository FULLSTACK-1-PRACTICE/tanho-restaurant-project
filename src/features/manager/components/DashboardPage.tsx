import type { ComponentType } from 'react';
import {
    Wallet,
    ClipboardCheck,
    CalendarCheck,
    UserPlus,
    Receipt,
} from 'lucide-react';
import { formatSum } from '../../../lib/utils';
import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { OrderStatusChart } from './OrderStatusChart';
import { RecentOrders } from './RecentOrders';
import { PopularFoods } from './PopularFoods';
import type { Food } from './PopularFoods';
import { TableStatusCard } from './TableStatusCard';
import { Reminders } from './Reminders';

export interface OrderItem {
    id?: number;
    name?: string;
    price?: number;
    quantity?: number;
}

export interface Order {
    id: number | string;
    customer: string;
    items: OrderItem[];
    total: number;
    status: string;
    time: string;
}

interface DashboardPageProps {
    foods: Food[];
    orders: Order[];
    onViewAllOrders: () => void;
}

const RevenueChartComp = RevenueChart as unknown as ComponentType<{ orders: unknown }>;
const OrderStatusChartComp = OrderStatusChart as unknown as ComponentType<{ orders: unknown }>;
const RecentOrdersComp = RecentOrders as unknown as ComponentType<{ orders: unknown; onViewAll: () => void }>;

export function DashboardPage({
    foods,
    orders,
    onViewAllOrders,
}: DashboardPageProps) {
    const todayRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const avgCheck = orders.length ? Math.round(todayRevenue / orders.length) : 0;

    return (
        <div className='space-y-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4'>
                <StatCard
                    icon={Wallet}
                    iconBg='bg-amber-500/15'
                    iconColor='text-amber-400'
                    label='Bugungi daromad'
                    value={formatSum(todayRevenue)}
                    sub='18.5% kechagiga nisbatan'
                    subColor='text-emerald-400'
                />

                <StatCard
                    icon={ClipboardCheck}
                    iconBg='bg-sky-500/15'
                    iconColor='text-sky-400'
                    label='Buyurtmalar'
                    value={orders.length}
                    sub='12.3% kechagiga nisbatan'
                    subColor='text-emerald-400'
                />

                <StatCard
                    icon={CalendarCheck}
                    iconBg='bg-violet-500/15'
                    iconColor='text-violet-400'
                    label='Rezervatsiyalar'
                    value={18}
                    sub='8.7% kechagiga nisbatan'
                    subColor='text-emerald-400'
                />

                <StatCard
                    icon={UserPlus}
                    iconBg='bg-emerald-500/15'
                    iconColor='text-[#34d399]'
                    label='Yangi mijozlar'
                    value={24}
                    sub='15.2% kechagiga nisbatan'
                    subColor='text-emerald-400'
                />

                <StatCard
                    icon={Receipt}
                    iconBg='bg-rose-500/15'
                    iconColor='text-rose-400'
                    label='O‘rtacha chek'
                    value={formatSum(avgCheck)}
                    sub='6.4% kechagiga nisbatan'
                    subColor='text-emerald-400'
                />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                <div className='xl:col-span-2'>
                    <RevenueChartComp orders={orders} />
                </div>

                <OrderStatusChartComp orders={orders} />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                <div className='xl:col-span-2'>
                    <RecentOrdersComp orders={orders} onViewAll={onViewAllOrders} />
                </div>

                <PopularFoods foods={foods} />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                <div className='xl:col-span-2'>
                    <TableStatusCard />
                </div>

                <Reminders />
            </div>
        </div>
    );
}