'use client';

import { startTransition, useOptimistic } from 'react';
import { useWishlistStore } from '@/stores/wishlist.store';

export function useOptimisticWishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);

  const [optimisticIds, addOptimisticId] = useOptimistic(
    ids,
    (currentIds: string[], id: string) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((i) => i !== id);
      }
      return [...currentIds, id];
    },
  );

  const handleToggle = (id: string) => {
    startTransition(() => {
      addOptimisticId(id);
    });
    toggle(id);
  };

  const has = (id: string) => optimisticIds.includes(id);

  return {
    ids: optimisticIds,
    toggle: handleToggle,
    has,
  };
}
