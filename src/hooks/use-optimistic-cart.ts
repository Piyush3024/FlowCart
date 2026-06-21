'use client';

import { startTransition, useOptimistic } from 'react';
import { useCartStore } from '@/stores/cart.store';
import type { CartItem } from '@/types/cart.types';

export function useOptimisticCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (currentItems: CartItem[], newItem: Omit<CartItem, 'quantity'>) => {
      const existing = currentItems.find((i) => i.id === newItem.id);
      if (existing) {
        return currentItems.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    },
  );

  const [, removeOptimisticItem] = useOptimistic(
    optimisticItems,
    (currentItems: CartItem[], id: string) => currentItems.filter((i) => i.id !== id),
  );

  const [, updateOptimisticQty] = useOptimistic(
    optimisticItems,
    (currentItems: CartItem[], { id, quantity }: { id: string; quantity: number }) => {
      if (quantity <= 0) {
        return currentItems.filter((i) => i.id !== id);
      }
      return currentItems.map((i) => (i.id === id ? { ...i, quantity } : i));
    },
  );

  const handleAddItem = (item: Omit<CartItem, 'quantity'>) => {
    startTransition(() => {
      addOptimisticItem(item);
    });
    addItem(item);
  };

  const handleRemoveItem = (id: string) => {
    startTransition(() => {
      removeOptimisticItem(id);
    });
    removeItem(id);
  };

  const handleUpdateQty = (id: string, quantity: number) => {
    startTransition(() => {
      updateOptimisticQty({ id, quantity });
    });
    updateQty(id, quantity);
  };

  const totalItems = optimisticItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = optimisticItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return {
    items: optimisticItems,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQty: handleUpdateQty,
    clearCart: useCartStore((s) => s.clearCart),
    totalItems,
    totalPrice,
  };
}
