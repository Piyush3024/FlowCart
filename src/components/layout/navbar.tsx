'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/shared/icons';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { DASHBOARD_LINK, NAV_ITEMS } from '@/constants/navigation';
import { SITE } from '@/constants/site';
import { useHasHydrated } from '@/hooks/use-has-hydrated';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { useWishlistStore } from '@/stores/wishlist.store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setCartDrawerOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const reducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const hydrated = useHasHydrated();
  const totalItems = useCartStore((s) => (hydrated ? s.totalItems() : 0));
  const wishlistCount = useWishlistStore((s) => (hydrated ? s.ids.length : 0));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from(navRef.current, {
        autoAlpha: 0,
        y: -80,
        duration: DURATION.normal,
        ease: EASE_DEFAULT,
        delay: 0.2,
        clearProps: 'all',
      });
    },
    { scope: navRef, dependencies: [reducedMotion] },
  );

  useGSAP(
    () => {
      if (!mobileMenuOpen || reducedMotion) return;
      gsap.fromTo(
        mobileMenuRef.current,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: DURATION.fast, ease: EASE_DEFAULT },
      );
      gsap.from('.mobile-nav-item', {
        autoAlpha: 0,
        x: -20,
        stagger: 0.08,
        duration: DURATION.fast,
        ease: EASE_DEFAULT,
      });
    },
    { scope: navRef, dependencies: [mobileMenuOpen, reducedMotion] },
  );

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent',
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          {SITE.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="Dashboard">
            <Link href={DASHBOARD_LINK.href}>
              <Icons.analytics size={18} />
            </Link>
          </Button>
          <ThemeToggle />

          {/* Wishlist */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Link href="/#wishlist">
                <Icons.heart size={20} />
              </Link>
            </Button>
            {wishlistCount > 0 && (
              <span
                className="absolute top-1 right-1 w-3 h-3 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center pointer-events-none"
                aria-live="polite"
                aria-atomic="true"
              >
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartDrawerOpen(true)}
              aria-label={`Cart (${totalItems} items)`}
            >
              <Icons.shoppingBag size={20} />
            </Button>
            {totalItems > 0 && (
              <span
                className="absolute top-1 right-1 w-3 h-3 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center pointer-events-none"
                aria-live="polite"
                aria-atomic="true"
              >
                {totalItems}
              </span>
            )}
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden"
          >
            {mobileMenuOpen ? <Icons.close size={20} /> : <Icons.menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <ul className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="mobile-nav-item">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mobile-nav-item border-t border-border pt-4">
              <Link
                href={DASHBOARD_LINK.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-muted-foreground hover:text-foreground transition-colors"
              >
                {DASHBOARD_LINK.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
