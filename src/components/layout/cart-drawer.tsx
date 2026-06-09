'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Icons } from '@/components/shared/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { Separator } from '@/components/ui/separator';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap } from '@/lib/gsap';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '../ui/button';

export function CartDrawer() {
  const cartDrawerOpen = useUIStore((s) => s.cartDrawerOpen);
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);
  const reducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

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
    if (!drawerRef.current || !overlayRef.current || reducedMotion) {
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
      if (e.key === 'Escape' && cartDrawerOpen) handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cartDrawerOpen, handleClose]);

  // Focus trap
  useEffect(() => {
    if (!cartDrawerOpen || !drawerRef.current) return;

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

    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [cartDrawerOpen]);

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Overlay */}
      <Button
        variant="ghost"
        ref={overlayRef}
        onClick={handleClose}
        aria-label="Close cart"
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm cursor-default hover:bg-black/60 active:translate-y-0 rounded-none border-none p-0 focus-visible:ring-0"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-card border-l border-border flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl font-semibold text-card-foreground">
            Cart
            {totalItems() > 0 && (
              <span className="ml-2 text-sm font-sans font-normal text-muted-foreground">
                ({totalItems()} {totalItems() === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            aria-label="Close cart"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.close size={20} />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Icons.inbox size={28} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-serif text-lg text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add something beautiful to get started.
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="mt-2 underline underline-offset-4 text-foreground"
              >
                Continue shopping
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-24 rounded-md overflow-hidden bg-muted shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-serif text-sm font-medium text-card-foreground leading-snug">
                        {item.name}
                      </p>
                      {item.size && (
                        <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7"
                        >
                          <Icons.chevronDown size={14} />
                        </Button>
                        <span className="text-sm w-6 text-center text-foreground tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7"
                        >
                          <Icons.chevronUp size={14} />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="w-7 h-7 hover:text-destructive"
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
          <div className="px-6 py-5 border-t border-border flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Separator />
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-serif text-lg font-semibold text-foreground tabular-nums">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">
              Shipping and taxes calculated at checkout.
            </p>
            <Button className="w-full h-12 tracking-wider" size="lg">
              Checkout
            </Button>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="w-full underline underline-offset-4 text-muted-foreground"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
