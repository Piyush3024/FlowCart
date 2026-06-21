import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/cart.types';

interface CartStore {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  clearCart: () => void;
  items: CartItem[];
  removeItem: (id: string) => void;
  totalItems: () => number;
  totalPrice: () => number;
  updateQty: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
        }
      },

      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: 'flowcart-cart', partialize: (state) => ({ items: state.items }) },
  ),
);
