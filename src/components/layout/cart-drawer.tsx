'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Icons } from '@/components/shared/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { Separator } from '@/components/ui/separator';
import { useOptimisticCart } from '@/hooks/use-optimistic-cart';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap } from '@/lib/gsap';
import { formatPrice } from '@/lib/utils';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '../ui/button';

export function CartDrawer() {
  const cartDrawerOpen = useUIStore((s) => s.cartDrawerOpen);
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);
  const { items, removeItem, updateQty, totalPrice, totalItems } = useOptimisticCart();
  const reducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!(drawerRef.current && overlayRef.current)) {
      return;
    }

    if (cartDrawerOpen) {
      document.body.style.overflow = 'hidden';

      if (!reducedMotion) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: DURATION.fast, ease: 'none' },
        );
        gsap.fromTo(
          drawerRef.current,
          { x: '100%' },
          { x: '0%', duration: DURATION.normal, ease: EASE_DEFAULT },
        );
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [cartDrawerOpen, reducedMotion]);

  const handleClose = useCallback(() => {
    if (!(drawerRef.current && overlayRef.current) || reducedMotion) {
      setCartDrawerOpen(false);
      return;
    }
    gsap.to(overlayRef.current, { opacity: 0, duration: DURATION.fast });
    gsap.to(drawerRef.current, {
      x: '100%',
      duration: DURATION.fast,
      ease: 'power2.in',
      onComplete: () => setCartDrawerOpen(false),
    });
  }, [reducedMotion, setCartDrawerOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && cartDrawerOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cartDrawerOpen, handleClose]);

  // Focus trap
  useEffect(() => {
    if (!(cartDrawerOpen && drawerRef.current)) {
      return;
    }

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableEls = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    if (focusableEls.length === 0) {
      return;
    }

    const firstEl = focusableEls[0];
    const lastEl = focusableEls.at(-1);

    if (!(firstEl && lastEl)) {
      return;
    }

    firstEl.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [cartDrawerOpen]);

  if (!cartDrawerOpen) {
    return null;
  }

  return (
    <div aria-label="Shopping cart" aria-modal="true" className="fixed inset-0 z-50" role="dialog">
      {/* Overlay */}
      <Button
        aria-label="Close cart"
        className="absolute inset-0 h-full w-full cursor-default rounded-none border-none bg-black/60 p-0 backdrop-blur-sm hover:bg-black/60 focus-visible:ring-0 active:translate-y-0"
        onClick={handleClose}
        ref={overlayRef}
        variant="ghost"
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-border border-l bg-card"
        ref={drawerRef}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-border border-b px-6 py-5">
          <h2 className="font-semibold font-serif text-card-foreground text-xl">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 font-normal font-sans text-muted-foreground text-sm">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <Button
            aria-label="Close cart"
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            onClick={handleClose}
            size="icon"
            variant="ghost"
          >
            <Icons.close size={20} />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Icons.inbox className="text-muted-foreground" size={28} />
              </div>
              <div>
                <p className="font-serif text-foreground text-lg">Your cart is empty</p>
                <p className="mt-1 text-muted-foreground text-sm">
                  Add something beautiful to get started.
                </p>
              </div>
              <Button
                className="mt-2 text-foreground underline underline-offset-4"
                onClick={handleClose}
                variant="ghost"
              >
                Continue shopping
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li className="flex gap-4" key={item.id}>
                  {/* Image */}
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <ImageWithFallback
                      alt={item.name}
                      className="object-cover"
                      fill
                      sizes="80px"
                      src={item.image}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-medium font-serif text-card-foreground text-sm leading-snug">
                        {item.name}
                      </p>
                      {item.size && (
                        <p className="mt-0.5 text-muted-foreground text-xs">Size: {item.size}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 rounded-md border border-border">
                        <Button
                          aria-label="Decrease quantity"
                          className="h-7 w-7"
                          disabled={item.quantity === 1}
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          size="icon"
                          variant="ghost"
                        >
                          <Icons.minus size={14} />
                        </Button>
                        <span className="w-6 text-center text-foreground text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          aria-label="Increase quantity"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          size="icon"
                          variant="ghost"
                        >
                          <Icons.plus size={14} />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground text-sm tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          aria-label={`Remove ${item.name}`}
                          className="h-7 w-7 hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                          size="icon"
                          variant="ghost"
                        >
                          <Icons.trash size={15} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex flex-col gap-4 border-border border-t px-6 py-5">
            <div className="flex items-center justify-between">
              <Separator />
              <span className="text-muted-foreground text-sm">Subtotal</span>
              <span className="font-semibold font-serif text-foreground text-lg tabular-nums">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="-mt-2 text-muted-foreground text-xs">
              Shipping and taxes calculated at checkout.
            </p>
            <Button className="h-12 w-full tracking-wider" size="lg">
              Checkout
            </Button>
            <Button
              className="w-full text-muted-foreground underline underline-offset-4"
              onClick={handleClose}
              variant="ghost"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
