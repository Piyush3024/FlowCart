'use client';

import dynamic from 'next/dynamic';

const CartDrawer = dynamic(
  () => import('@/components/layout/cart-drawer').then((m) => m.CartDrawer),
  { ssr: false },
);

const QuickViewModal = dynamic(
  () => import('@/components/sections/quick-view/quick-view-modal').then((m) => m.QuickViewModal),
  { ssr: false },
);

export function ClientOverlays() {
  return (
    <>
      <CartDrawer />
      <QuickViewModal />
    </>
  );
}
