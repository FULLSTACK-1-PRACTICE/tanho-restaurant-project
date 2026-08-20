import {
	AlertTriangle,
	BarChart3,
	Bell,
	CalendarCheck,
	Check,
	ChefHat,
	ChevronDown,
	ChevronRight,
	CircleAlert,
	CircleDollarSign,
	ClipboardCheck,
	ClipboardList,
	Copy,
	Crown,
	Eye,
	FileText,
	Home,
	LogOut,
	Menu,
	Newspaper,
	Package,
	Pencil,
	Plus,
	PlusCircle,
	Receipt,
	Search,
	Settings,
	Sparkles,
	Table2,
	Tags,
	Trash2,
	TrendingUp,
	Upload,
	User,
	UserPlus,
	Users,
	UserSquare2,
	UtensilsCrossed,
	Wallet,
	X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import logoImg from '../../assets/images/Layout/Header/Logo-2.png'

import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const IMAGE_STYLES = [
	{ id: 'amber', label: 'Amber', from: '#f59e0b', to: '#b45309' },
	{ id: 'rose', label: 'Rose', from: '#fb7185', to: '#9f1239' },
	{ id: 'emerald', label: 'Emerald', from: '#34d399', to: '#065f46' },
	{ id: 'sky', label: 'Sky', from: '#38bdf8', to: '#0369a1' },
	{ id: 'violet', label: 'Violet', from: '#a78bfa', to: '#5b21b6' },
	{ id: 'orange', label: 'Orange', from: '#fb923c', to: '#9a3412' },
]

const DEFAULT_CATEGORIES = [
	{ id: 1, name: 'Issiq taomlar', icon: 'amber' },
	{ id: 2, name: 'Salatlar', icon: 'emerald' },
	{ id: 3, name: 'Fast Food', icon: 'orange' },
	{ id: 4, name: 'Ichimliklar', icon: 'sky' },
	{ id: 5, name: 'Desertlar', icon: 'rose' },
	{ id: 6, name: 'Shorvalar', icon: 'violet' },
	{ id: 7, name: 'Qo‘shimchalar', icon: 'amber' },
]

const DEFAULT_FOODS = [
	{
		id: 1,
		name: 'TANHO Plov',
		category: 'Issiq taomlar',
		price: 35000,
		status: 'Mavjud',
		image: 'amber',
	},
	{
		id: 2,
		name: 'Beef Steak',
		category: 'Issiq taomlar',
		price: 120000,
		status: 'Mavjud',
		image: 'orange',
	},
	{
		id: 3,
		name: 'Lag‘mon',
		category: 'Issiq taomlar',
		price: 45000,
		status: 'Mavjud',
		image: 'amber',
	},
	{
		id: 4,
		name: 'Caesar Salad',
		category: 'Salatlar',
		price: 55000,
		status: 'Mavjud',
		image: 'emerald',
	},
	{
		id: 5,
		name: 'Tovuq BBQ',
		category: 'Issiq taomlar',
		price: 65000,
		status: 'Mavjud emas',
		image: 'orange',
	},
	{
		id: 6,
		name: 'Borsch',
		category: 'Shorvalar',
		price: 28000,
		status: 'Mavjud',
		image: 'violet',
	},
	{
		id: 7,
		name: 'Coca-Cola 0.5L',
		category: 'Ichimliklar',
		price: 12000,
		status: 'Mavjud',
		image: 'sky',
	},
	{
		id: 8,
		name: 'Tiramisu',
		category: 'Desertlar',
		price: 32000,
		status: 'Mavjud emas',
		image: 'rose',
	},
	{
		id: 9,
		name: 'Mastava',
		category: 'Issiq taomlar',
		price: 30000,
		status: 'Mavjud',
		image: 'amber',
	},
	{
		id: 10,
		name: 'Manti',
		category: 'Issiq taomlar',
		price: 40000,
		status: 'Mavjud',
		image: 'orange',
	},
	{
		id: 11,
		name: 'Shashlik',
		category: 'Issiq taomlar',
		price: 55000,
		status: 'Mavjud emas',
		image: 'amber',
	},
	{
		id: 12,
		name: 'Olivye salad',
		category: 'Salatlar',
		price: 30000,
		status: 'Mavjud',
		image: 'emerald',
	},
	{
		id: 13,
		name: 'Vitamin salad',
		category: 'Salatlar',
		price: 25000,
		status: 'Mavjud',
		image: 'emerald',
	},
	{
		id: 14,
		name: 'Achichuq',
		category: 'Salatlar',
		price: 18000,
		status: 'Mavjud',
		image: 'emerald',
	},
	{
		id: 15,
		name: 'Cheeseburger',
		category: 'Fast Food',
		price: 38000,
		status: 'Mavjud',
		image: 'orange',
	},
	{
		id: 16,
		name: 'Hot-dog',
		category: 'Fast Food',
		price: 22000,
		status: 'Mavjud',
		image: 'orange',
	},
	{
		id: 17,
		name: 'Doner',
		category: 'Fast Food',
		price: 28000,
		status: 'Mavjud',
		image: 'orange',
	},
	{
		id: 18,
		name: 'Pizza Margarita',
		category: 'Fast Food',
		price: 65000,
		status: 'Mavjud',
		image: 'orange',
	},
	{
		id: 19,
		name: 'Krilya BBQ',
		category: 'Fast Food',
		price: 42000,
		status: 'Mavjud emas',
		image: 'orange',
	},
	{
		id: 20,
		name: 'Fanta 0.5L',
		category: 'Ichimliklar',
		price: 12000,
		status: 'Mavjud',
		image: 'sky',
	},
	{
		id: 21,
		name: 'Choy (choynak)',
		category: 'Ichimliklar',
		price: 8000,
		status: 'Mavjud',
		image: 'sky',
	},
	{
		id: 22,
		name: 'Napoleon tort',
		category: 'Desertlar',
		price: 35000,
		status: 'Mavjud',
		image: 'rose',
	},
	{
		id: 23,
		name: 'Mampar',
		category: 'Shorvalar',
		price: 27000,
		status: 'Mavjud',
		image: 'violet',
	},
	{
		id: 24,
		name: 'Non',
		category: 'Qo‘shimchalar',
		price: 5000,
		status: 'Mavjud',
		image: 'amber',
	},
]

const SIDEBAR_SECTIONS = [
	{ key: 'bosh-sahifa', label: 'Bosh sahifa', icon: Home },
	{
		key: 'menyu',
		label: 'Menyu',
		icon: UtensilsCrossed,
		children: [
			{ key: 'taomlar', label: 'Taomlar', icon: ChefHat },
			{ key: 'kategoriyalar', label: 'Kategoriyalar', icon: Tags },
			{ key: 'qoshimchalar', label: 'Qo‘shimchalar', icon: PlusCircle },
		],
	},
	{ key: 'buyurtmalar', label: 'Buyurtmalar', icon: ClipboardList },
	{ key: 'rezervatsiyalar', label: 'Rezervatsiyalar', icon: CalendarCheck },
	{ key: 'stollar', label: 'Stollar', icon: Table2 },
	{ key: 'mijozlar', label: 'Mijozlar', icon: Users },
	{ key: 'yangiliklar', label: 'Yangiliklar', icon: Newspaper },
	{ key: 'maqolalar', label: 'Maqolalar', icon: FileText },
	{ key: 'xodimlar', label: 'Xodimlar', icon: UserSquare2 },
	{ key: 'hisobotlar', label: 'Hisobotlar', icon: BarChart3 },
]

const PAGE_TITLES = {
	'bosh-sahifa': 'Bosh sahifa',
	taomlar: 'Taomlar',
	kategoriyalar: 'Kategoriyalar',
	qoshimchalar: 'Qo‘shimchalar',
	buyurtmalar: 'Buyurtmalar',
	rezervatsiyalar: 'Rezervatsiyalar',
	stollar: 'Stollar',
	mijozlar: 'Mijozlar',
	yangiliklar: 'Yangiliklar',
	maqolalar: 'Maqolalar',
	xodimlar: 'Xodimlar',
	hisobotlar: 'Hisobotlar',
	sozlamalar: 'Sozlamalar',
	profil: 'Profil',
}

const STATUS_COLORS = {
	Yangi: {
		text: 'text-sky-400',
		bg: 'bg-sky-500/10',
		dot: 'bg-sky-400',
		hex: '#38bdf8',
	},
	Tayyorlanmoqda: {
		text: 'text-amber-400',
		bg: 'bg-amber-500/10',
		dot: 'bg-amber-400',
		hex: '#f59e0b',
	},
	Tayyor: {
		text: 'text-emerald-400',
		bg: 'bg-emerald-500/10',
		dot: 'bg-emerald-400',
		hex: '#34d399',
	},
	'Yetkazib berilgan': {
		text: 'text-violet-400',
		bg: 'bg-violet-500/10',
		dot: 'bg-violet-400',
		hex: '#a78bfa',
	},
}

function formatSum(n) {
	return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' so‘m'
}

function Thumb({ style, size = 40 }) {
	const found = IMAGE_STYLES.find(s => s.id === style) || IMAGE_STYLES[0]

	return (
		<div
			className='rounded-lg flex items-center justify-center shrink-0 ring-1 ring-white/10'
			style={{
				width: size,
				height: size,
				background: `linear-gradient(135deg, ${found.from}, ${found.to})`,
			}}
		>
			<ChefHat
				size={Math.round(size * 0.5)}
				className='text-white/90'
				strokeWidth={1.75}
			/>
		</div>
	)
}

function Toast({ message, onClose }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 2600)
		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div className='fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-lg bg-[#1a1a1e] border border-white/10 px-4 py-3 shadow-2xl shadow-black/50'>
			<div className='w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center'>
				<Check size={14} className='text-emerald-400' />
			</div>
			<span className='text-sm text-gray-200'>{message}</span>
		</div>
	)
}

function Modal({ title, onClose, children, maxWidth = 'max-w-md' }) {
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	return (
		<div className='fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'>
			<div
				className={`w-full ${maxWidth} bg-[#141416] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto`}
			>
				<div className='flex items-center justify-between px-5 py-4 border-b border-white/10 sticky top-0 bg-[#141416] rounded-t-2xl'>
					<h3 className='text-base font-semibold text-white'>{title}</h3>

					<button
						onClick={onClose}
						className='w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors'
					>
						<X size={18} />
					</button>
				</div>

				<div className='p-5'>{children}</div>
			</div>
		</div>
	)
}

function FieldLabel({ children }) {
	return (
		<label className='block text-xs font-medium text-gray-400 mb-1.5'>
			{children}
		</label>
	)
}

const inputClass =
	'w-full bg-[#0e0e10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-colors'

function StatCard({
	icon: Icon,
	iconBg,
	iconColor,
	label,
	value,
	sub,
	subColor,
	trendUp = true,
}) {
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
	)
}

function RevenueChart() {
	const [range, setRange] = useState('7')

	const data = useMemo(() => {
		const days = [
			'13 May',
			'14 May',
			'15 May',
			'16 May',
			'17 May',
			'18 May',
			'19 May',
		]

		const base = [
			8200000, 9100000, 7600000, 10400000, 11800000, 9900000, 12450000,
		]

		const multiplier = range === '7' ? 1 : range === '14' ? 0.9 : 0.8

		return days.map((day, index) => ({
			day,
			revenue: Math.round(base[index] * multiplier),
		}))
	}, [range])

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
							formatter={value => [formatSum(value), 'Daromad']}
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
	)
}

function OrderStatusChart({ orders }) {
	const counts = useMemo(() => {
		const result = {
			Yangi: 0,
			Tayyorlanmoqda: 0,
			Tayyor: 0,
			'Yetkazib berilgan': 0,
		}

		orders.forEach(order => {
			result[order.status]++
		})

		return result
	}, [orders])

	const total = orders.length

	const data = Object.keys(counts).map(status => ({
		name: status,
		value: counts[status],
	}))

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
								<Cell key={item.name} fill={STATUS_COLORS[item.name].hex} />
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
					const color = STATUS_COLORS[item.name]
					const percentage = total
						? ((item.value / total) * 100).toFixed(1)
						: '0.0'

					return (
						<div
							key={item.name}
							className='flex items-center justify-between text-sm'
						>
							<div className='flex items-center gap-2 min-w-0'>
								<span
									className={`w-2 h-2 rounded-full shrink-0 ${color.dot}`}
								/>

								<span className='text-gray-400 truncate'>{item.name}</span>
							</div>

							<span className='text-gray-200 font-medium shrink-0'>
								{item.value}{' '}
								<span className='text-gray-500'>({percentage}%)</span>
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

function PopularFoods({ foods }) {
	const popular = [
		{
			name: 'Kaboblar lag‘mon',
			qty: 45,
			image: 'amber',
		},
		{
			name: 'Mix pizza',
			qty: 38,
			image: 'orange',
		},
		{
			name: 'Cheeseburger',
			qty: 32,
			image: 'orange',
		},
		{
			name: 'Caesar salat',
			qty: 28,
			image: 'emerald',
		},
		{
			name: 'Tandir somsa',
			qty: 24,
			image: 'amber',
		},
	]

	const max = Math.max(...popular.map(item => item.qty))

	return (
		<div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5'>
			<h3 className='font-semibold text-white mb-3'>
				Eng ko‘p buyurtma qilingan taomlar
			</h3>

			<div className='space-y-3.5'>
				{popular.map(item => {
					const matched = foods.find(food =>
						food.name
							.toLowerCase()
							.includes(item.name.split(' ')[0].toLowerCase())
					)

					return (
						<div key={item.name} className='flex items-center gap-3'>
							<Thumb style={matched?.image || item.image} size={36} />

							<div className='flex-1 min-w-0'>
								<div className='flex items-center justify-between mb-1'>
									<span className='text-sm text-gray-200 truncate'>
										{item.name}
									</span>

									<span className='text-xs text-gray-500 shrink-0 ml-2'>
										{item.qty} ta
									</span>
								</div>

								<div className='h-1.5 w-full rounded-full bg-white/5 overflow-hidden'>
									<div
										className='h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400'
										style={{
											width: `${(item.qty / max) * 100}%`,
										}}
									/>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

function RecentOrders({ orders, onViewAll }) {
	const recent = orders.slice(0, 5)

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
							const color = STATUS_COLORS[order.status]

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
											className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text}`}
										>
											<span
												className={`w-1.5 h-1.5 rounded-full ${color.dot}`}
											/>
											{order.status}
										</span>
									</td>

									<td className='px-4 py-3 text-gray-500 whitespace-nowrap'>
										{order.time}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function CircularStat({ label, value, pct, color }) {
	const radius = 30
	const circumference = 2 * Math.PI * radius
	const dash = pct !== undefined ? (pct / 100) * circumference : 0

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
	)
}

function TableStatusCard() {
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
	)
}

function Reminders() {
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
	]

	return (
		<div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5'>
			<h3 className='font-semibold text-white mb-3'>Eslatmalar</h3>

			<div className='space-y-3'>
				{items.map((item, index) => {
					const Icon = item.icon

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
					)
				})}
			</div>
		</div>
	)
}

function DashboardPage({ foods, orders, onViewAllOrders }) {
	const todayRevenue = orders.reduce((sum, order) => sum + order.total, 0)

	const avgCheck = orders.length ? Math.round(todayRevenue / orders.length) : 0

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
					iconColor='text-emerald-400'
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
					<RevenueChart orders={orders} />
				</div>

				<OrderStatusChart orders={orders} />
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
				<div className='xl:col-span-2'>
					<RecentOrders orders={orders} onViewAll={onViewAllOrders} />
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
	)
}

function FoodFormModal({ title, categories, initial, onClose, onSubmit }) {
	const [name, setName] = useState(initial?.name || '')
	const [category, setCategory] = useState(
		initial?.category || categories[0]?.name || ''
	)
	const [price, setPrice] = useState(initial ? String(initial.price) : '')
	const [status, setStatus] = useState(initial?.status || 'Mavjud')
	const [image, setImage] = useState(initial?.image || IMAGE_STYLES[0].id)
	const [error, setError] = useState('')

	function handleSubmit() {
		if (!name.trim()) {
			setError('Taom nomini kiriting')
			return
		}

		if (!category) {
			setError('Kategoriyani tanlang')
			return
		}

		const priceNumber = Number(price)

		if (!priceNumber || priceNumber <= 0) {
			setError('To‘g‘ri narx kiriting')
			return
		}

		onSubmit({
			name: name.trim(),
			category,
			price: priceNumber,
			status,
			image,
		})
	}

	return (
		<Modal title={title} onClose={onClose}>
			<div className='space-y-4'>
				<div>
					<FieldLabel>Taom nomi</FieldLabel>

					<input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Masalan: Osh Palov'
						className={inputClass}
					/>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					<div>
						<FieldLabel>Kategoriya</FieldLabel>

						<select
							value={category}
							onChange={e => setCategory(e.target.value)}
							className={`${inputClass} cursor-pointer`}
						>
							{categories.map(categoryItem => (
								<option key={categoryItem.id} value={categoryItem.name}>
									{categoryItem.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<FieldLabel>Narxi (so‘m)</FieldLabel>

						<input
							type='number'
							value={price}
							onChange={e => setPrice(e.target.value)}
							placeholder='35000'
							className={inputClass}
						/>
					</div>
				</div>

				<div>
					<FieldLabel>Rasm</FieldLabel>

					<div className='flex flex-wrap gap-2'>
						{IMAGE_STYLES.map(style => (
							<button
								key={style.id}
								onClick={() => setImage(style.id)}
								className={`relative rounded-lg transition-all ${
									image === style.id
										? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#141416]'
										: ''
								}`}
							>
								<Thumb style={style.id} size={38} />
							</button>
						))}
					</div>
				</div>

				<div>
					<FieldLabel>Holati</FieldLabel>

					<div className='flex gap-2'>
						{['Mavjud', 'Mavjud emas'].map(item => (
							<button
								key={item}
								onClick={() => setStatus(item)}
								className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
									status === item
										? item === 'Mavjud'
											? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
											: 'bg-red-500/15 border-red-500/40 text-red-400'
										: 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'
								}`}
							>
								{item}
							</button>
						))}
					</div>
				</div>

				{error && <p className='text-xs text-red-400'>{error}</p>}

				<div className='flex gap-3 pt-1'>
					<button
						onClick={onClose}
						className='flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 text-sm font-medium transition-colors'
					>
						Bekor qilish
					</button>

					<button
						onClick={handleSubmit}
						className='flex-1 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors'
					>
						Saqlash
					</button>
				</div>
			</div>
		</Modal>
	)
}

function AddCategoryModal({ onClose, onSubmit }) {
	const [name, setName] = useState('')
	const [error, setError] = useState('')

	function handleSubmit() {
		if (!name.trim()) {
			setError('Kategoriya nomini kiriting')
			return
		}

		onSubmit(name)
	}

	return (
		<Modal title='Yangi kategoriya qo‘shish' onClose={onClose}>
			<div className='space-y-4'>
				<div>
					<FieldLabel>Kategoriya nomi</FieldLabel>

					<input
						value={name}
						onChange={e => {
							setName(e.target.value)
							setError('')
						}}
						placeholder='Masalan: Grill taomlar'
						className={inputClass}
						autoFocus
					/>

					{error && <p className='text-xs text-red-400 mt-1.5'>{error}</p>}
				</div>

				<div className='flex gap-3'>
					<button
						onClick={onClose}
						className='flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 text-sm font-medium transition-colors'
					>
						Bekor qilish
					</button>

					<button
						onClick={handleSubmit}
						className='flex-1 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors'
					>
						Qo‘shish
					</button>
				</div>
			</div>
		</Modal>
	)
}

function ImportModal({ onClose, onImport }) {
	const [fileName, setFileName] = useState('')
	const [error, setError] = useState('')
	const [parsed, setParsed] = useState(null)
	const fileInputRef = useRef(null)

	function parseCSV(text) {
		const lines = text.trim().split('\n').filter(Boolean)

		if (lines.length < 2) return []

		const headers = lines[0].split(',').map(item => item.trim().toLowerCase())

		return lines.slice(1).map(line => {
			const cells = line.split(',').map(item => item.trim())
			const row = {}

			headers.forEach((header, index) => {
				if (header === 'name' || header === 'nomi') {
					row.name = cells[index]
				}

				if (header === 'category' || header === 'kategoriya') {
					row.category = cells[index]
				}

				if (header === 'price' || header === 'narxi') {
					row.price = Number(cells[index])
				}

				if (header === 'status' || header === 'holat') {
					row.status = cells[index]
				}
			})

			return row
		})
	}

	function handleFile(file) {
		setError('')
		setFileName(file.name)

		const reader = new FileReader()

		reader.onload = () => {
			const text = String(reader.result || '')

			try {
				if (file.name.endsWith('.json')) {
					const json = JSON.parse(text)
					setParsed(Array.isArray(json) ? json : [])
				} else {
					setParsed(parseCSV(text))
				}
			} catch {
				setError('Faylni o‘qishda xatolik yuz berdi')
				setParsed(null)
			}
		}

		reader.readAsText(file)
	}

	return (
		<Modal title='Ma’lumotlarni import qilish' onClose={onClose}>
			<div className='space-y-4'>
				<div
					onClick={() => fileInputRef.current?.click()}
					onDragOver={e => e.preventDefault()}
					onDrop={e => {
						e.preventDefault()

						const file = e.dataTransfer.files?.[0]

						if (file) handleFile(file)
					}}
					className='border-2 border-dashed border-white/15 hover:border-amber-500/40 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors'
				>
					<div className='w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center'>
						<Upload size={22} className='text-amber-400' />
					</div>

					<div className='text-center'>
						<p className='text-sm text-gray-200 font-medium'>
							{fileName || 'Faylni tanlash uchun bosing yoki bu yerga tashlang'}
						</p>

						<p className='text-xs text-gray-500 mt-1'>
							JSON yoki CSV formatida
						</p>
					</div>

					<input
						ref={fileInputRef}
						type='file'
						accept='.json,.csv'
						className='hidden'
						onChange={e => {
							const file = e.target.files?.[0]

							if (file) handleFile(file)
						}}
					/>
				</div>

				{parsed && (
					<div className='rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 text-sm text-gray-300'>
						{parsed.length} ta yozuv topildi
					</div>
				)}

				{error && <p className='text-xs text-red-400'>{error}</p>}

				<div className='flex gap-3 pt-1'>
					<button
						onClick={onClose}
						className='flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 text-sm font-medium transition-colors'
					>
						Bekor qilish
					</button>

					<button
						onClick={() => parsed && onImport(parsed)}
						disabled={!parsed || parsed.length === 0}
						className='flex-1 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm font-semibold transition-colors'
					>
						Import qilish
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default function App() {
	const [foods, setFoods] = useState(() => {
		try {
			const saved = localStorage.getItem('tanho_foods')

			return saved ? JSON.parse(saved) : DEFAULT_FOODS
		} catch {
			return DEFAULT_FOODS
		}
	})

	const [categories, setCategories] = useState(() => {
		try {
			const saved = localStorage.getItem('tanho_categories')

			return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES
		} catch {
			return DEFAULT_CATEGORIES
		}
	})

	const [activePage, setActivePage] = useState('bosh-sahifa')

	const [menuOpen, setMenuOpen] = useState(true)
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

	const [notifOpen, setNotifOpen] = useState(false)
	const [notifCount, setNotifCount] = useState(3)
	const [adminOpen, setAdminOpen] = useState(false)
	const [headerSearch, setHeaderSearch] = useState('')

	const [toast, setToast] = useState(null)

	const [selectedCategory, setSelectedCategory] = useState('Barchasi')

	const [statusFilter, setStatusFilter] = useState('Barchasi')

	const [searchTerm, setSearchTerm] = useState('')

	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(8)

	const [addModalOpen, setAddModalOpen] = useState(false)

	const [editFood, setEditFood] = useState(null)
	const [deleteFood, setDeleteFood] = useState(null)
	const [importOpen, setImportOpen] = useState(false)

	const [addCategoryOpen, setAddCategoryOpen] = useState(false)

	const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false)

	const [previewImage, setPreviewImage] = useState(null)

	const notifRef = useRef(null)
	const adminRef = useRef(null)

	const showToast = message => {
		setToast(message)
	}

	useEffect(() => {
		localStorage.setItem('tanho_foods', JSON.stringify(foods))
	}, [foods])

	useEffect(() => {
		localStorage.setItem('tanho_categories', JSON.stringify(categories))
	}, [categories])

	useEffect(() => {
		function handleClick(e) {
			if (notifRef.current && !notifRef.current.contains(e.target)) {
				setNotifOpen(false)
			}

			if (adminRef.current && !adminRef.current.contains(e.target)) {
				setAdminOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [])

	const totalCount = foods.length

	const availableCount = foods.filter(food => food.status === 'Mavjud').length

	const unavailableCount = totalCount - availableCount

	const availablePercent = totalCount
		? Math.round((availableCount / totalCount) * 100)
		: 0

	const unavailablePercent = 100 - availablePercent

	const categoryCounts = useMemo(() => {
		const result = {}

		categories.forEach(category => {
			result[category.name] = foods.filter(
				food => food.category === category.name
			).length
		})

		return result
	}, [categories, foods])

	const filteredFoods = useMemo(() => {
		return foods.filter(food => {
			const categoryMatch =
				selectedCategory === 'Barchasi' || food.category === selectedCategory

			const statusMatch =
				statusFilter === 'Barchasi' || food.status === statusFilter

			const searchMatch = food.name
				.toLowerCase()
				.includes(searchTerm.trim().toLowerCase())

			return categoryMatch && statusMatch && searchMatch
		})
	}, [foods, selectedCategory, statusFilter, searchTerm])

	useEffect(() => {
		setPage(1)
	}, [selectedCategory, statusFilter, searchTerm, pageSize])

	const totalPages = Math.max(1, Math.ceil(filteredFoods.length / pageSize))

	const currentPage = Math.min(page, totalPages)

	const paginatedFoods = filteredFoods.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	)

	const rangeStart =
		filteredFoods.length === 0 ? 0 : (currentPage - 1) * pageSize + 1

	const rangeEnd = Math.min(currentPage * pageSize, filteredFoods.length)

	function handleAddFood(food) {
		const nextId = foods.length
			? Math.max(...foods.map(item => item.id)) + 1
			: 1

		setFoods(prev => [
			...prev,
			{
				...food,
				id: nextId,
			},
		])

		setAddModalOpen(false)

		showToast(`"${food.name}" taomlar ro‘yxatiga qo‘shildi`)
	}

	function handleUpdateFood(food) {
		setFoods(prev => prev.map(item => (item.id === food.id ? food : item)))

		setEditFood(null)

		showToast(`"${food.name}" ma’lumotlari yangilandi`)
	}

	function handleDuplicateFood(food) {
		const nextId = foods.length
			? Math.max(...foods.map(item => item.id)) + 1
			: 1

		setFoods(prev => [
			...prev,
			{
				...food,
				id: nextId,
				name: `${food.name} (nusxa)`,
			},
		])

		showToast(`"${food.name}" nusxalandi`)
	}

	function handleConfirmDelete() {
		if (!deleteFood) return

		setFoods(prev => prev.filter(item => item.id !== deleteFood.id))

		showToast(`"${deleteFood.name}" o‘chirildi`)

		setDeleteFood(null)
	}

	function handleAddCategory(name) {
		const trimmed = name.trim()

		if (!trimmed) return

		if (
			categories.some(
				category => category.name.toLowerCase() === trimmed.toLowerCase()
			)
		) {
			showToast('Bu nomdagi kategoriya allaqachon mavjud')

			return
		}

		const nextId = categories.length
			? Math.max(...categories.map(item => item.id)) + 1
			: 1

		const icons = ['amber', 'emerald', 'sky', 'rose', 'violet', 'orange']

		setCategories(prev => [
			...prev,
			{
				id: nextId,
				name: trimmed,
				icon: icons[nextId % icons.length],
			},
		])

		setAddCategoryOpen(false)

		showToast(`"${trimmed}" kategoriyasi qo‘shildi`)
	}

	function handleDeleteCategory(category) {
		if (categoryCounts[category.name] > 0) {
			showToast('Bu kategoriyada taomlar mavjud, avval ularni o‘chiring')

			return
		}

		setCategories(prev => prev.filter(item => item.id !== category.id))

		if (selectedCategory === category.name) {
			setSelectedCategory('Barchasi')
		}

		showToast(`"${category.name}" kategoriyasi o‘chirildi`)
	}

	function handleSidebarClick(key) {
		setActivePage(key)
		setMobileSidebarOpen(false)

		if (key === 'kategoriyalar') {
			setSelectedCategory('Barchasi')
		}
	}

	const breadcrumb = (() => {
		if (activePage === 'bosh-sahifa') {
			return ['Bosh sahifa']
		}

		if (activePage === 'taomlar') {
			return ['Bosh sahifa', 'Menyu', 'Taomlar']
		}

		if (activePage === 'kategoriyalar') {
			return ['Bosh sahifa', 'Menyu', 'Kategoriyalar']
		}

		if (activePage === 'qoshimchalar') {
			return ['Bosh sahifa', 'Menyu', 'Qo‘shimchalar']
		}

		return ['Bosh sahifa', PAGE_TITLES[activePage] || 'Bosh sahifa']
	})()

	const headerTitle = PAGE_TITLES[activePage] || 'Bosh sahifa'

	const isMenuPage = activePage === 'taomlar' || activePage === 'kategoriyalar'

	return (
		<div className='flex h-screen bg-[#0a0a0b] text-gray-200 overflow-hidden'>
			{mobileSidebarOpen && (
				<div
					className='fixed inset-0 z-30 bg-black/60 lg:hidden'
					onClick={() => setMobileSidebarOpen(false)}
				/>
			)}
			<aside
				className={`fixed lg:static z-40 h-full ${
					sidebarOpen ? 'w-[260px]' : 'w-[76px]'
				} shrink-0 bg-[#0d0d0f] border-r border-white/5 flex flex-col transition-all duration-300 ${
					mobileSidebarOpen
						? 'translate-x-0'
						: '-translate-x-full lg:translate-x-0'
				}`}
			>
				<div className='cursor-pointer h-[72px] flex items-center justify-center border-b border-white/5 px-2'>
					{sidebarOpen ? (
						<img
							src={logoImg}
							alt='Tanho Restaurant Logo'
							className='h-[70px] w-auto max-w-[220px] object-contain scale-110'
						/>
					) : (
						<Crown size={22} className='text-amber-400' strokeWidth={1.75} />
					)}
				</div>

				<nav className='flex-1 overflow-y-auto py-3 px-3 space-y-1'>
					{SIDEBAR_SECTIONS.map(section => {
						const Icon = section.icon
						const hasChildren = 'children' in section && section.children

						const isParentActive = hasChildren
							? section.children.some(child => child.key === activePage)
							: activePage === section.key

						return (
							<div key={section.key}>
								<button
									onClick={() => {
										if (hasChildren) {
											setMenuOpen(value => !value)
											if (!menuOpen) {
												handleSidebarClick(section.children[0].key)
											}
										} else {
											handleSidebarClick(section.key)
										}
									}}
									className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${
										isParentActive
											? 'bg-amber-500/10 text-amber-400'
											: 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
									}`}
								>
									{isParentActive && (
										<span className='absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-amber-500' />
									)}

									<Icon size={18} strokeWidth={1.75} className='shrink-0' />

									{sidebarOpen && (
										<>
											<span className='flex-1 text-left font-medium'>
												{section.label}
											</span>

											{hasChildren &&
												(menuOpen ? (
													<ChevronDown size={15} className='text-gray-500' />
												) : (
													<ChevronRight size={15} className='text-gray-500' />
												))}
										</>
									)}
								</button>

								{hasChildren && sidebarOpen && menuOpen && (
									<div className='ml-[22px] mt-1 pl-4 border-l border-white/10 space-y-0.5'>
										{section.children.map(child => {
											const ChildIcon = child.icon
											const active = activePage === child.key

											return (
												<button
													key={child.key}
													onClick={() => handleSidebarClick(child.key)}
													className={`w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
														active
															? 'text-amber-400 bg-amber-500/10 font-medium'
															: 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
													}`}
												>
													<ChildIcon size={14} strokeWidth={1.75} />
													<span>{child.label}</span>
												</button>
											)
										})}
									</div>
								)}
							</div>
						)
					})}
				</nav>
			</aside>

			<div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
				<header className='h-[72px] shrink-0 border-b border-white/5 bg-[#0a0a0b]/95 backdrop-blur flex items-center justify-between px-4 md:px-6 gap-4'>
					<div className='flex items-center gap-4 min-w-0'>
						<button
							onClick={() => {
								setSidebarOpen(value => !value)
								setMobileSidebarOpen(value => !value)
							}}
							className='w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors shrink-0'
						>
							<Menu size={20} />
						</button>

						<div className='min-w-0 hidden sm:block'>
							<h1 className='text-lg font-semibold text-white truncate'>
								{headerTitle}
							</h1>

							<div className='flex items-center gap-1.5 text-xs text-gray-500 truncate'>
								{breadcrumb.map((item, index) => (
									<span key={index} className='flex items-center gap-1.5'>
										{index > 0 && <ChevronRight size={11} />}

										<span
											className={
												index === breadcrumb.length - 1 ? 'text-amber-400' : ''
											}
										>
											{item}
										</span>
									</span>
								))}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3 md:gap-4'>
						<div className='relative hidden md:block'>
							<Search
								size={16}
								className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
							/>

							<input
								value={headerSearch}
								onChange={e => setHeaderSearch(e.target.value)}
								placeholder='Qidirish...'
								className='w-64 bg-[#141416] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/40 transition-colors'
							/>
						</div>

						<div className='relative' ref={notifRef}>
							<button
								onClick={() => {
									setNotifOpen(value => !value)
									setAdminOpen(false)

									if (!notifOpen) {
										setNotifCount(0)
									}
								}}
								className='relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors'
							>
								<Bell size={19} />

								{notifCount > 0 && (
									<span className='absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center'>
										{notifCount}
									</span>
								)}
							</button>

							{notifOpen && (
								<div className='absolute right-0 mt-2 w-80 bg-[#141416] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50'>
									<div className='px-4 py-3 border-b border-white/10 text-sm font-semibold text-white'>
										Bildirishnomalar
									</div>

									<div className='max-h-72 overflow-y-auto divide-y divide-white/5'>
										{[
											{
												t: 'Yangi buyurtma qabul qilindi',
												s: '2 daqiqa oldin',
											},
											{
												t: '“Tovuq BBQ” mavjud emas deb belgilandi',
												s: '1 soat oldin',
											},
											{
												t: 'Yangi bron so‘rovi keldi',
												s: '3 soat oldin',
											},
										].map((item, index) => (
											<div
												key={index}
												className='px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer'
											>
												<p className='text-sm text-gray-200'>{item.t}</p>

												<p className='text-xs text-gray-500 mt-0.5'>{item.s}</p>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						<div className='relative' ref={adminRef}>
							<button
								onClick={() => {
									setAdminOpen(value => !value)
									setNotifOpen(false)
								}}
								className='flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-white/5 transition-colors'
							>
								<div className='w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-bold text-sm shrink-0'>
									A
								</div>

								<div className='text-left hidden sm:block'>
									<p className='text-sm font-medium text-white leading-tight'>
										Admin
									</p>

									<p className='text-xs text-gray-500 leading-tight'>
										Administrator
									</p>
								</div>

								<ChevronDown size={14} className='text-gray-500' />
							</button>

							{adminOpen && (
								<div className='absolute right-0 mt-2 w-52 bg-[#141416] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 py-1'>
									<button
										onClick={() => {
											setAdminOpen(false)
											setActivePage('profil')
										}}
										className='w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors'
									>
										<User size={15} />
										Profil
									</button>

									<button
										onClick={() => {
											setAdminOpen(false)
											setActivePage('sozlamalar')
										}}
										className='w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors'
									>
										<Settings size={15} />
										Sozlamalar
									</button>

									<div className='h-px bg-white/10 my-1' />

									<button
										onClick={() => {
											setAdminOpen(false)
											showToast('Tizimdan chiqildi')
										}}
										className='w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors'
									>
										<LogOut size={15} />
										Chiqish
									</button>
								</div>
							)}
						</div>
					</div>
				</header>

				<main className='flex-1 overflow-y-auto p-4 md:p-6'>
					{activePage === 'bosh-sahifa' ? (
						<DashboardPage
							foods={foods}
							orders={[]}
							onViewAllOrders={() => handleSidebarClick('buyurtmalar')}
						/>
					) : isMenuPage ? (
						<div className='space-y-5'>
							<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
								<StatCard
									icon={Package}
									iconBg='bg-amber-500/15'
									iconColor='text-amber-400'
									label='Jami taomlar'
									value={totalCount}
									sub='+2 bu hafta'
									subColor='text-emerald-400'
								/>

								<StatCard
									icon={CircleDollarSign}
									iconBg='bg-emerald-500/15'
									iconColor='text-emerald-400'
									label='Mavjud taomlar'
									value={availableCount}
									sub={`${availablePercent}%`}
									subColor='text-emerald-400'
								/>

								<StatCard
									icon={CircleDollarSign}
									iconBg='bg-red-500/15'
									iconColor='text-red-400'
									label='Mavjud emas'
									value={unavailableCount}
									sub={`${unavailablePercent}%`}
									subColor='text-red-400'
								/>

								<StatCard
									icon={Users}
									iconBg='bg-sky-500/15'
									iconColor='text-sky-400'
									label='Kategoriyalar'
									value={categories.length}
									sub='Barchasi faol'
									subColor='text-gray-400'
								/>
							</div>

							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3'>
								<button
									onClick={() => setAddModalOpen(true)}
									className='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors'
								>
									<Plus size={17} />
									Taom qo‘shish
								</button>

								<button
									onClick={() => setImportOpen(true)}
									className='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#141416] border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-200 text-sm font-semibold transition-colors'
								>
									<Upload size={16} />
									Import qilish
								</button>
							</div>

							<div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5'>
								<div className='bg-[#111113] border border-white/5 rounded-2xl p-4 h-fit'>
									<div className='flex items-center justify-between mb-3'>
										<h3 className='font-semibold text-white'>Kategoriyalar</h3>

										<button
											onClick={() => setAddCategoryOpen(true)}
											className='w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 flex items-center justify-center'
										>
											<Plus size={15} />
										</button>
									</div>

									<div className='space-y-1'>
										<button
											onClick={() => setSelectedCategory('Barchasi')}
											className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
												selectedCategory === 'Barchasi'
													? 'bg-amber-500/15 text-amber-400 font-medium'
													: 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
											}`}
										>
											<span>Barchasi</span>

											<span className='text-xs px-2 py-0.5 rounded-full bg-white/5'>
												{totalCount}
											</span>
										</button>

										{categories.map(category => {
											const active = selectedCategory === category.name

											return (
												<button
													key={category.id}
													onClick={() => setSelectedCategory(category.name)}
													className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
														active
															? 'bg-amber-500/15 text-amber-400 font-medium'
															: 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
													}`}
												>
													<span className='truncate'>{category.name}</span>2
													<span className='text-xs px-2 py-0.5 rounded-full bg-white/5'>
														{categoryCounts[category.name] || 0}
													</span>
												</button>
											)
										})}
									</div>

									<button
										onClick={() => setManageCategoriesOpen(true)}
										className='w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10'
									>
										<Settings size={15} />
										Kategoriyalarni boshqarish
									</button>
								</div>

								<div className='min-w-0'>
									<div className='flex flex-col md:flex-row gap-3 mb-4'>
										<select
											value={selectedCategory}
											onChange={e => setSelectedCategory(e.target.value)}
											className={`${inputClass} md:w-48 cursor-pointer`}
										>
											<option value='Barchasi'>Barchasi</option>

											{categories.map(category => (
												<option key={category.id} value={category.name}>
													{category.name}
												</option>
											))}
										</select>

										<select
											value={statusFilter}
											onChange={e => setStatusFilter(e.target.value)}
											className={`${inputClass} md:w-48 cursor-pointer`}
										>
											<option value='Barchasi'>Barchasi (holat)</option>

											<option value='Mavjud'>Mavjud</option>

											<option value='Mavjud emas'>Mavjud emas</option>
										</select>

										<div className='relative flex-1'>
											<Search
												size={16}
												className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
											/>

											<input
												value={searchTerm}
												onChange={e => setSearchTerm(e.target.value)}
												placeholder='Taom nomi bo‘yicha qidirish...'
												className={`${inputClass} pl-9`}
											/>
										</div>
									</div>

									<div className='bg-[#111113] border border-white/5 rounded-2xl overflow-hidden'>
										<div className='overflow-x-auto'>
											<table className='w-full text-sm'>
												<thead>
													<tr className='border-b border-white/5 text-left text-gray-500 text-xs uppercase tracking-wide'>
														<th className='px-4 py-3 font-medium'>#</th>

														<th className='px-4 py-3 font-medium'>Taom nomi</th>

														<th className='px-4 py-3 font-medium'>
															Kategoriya
														</th>

														<th className='px-4 py-3 font-medium'>Narxi</th>

														<th className='px-4 py-3 font-medium'>Holat</th>

														<th className='px-4 py-3 font-medium'>Rasm</th>

														<th className='px-4 py-3 font-medium text-right'>
															Amallar
														</th>
													</tr>
												</thead>

												<tbody>
													{paginatedFoods.length === 0 ? (
														<tr>
															<td
																colSpan={7}
																className='px-4 py-14 text-center text-gray-500'
															>
																Hech qanday taom topilmadi
															</td>
														</tr>
													) : (
														paginatedFoods.map(food => (
															<tr
																key={food.id}
																className='border-b border-white/5 last:border-0 hover:bg-white/[0.03]'
															>
																<td className='px-4 py-3 text-gray-500'>
																	#{String(food.id).padStart(3, '0')}
																</td>

																<td className='px-4 py-3'>
																	<div className='flex items-center gap-3'>
																		<Thumb style={food.image} />

																		<span className='font-medium text-gray-100'>
																			{food.name}
																		</span>
																	</div>
																</td>

																<td className='px-4 py-3 text-gray-400'>
																	{food.category}
																</td>

																<td className='px-4 py-3 text-gray-200 font-medium'>
																	{formatSum(food.price)}
																</td>

																<td className='px-4 py-3'>
																	<span
																		className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
																			food.status === 'Mavjud'
																				? 'bg-emerald-500/10 text-emerald-400'
																				: 'bg-red-500/10 text-red-400'
																		}`}
																	>
																		{food.status}
																	</span>
																</td>

																<td className='px-4 py-3'>
																	<button
																		onClick={() => setPreviewImage(food)}
																		className='w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center'
																	>
																		<Eye size={15} />
																	</button>
																</td>

																<td className='px-4 py-3'>
																	<div className='flex items-center justify-end gap-1.5'>
																		<button
																			onClick={() => setEditFood(food)}
																			className='w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center'
																		>
																			<Pencil size={14} />
																		</button>

																		<button
																			onClick={() => handleDuplicateFood(food)}
																			className='w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center'
																		>
																			<Copy size={14} />
																		</button>

																		<button
																			onClick={() => setDeleteFood(food)}
																			className='w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center'
																		>
																			<Trash2 size={14} />
																		</button>
																	</div>
																</td>
															</tr>
														))
													)}
												</tbody>
											</table>
										</div>

										<div className='flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3.5 border-t border-white/5'>
											<p className='text-xs text-gray-500'>
												Jami {filteredFoods.length} ta taomdan {rangeStart}-
												{rangeEnd}
												tasi ko‘rsatilmoqda
											</p>

											<div className='flex items-center gap-1.5'>
												<button
													onClick={() =>
														setPage(value => Math.max(1, value - 1))
													}
													disabled={currentPage === 1}
													className='w-8 h-8 rounded-lg bg-white/5 disabled:opacity-30 flex items-center justify-center'
												>
													<ChevronRight size={15} className='rotate-180' />
												</button>

												<span className='w-8 h-8 rounded-lg bg-amber-500 text-black text-sm font-medium flex items-center justify-center'>
													{currentPage}
												</span>

												<button
													onClick={() =>
														setPage(value => Math.min(totalPages, value + 1))
													}
													disabled={currentPage === totalPages}
													className='w-8 h-8 rounded-lg bg-white/5 disabled:opacity-30 flex items-center justify-center'
												>
													<ChevronRight size={15} />
												</button>
											</div>

											<select
												value={pageSize}
												onChange={e => setPageSize(Number(e.target.value))}
												className='bg-[#0e0e10] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-300'
											>
												{[8, 12, 16, 24].map(size => (
													<option key={size} value={size}>
														{size} ta
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='h-full min-h-[60vh] flex flex-col items-center justify-center text-center gap-3'>
							<div className='w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center'>
								<Sparkles size={28} className='text-amber-400' />
							</div>

							<h2 className='text-xl font-semibold text-white'>
								{PAGE_TITLES[activePage]}
							</h2>

							<p className='text-sm text-gray-500 max-w-sm'>
								Ushbu bo‘lim tez orada ishga tushiriladi.
							</p>

							<button
								onClick={() => handleSidebarClick('bosh-sahifa')}
								className='mt-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold'
							>
								Bosh sahifaga qaytish
							</button>
						</div>
					)}
				</main>
			</div>

			{addModalOpen && (
				<FoodFormModal
					title='Yangi taom qo‘shish'
					categories={categories}
					onClose={() => setAddModalOpen(false)}
					onSubmit={handleAddFood}
				/>
			)}

			{editFood && (
				<FoodFormModal
					title='Taomni tahrirlash'
					categories={categories}
					initial={editFood}
					onClose={() => setEditFood(null)}
					onSubmit={data =>
						handleUpdateFood({
							...data,
							id: editFood.id,
						})
					}
				/>
			)}

			{deleteFood && (
				<Modal title='Taomni o‘chirish' onClose={() => setDeleteFood(null)}>
					<div className='flex flex-col items-center text-center gap-3'>
						<AlertTriangle size={28} className='text-red-400' />

						<p className='text-gray-200'>
							Haqiqatan ham{' '}
							<strong className='text-white'>"{deleteFood.name}"</strong> nomli
							taomni o‘chirmoqchimisiz?
						</p>

						<div className='flex gap-3 w-full mt-3'>
							<button
								onClick={() => setDeleteFood(null)}
								className='flex-1 px-4 py-2.5 rounded-lg bg-white/5 text-gray-200'
							>
								Bekor qilish
							</button>

							<button
								onClick={handleConfirmDelete}
								className='flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-semibold'
							>
								O‘chirish
							</button>
						</div>
					</div>
				</Modal>
			)}

			{importOpen && (
				<ImportModal
					onClose={() => setImportOpen(false)}
					onImport={() => {
						setImportOpen(false)
						showToast('Import muvaffaqiyatli yakunlandi')
					}}
				/>
			)}

			{addCategoryOpen && (
				<AddCategoryModal
					onClose={() => setAddCategoryOpen(false)}
					onSubmit={handleAddCategory}
				/>
			)}

			{manageCategoriesOpen && (
				<Modal
					title='Kategoriyalarni boshqarish'
					onClose={() => setManageCategoriesOpen(false)}
					maxWidth='max-w-lg'
				>
					<div className='space-y-2'>
						{categories.map(category => (
							<div
								key={category.id}
								className='flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5'
							>
								<div className='flex items-center gap-2.5'>
									<Thumb style={category.icon} size={30} />

									<div>
										<p className='text-sm font-medium text-gray-100'>
											{category.name}
										</p>

										<p className='text-xs text-gray-500'>
											{categoryCounts[category.name] || 0} ta taom
										</p>
									</div>
								</div>

								<button
									onClick={() => handleDeleteCategory(category)}
									className='w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center'
								>
									<Trash2 size={14} />
								</button>
							</div>
						))}
					</div>

					<button
						onClick={() => {
							setManageCategoriesOpen(false)
							setAddCategoryOpen(true)
						}}
						className='w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-semibold'
					>
						<Plus size={16} />
						Yangi kategoriya qo‘shish
					</button>
				</Modal>
			)}

			{previewImage && (
				<Modal title={previewImage.name} onClose={() => setPreviewImage(null)}>
					<div className='flex flex-col items-center gap-4'>
						<Thumb style={previewImage.image} size={160} />

						<div className='text-center'>
							<p className='text-white font-medium'>{previewImage.name}</p>

							<p className='text-sm text-gray-500'>{previewImage.category}</p>
						</div>
					</div>
				</Modal>
			)}

			{toast && <Toast message={toast} onClose={() => setToast(null)} />}
		</div>
	)
}