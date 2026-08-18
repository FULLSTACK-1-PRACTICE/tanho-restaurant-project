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
  calculateBillTotals,
  type Bill,
  type BillItem,
  type RestaurantTable,
} from "../types/restaurant";
import { localDb } from "../lib/localDb";

const ACTIVE_TABLE_KEY = "tanho_active_table";

export interface MenuItemForOrder {
  id: string;
  name: string;
  price: number;
}

interface RestaurantContextValue {
  tables: RestaurantTable[];
  tablesLoading: boolean;

  waiterFeePercent: number;

  activeTableNumber: string | number | null;
  setActiveTableNumber: (num: string | number) => void;
  clearActiveTable: () => void;

  bill: Bill | null;
  billTotals: {
    itemsTotal: number;
    waiterFee: number;
    grandTotal: number;
  };

  orderPickerOpen: boolean;
  requestAddItem: (item: MenuItemForOrder) => void;
  confirmTableAndAdd: (tableNumber: string | number) => Promise<void>;
  closeOrderPicker: () => void;

  addItemToBill: (item: MenuItemForOrder) => Promise<void>;
  changeItemQty: (itemId: string, delta: number) => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);

  if (!ctx) {
    throw new Error(
      "useRestaurant faqat RestaurantProvider ichida ishlatiladi"
    );
  }

  return ctx;
}

export function RestaurantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [tablesLoading, setTablesLoading] = useState(true);
  const [waiterFeePercent, setWaiterFeePercent] = useState(10);

  const [activeTableNumber, setActiveTableNumberState] = useState<
    string | number | null
  >(() => localStorage.getItem(ACTIVE_TABLE_KEY) || null);

  const [bill, setBill] = useState<Bill | null>(null);

  const [orderPickerOpen, setOrderPickerOpen] = useState(false);
  const [pendingItem, setPendingItem] =
    useState<MenuItemForOrder | null>(null);

  useEffect(() => {
    const loadTables = () => {
      const data = localDb.readCollection<RestaurantTable>("tables");

      setTables(data);
      setTablesLoading(false);
    };

    loadTables();

    return localDb.subscribe("tables", loadTables);
  }, []);

  useEffect(() => {
    const loadSettings = () => {
      const settings = localDb.readDoc<{
        waiterFeePercent?: number;
      }>("settings/general");

      if (
        settings &&
        typeof settings.waiterFeePercent === "number"
      ) {
        setWaiterFeePercent(settings.waiterFeePercent);
      }
    };

    loadSettings();

    return localDb.subscribe("settings/general", loadSettings);
  }, []);

  useEffect(() => {
    if (!activeTableNumber) {
      setBill(null);
      return;
    }

    const billKey = `bills/${String(activeTableNumber)}`;

    const loadBill = () => {
      const data = localDb.readDoc<Bill>(billKey);

      if (data && data.status === "ochiq") {
        setBill(data);
      } else {
        setBill(null);
      }
    };

    loadBill();

    return localDb.subscribe(billKey, loadBill);
  }, [activeTableNumber]);

  const setActiveTableNumber = useCallback(
    (num: string | number) => {
      localStorage.setItem(ACTIVE_TABLE_KEY, String(num));
      setActiveTableNumberState(num);
    },
    []
  );

  const clearActiveTable = useCallback(() => {
    localStorage.removeItem(ACTIVE_TABLE_KEY);
    setActiveTableNumberState(null);
    setBill(null);
  }, []);

  const markTableOccupied = useCallback(
    async (tableNumber: string | number) => {
      const tableDoc = tables.find(
        (table) =>
          String(table.number) === String(tableNumber)
      );

      if (!tableDoc || tableDoc.status === "Band") {
        return;
      }

      const updatedTable: RestaurantTable = {
        ...tableDoc,
        status: "Band",
      };

      const nextTables = tables.map((table) =>
        table.id === tableDoc.id ? updatedTable : table
      );

      localDb.writeCollection("tables", nextTables);
    },
    [tables]
  );

  const writeBillItems = useCallback(
    async (
      tableNumber: string | number,
      items: BillItem[]
    ) => {
      const path = `bills/${String(tableNumber)}`;

      const previousBill =
        localDb.readDoc<Bill>(path);

      const nextBill: Bill = {
        id: previousBill?.id ?? String(tableNumber),
        tableNumber,
        items,
        status: "ochiq",
        updatedAt: Date.now(),
        createdAt:
          previousBill?.createdAt ?? Date.now(),
      };

      localDb.writeDoc(path, nextBill);
    },
    []
  );

  const addItemToBill = useCallback(
    async (item: MenuItemForOrder) => {
      if (!activeTableNumber) {
        return;
      }

      const path = `bills/${String(activeTableNumber)}`;

      const currentBill =
        localDb.readDoc<Bill>(path);

      const currentItems: BillItem[] =
        currentBill?.status === "ochiq"
          ? currentBill.items ?? []
          : [];

      const idx = currentItems.findIndex(
        (currentItem) => currentItem.id === item.id
      );

      const nextItems =
        idx >= 0
          ? currentItems.map((currentItem, index) =>
              index === idx
                ? {
                    ...currentItem,
                    qty: currentItem.qty + 1,
                  }
                : currentItem
            )
          : [
              ...currentItems,
              {
                id: item.id,
                name: item.name,
                price: item.price,
                qty: 1,
              },
            ];

      await writeBillItems(
        activeTableNumber,
        nextItems
      );

      await markTableOccupied(activeTableNumber);
    },
    [
      activeTableNumber,
      writeBillItems,
      markTableOccupied,
    ]
  );

  const changeItemQty = useCallback(
    async (itemId: string, delta: number) => {
      if (!activeTableNumber || !bill) {
        return;
      }

      const nextItems = bill.items
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                qty: item.qty + delta,
              }
            : item
        )
        .filter((item) => item.qty > 0);

      await writeBillItems(
        activeTableNumber,
        nextItems
      );
    },
    [
      activeTableNumber,
      bill,
      writeBillItems,
    ]
  );

  const requestAddItem = useCallback(
    (item: MenuItemForOrder) => {
      if (activeTableNumber) {
        void addItemToBill(item);
        return;
      }

      setPendingItem(item);
      setOrderPickerOpen(true);
    },
    [activeTableNumber, addItemToBill]
  );

  const confirmTableAndAdd = useCallback(
    async (tableNumber: string | number) => {
      setActiveTableNumber(tableNumber);
      setOrderPickerOpen(false);

      if (!pendingItem) {
        return;
      }

      const path = `bills/${String(tableNumber)}`;

      const currentBill =
        localDb.readDoc<Bill>(path);

      const currentItems: BillItem[] =
        currentBill?.status === "ochiq"
          ? currentBill.items ?? []
          : [];

      const idx = currentItems.findIndex(
        (item) => item.id === pendingItem.id
      );

      const nextItems =
        idx >= 0
          ? currentItems.map((item, index) =>
              index === idx
                ? {
                    ...item,
                    qty: item.qty + 1,
                  }
                : item
            )
          : [
              ...currentItems,
              {
                id: pendingItem.id,
                name: pendingItem.name,
                price: pendingItem.price,
                qty: 1,
              },
            ];

      const nextBill: Bill = {
        id: currentBill?.id ?? String(tableNumber),
        tableNumber,
        items: nextItems,
        status: "ochiq",
        updatedAt: Date.now(),
        createdAt:
          currentBill?.createdAt ?? Date.now(),
      };

      localDb.writeDoc(path, nextBill);

      await markTableOccupied(tableNumber);

      setPendingItem(null);
    },
    [
      pendingItem,
      setActiveTableNumber,
      markTableOccupied,
    ]
  );

  const closeOrderPicker = useCallback(() => {
    setOrderPickerOpen(false);
    setPendingItem(null);
  }, []);

  const billTotals = useMemo(
    () =>
      calculateBillTotals(
        bill?.items ?? [],
        waiterFeePercent
      ),
    [bill, waiterFeePercent]
  );

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
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}