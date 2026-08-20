import {
	BarChart3,
	CalendarCheck,
	ChefHat,
	ClipboardList,
	FileText,
	Home,
	Newspaper,
	PlusCircle,
	Table2,
	Tags,
	UserSquare2,
	Users,
	UtensilsCrossed,
} from 'lucide-react'

export const SIDEBAR_SECTIONS = [
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