export type TableStatus = "Bo'sh" | "Band";

export interface RestaurantTable {
  id: string; 
  number: string | number; 
  seats?: number;
  status: TableStatus;
  reservedAt?: string; 
  reservedDate?: string; 
  reservedBy?: string; 
  createdAt?: number;
}

export interface BillItem {
  id: string; 
  name: string;
  price: number;
  qty: number;
}

export type BillStatus = "ochiq" | "yopildi";

export interface Bill {
  id: string; 
  tableNumber: string | number;
  items: BillItem[];
  status: BillStatus;
  createdAt: number;
  updatedAt?: number;
  closedAt?: number;
  waiterFeePercent?: number; 
}

export function calculateBillTotals(items: BillItem[], waiterFeePercent: number) {
  const itemsTotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const waiterFee = Math.round((itemsTotal * (waiterFeePercent || 0)) / 100);
  const grandTotal = itemsTotal + waiterFee;
  return { itemsTotal, waiterFee, grandTotal };
}