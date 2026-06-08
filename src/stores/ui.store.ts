import { create } from 'zustand';

interface UIStore {
  cartDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  cartDrawerOpen: false,
  mobileMenuOpen: false,
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
