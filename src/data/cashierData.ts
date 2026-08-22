export interface OrderInfo {
  id: string;
  total: string;
  time: string;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: string;
  hall: string;
  order: OrderInfo | null;
}

export const initialTables: Table[] = [
  { id: "01", number: 1, seats: 4, status: "free", hall: "Asosiy zal", order: null },
  { id: "02", number: 2, seats: 2, status: "free", hall: "Asosiy zal", order: null },
  { id: "03", number: 3, seats: 6, status: "busy", hall: "Asosiy zal", order: { id: "#1258", total: "285 000 so'm", time: "19:45" } },
  { id: "04", number: 4, seats: 4, status: "reserved", hall: "Asosiy zal", order: null },
  { id: "05", number: 5, seats: 4, status: "free", hall: "Asosiy zal", order: null },
  { id: "06", number: 6, seats: 8, status: "busy", hall: "Terrassa", order: { id: "#1256", total: "95 000 so'm", time: "19:05" } },
  { id: "07", number: 7, seats: 2, status: "free", hall: "Terrassa", order: null },
  { id: "08", number: 8, seats: 4, status: "cleaning", hall: "Terrassa", order: null },
  { id: "09", number: 9, seats: 4, status: "free", hall: "VIP zal", order: null },
  { id: "10", number: 10, seats: 10, status: "busy", hall: "VIP zal", order: { id: "#1257", total: "180 000 so'm", time: "19:20" } },
];

export const initialRecentOrders = [
  { id: "#1258", table: "Stol 03", time: "19:45", price: "285 000 so'm", status: "To'landi", items: "Qozon kabob, Norin, 2x Cola" },
  { id: "#1257", table: "Stol 10", time: "19:20", price: "180 000 so'm", status: "To'landi", items: "Mastava, Somsa, Ko'k choy" },
  { id: "#1256", table: "Stol 06", time: "19:05", price: "95 000 so'm", status: "To'landi", items: "Manti, Achchiq-chuchuk" },
  { id: "#1255", table: "Stol 15", time: "18:40", price: "120 000 so'm", status: "Jarayonda", items: "Shashlik assorti" },
  { id: "#1254", table: "Stol 02", time: "18:15", price: "150 000 so'm", status: "To'landi", items: "Uyg'urcha lag'mon" },
];

export const cashierMenuItems = [
  { id: 1, name: "Qozon kabob", price: "45 000 so'm", category: "Milliy taomlar", image: "🍖" },
  { id: 2, name: "Norin", price: "40 000 so'm", category: "Milliy taomlar", image: "🍜" },
  { id: 3, name: "Manti (4 dona)", price: "32 000 so'm", category: "Milliy taomlar", image: "🥟" },
  { id: 4, name: "Uyg'urcha lag'mon", price: "38 000 so'm", category: "Suyuq taomlar", image: "🍲" },
  { id: 5, name: "Kavkazcha shashlik", price: "18 000 so'm", category: "Fastfood & Grill", image: "🍢" },
  { id: 6, name: "Coca-Cola 1L", price: "12 000 so'm", category: "Ichimliklar", image: "🥤" },
];

export interface MenuItem {
  id: number | string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export const cashierCategories: string[] = [
  'Barchasi',
  'Milliy taomlar',
  'Fast-Fud',
  'Ichimliklar',
  'Salatlar',
  'Shirinliklar'
];