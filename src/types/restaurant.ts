// Yangi funksionallik uchun umumiy tiplar:
// - Stollar (tables)
// - Shot / hisob (bills) — bitta stol uchun ochiq buyurtmalar ro'yxati
// Bu fayl "buyurtma berish -> stol tanlash -> shot ochish -> hisoblash"
// va "stol band qilish (rezervatsiya)" oqimlari uchun umumiy manba hisoblanadi.

export type TableStatus = "Bo'sh" | "Band";

export interface RestaurantTable {
  id: string; // Firestore hujjat id (tables kolleksiyasidagi doc id)
  number: string | number; // Stol raqami (masalan: 1, 2, "VIP-1")
  seats?: number;
  status: TableStatus;
  reservedAt?: string; // Band qilingan vaqt (masalan "19:30")
  reservedDate?: string; // Band qilingan sana (ixtiyoriy)
  reservedBy?: string; // Mijoz ismi / telefon
  createdAt?: number;
}

export interface BillItem {
  id: string; // menu taomining id'si
  name: string;
  price: number;
  qty: number;
}

export type BillStatus = "ochiq" | "yopildi";

export interface Bill {
  id: string; // odatda stol raqamiga teng (bills kolleksiyasidagi doc id)
  tableNumber: string | number;
  items: BillItem[];
  status: BillStatus;
  createdAt: number;
  updatedAt?: number;
  closedAt?: number;
  waiterFeePercent?: number; // hisob yopilganda saqlab qo'yiladigan % (tarix uchun)
}

// Hisob (items) narxlarini, xizmat haqi (afitsiant) foizini va umumiy summani hisoblaydi.
export function calculateBillTotals(items: BillItem[], waiterFeePercent: number) {
  const itemsTotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const waiterFee = Math.round((itemsTotal * (waiterFeePercent || 0)) / 100);
  const grandTotal = itemsTotal + waiterFee;
  return { itemsTotal, waiterFee, grandTotal };
}