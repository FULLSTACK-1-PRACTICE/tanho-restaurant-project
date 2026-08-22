import { useState } from 'react';
import { cashierMenuItems } from '@/data/cashierData';

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export const useNewOrder = () => {
  const [selectedTable, setSelectedTable] = useState<string>('1');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredItems = cashierMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Barchasi' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: typeof cashierMenuItems[0]) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: numericPrice, quantity: 1, category: item.category }];
    });
  };

  const updateQuantity = (id: number | string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: number | string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) {
      triggerToast("Savat bo'sh! Buyurtma berish uchun taom qo'shing.");
      return;
    }

    const paddedTable = String(selectedTable).replace(/[^\d]/g, '').padStart(2, '0') || selectedTable;
    triggerToast(`Stol #${paddedTable} uchun buyurtma muvaffaqiyatli rasmiylashtirildi! Jami: ${totalAmount.toLocaleString()} so'm`);
    setCart([]);
  };

  return {
    selectedTable,
    setSelectedTable,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cart,
    filteredItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalAmount,
    handleCompleteOrder,
    toastMessage
  };
};