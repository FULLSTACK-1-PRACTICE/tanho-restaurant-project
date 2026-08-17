import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  calculateBillTotals,
  type Bill,
  type BillItem,
  type RestaurantTable,
} from "../types/restaurant";
import ReserveTableModal from "../components/ReserveTableModal/ReserveTableModal";

const ACTIVE_TABLE_KEY = "tanho_active_table";

export interface MenuItemForOrder {
  id: string;
  name: string;
  price: number;
}

interface RestaurantContextValue {
  // Stollar (real vaqtda, admin "Stollar" bo'limi bilan bir xil manba)
  tables: RestaurantTable[];
  tablesLoading: boolean;

  // Afitsiant (xizmat) haqi foizi — admin sozlamalardan o'zgartiradi
  waiterFeePercent: number;

  // Joriy mehmon qaysi stolda buyurtma qilyapti
  activeTableNumber: string | number | null;
  setActiveTableNumber: (num: string | number) => void;
  clearActiveTable: () => void;

  // Shu stol uchun ochiq "shot" (hisob)
  bill: Bill | null;
  billTotals: { itemsTotal: number; waiterFee: number; grandTotal: number };

  // Buyurtma berish oqimi: stol tanlangan bo'lmasa avval so'raydi
  orderPickerOpen: boolean;
  requestAddItem: (item: MenuItemForOrder) => void;
  confirmTableAndAdd: (tableNumber: string | number) => Promise<void>;
  closeOrderPicker: () => void;

  addItemToBill: (item: MenuItemForOrder) => Promise<void>;
  changeItemQty: (itemId: string, delta: number) => Promise<void>;

  // Stol band qilish (rezervatsiya) — saytning istalgan joyidagi tugma shu orqali ishlaydi
  openReserveModal: () => void;
}

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error("useRestaurant faqat RestaurantProvider ichida ishlatiladi");
  return ctx;
}

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [tablesLoading, setTablesLoading] = useState(true);
  const [waiterFeePercent, setWaiterFeePercent] = useState(10);

  const [activeTableNumber, setActiveTableNumberState] = useState<string | number | null>(
    () => localStorage.getItem(ACTIVE_TABLE_KEY) || null
  );
  const [bill, setBill] = useState<Bill | null>(null);

  const [orderPickerOpen, setOrderPickerOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<MenuItemForOrder | null>(null);

  const [reserveModalOpen, setReserveModalOpen] = useState(false);

  // Stollarni real vaqtda kuzatish (admin "Stollar" bo'limi bilan bir xil kolleksiya)
  useEffect(() => {
    const q = query(collection(db, "tables"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setTables(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as RestaurantTable[]);
        setTablesLoading(false);
      },
      () => {
        onSnapshot(collection(db, "tables"), (snap) => {
          setTables(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as RestaurantTable[]);
          setTablesLoading(false);
        });
      }
    );
    return () => unsub();
  }, []);

  // Afitsiant xizmat haqi foizini kuzatish (admin sozlamalardan o'zgartiradi)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "general"), (snap) => {
      const data = snap.data();
      if (data && typeof data.waiterFeePercent === "number") {
        setWaiterFeePercent(data.waiterFeePercent);
      }
    });
    return () => unsub();
  }, []);

  // Aktiv stol uchun ochiq hisobni (shot) kuzatish
  useEffect(() => {
    if (!activeTableNumber) {
      setBill(null);
      return;
    }
    const unsub = onSnapshot(doc(db, "bills", String(activeTableNumber)), (snap) => {
      if (snap.exists() && snap.data()?.status === "ochiq") {
        setBill({ id: snap.id, ...snap.data() } as Bill);
      } else {
        setBill(null);
      }
    });
    return () => unsub();
  }, [activeTableNumber]);

  const setActiveTableNumber = useCallback((num: string | number) => {
    localStorage.setItem(ACTIVE_TABLE_KEY, String(num));
    setActiveTableNumberState(num);
  }, []);

  const clearActiveTable = useCallback(() => {
    localStorage.removeItem(ACTIVE_TABLE_KEY);
    setActiveTableNumberState(null);
    setBill(null);
  }, []);

  // Stol hujjatini "Band" holatiga o'tkazadi (agar "Bo'sh" bo'lsa)
  const markTableOccupied = useCallback(
    async (tableNumber: string | number) => {
      const tableDoc = tables.find((t) => String(t.number) === String(tableNumber));
      if (tableDoc && tableDoc.status !== "Band") {
        await updateDoc(doc(db, "tables", tableDoc.id), { status: "Band" });
      }
    },
    [tables]
  );

  const writeBillItems = useCallback(
    async (tableNumber: string | number, items: BillItem[]) => {
      await setDoc(
        doc(db, "bills", String(tableNumber)),
        {
          tableNumber,
          items,
          status: "ochiq",
          updatedAt: Date.now(),
          createdAt: bill?.createdAt ?? Date.now(),
        },
        { merge: true }
      );
    },
    [bill?.createdAt]
  );

  const addItemToBill = useCallback(
    async (item: MenuItemForOrder) => {
      if (!activeTableNumber) return;

      // Eng so'nggi holatni Firestore'dan o'qiymiz (bir nechta bosishlarda ketma-ketlikni saqlash uchun)
      const snap = await getDoc(doc(db, "bills", String(activeTableNumber)));
      const currentItems: BillItem[] =
        snap.exists() && snap.data()?.status === "ochiq" ? (snap.data()?.items as BillItem[]) || [] : [];

      const idx = currentItems.findIndex((it) => it.id === item.id);
      const nextItems =
        idx >= 0
          ? currentItems.map((it, i) => (i === idx ? { ...it, qty: it.qty + 1 } : it))
          : [...currentItems, { id: item.id, name: item.name, price: item.price, qty: 1 }];

      await writeBillItems(activeTableNumber, nextItems);
      await markTableOccupied(activeTableNumber);
    },
    [activeTableNumber, writeBillItems, markTableOccupied]
  );

  const changeItemQty = useCallback(
    async (itemId: string, delta: number) => {
      if (!activeTableNumber || !bill) return;
      const nextItems = bill.items
        .map((it) => (it.id === itemId ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0);
      await writeBillItems(activeTableNumber, nextItems);
    },
    [activeTableNumber, bill, writeBillItems]
  );

  const requestAddItem = useCallback(
    (item: MenuItemForOrder) => {
      if (activeTableNumber) {
        void addItemToBill(item);
      } else {
        setPendingItem(item);
        setOrderPickerOpen(true);
      }
    },
    [activeTableNumber, addItemToBill]
  );

  const confirmTableAndAdd = useCallback(
    async (tableNumber: string | number) => {
      setActiveTableNumber(tableNumber);
      setOrderPickerOpen(false);
      if (pendingItem) {
        // activeTableNumber state yangilanishini kutmasdan, to'g'ridan-to'g'ri shu stol uchun yozamiz
        const snap = await getDoc(doc(db, "bills", String(tableNumber)));
        const currentItems: BillItem[] =
          snap.exists() && snap.data()?.status === "ochiq" ? (snap.data()?.items as BillItem[]) || [] : [];
        const idx = currentItems.findIndex((it) => it.id === pendingItem.id);
        const nextItems =
          idx >= 0
            ? currentItems.map((it, i) => (i === idx ? { ...it, qty: it.qty + 1 } : it))
            : [...currentItems, { id: pendingItem.id, name: pendingItem.name, price: pendingItem.price, qty: 1 }];
        await setDoc(
          doc(db, "bills", String(tableNumber)),
          { tableNumber, items: nextItems, status: "ochiq", updatedAt: Date.now(), createdAt: Date.now() },
          { merge: true }
        );
        await markTableOccupied(tableNumber);
        setPendingItem(null);
      }
    },
    [pendingItem, setActiveTableNumber, markTableOccupied]
  );

  const closeOrderPicker = useCallback(() => {
    setOrderPickerOpen(false);
    setPendingItem(null);
  }, []);

  const billTotals = useMemo(
    () => calculateBillTotals(bill?.items ?? [], waiterFeePercent),
    [bill, waiterFeePercent]
  );

  const openReserveModal = useCallback(() => setReserveModalOpen(true), []);

  const value: RestaurantContextValue = {
    tables,
    tablesLoading,
    waiterFeePercent,
    activeTableNumber,
    setActiveTableNumber,
    clearActiveTable,
    bill,
    billTotals,
    orderPickerOpen,
    requestAddItem,
    confirmTableAndAdd,
    closeOrderPicker,
    addItemToBill,
    changeItemQty,
    openReserveModal,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
      <ReserveTableModal open={reserveModalOpen} onClose={() => setReserveModalOpen(false)} />
    </RestaurantContext.Provider>
  );
}