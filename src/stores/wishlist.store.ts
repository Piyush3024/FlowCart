import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  has: (id: string) => boolean;
  ids: string[];
  toggle: (id: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) => {
        const exists = get().ids.includes(id);
        set((state) => ({
          ids: exists ? state.ids.filter((i) => i !== id) : [...state.ids, id],
        }));
      },

      has: (id) => get().ids.includes(id),
    }),
    { name: 'flowcart-wishlist', partialize: (state) => ({ ids: state.ids }) },
  ),
);
