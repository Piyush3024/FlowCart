import { create } from 'zustand';
import type { Product } from '@/types/product.types';

interface QuickViewStore {
  close: () => void;
  open: (product: Product) => void;
  product: Product | null;
}

export const useQuickViewStore = create<QuickViewStore>()((set) => ({
  product: null,
  open: (product) => set({ product }),
  close: () => set({ product: null }),
}));
