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
  const totalItems = useCartStore((s) => (hydrated ? s.items.length : 0));
  const wishlistCount = useWishlistStore((s) => (hydrated ? s.ids.length : 0));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }
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
      if (!mobileMenuOpen || reducedMotion) {
        return;
      }
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
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled ? 'border-border border-b bg-background/90 backdrop-blur-md' : 'bg-transparent',
      )}
      ref={navRef}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          className="font-bold font-serif text-foreground text-xl tracking-tight transition-opacity hover:opacity-70"
          href="/"
        >
          {SITE.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                className="text-muted-foreground text-sm tracking-wide transition-colors duration-200 hover:text-foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            aria-label="Dashboard"
            asChild
            className="md:hidden"
            size="default"
            variant="outline"
          >
            <Link href={DASHBOARD_LINK.href}>
              <Icons.analytics size={18} />
            </Link>
          </Button>

          <Button
            aria-label="Dashboard"
            asChild
            className="hidden py-5 md:inline-flex"
            size="default"
            variant="default"
          >
            <Link href={DASHBOARD_LINK.href}>
              <Icons.analytics size={18} />
              Dashboard
            </Link>
          </Button>
          <ThemeToggle />

          {/* Wishlist */}
          <div className="relative">
            <Button
              aria-label={`Wishlist (${wishlistCount} items)`}
              asChild
              size="icon"
              variant="ghost"
            >
              <Link href="/#wishlist">
                <Icons.heart size={20} />
              </Link>
            </Button>
            {wishlistCount > 0 && (
              <span
                aria-atomic="true"
                aria-live="polite"
                className="pointer-events-none absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary font-bold text-[9px] text-primary-foreground"
              >
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Button
              aria-label={`Cart (${totalItems} items)`}
              onClick={() => setCartDrawerOpen(true)}
              size="icon"
              variant="ghost"
            >
              <Icons.shoppingBag size={20} />
            </Button>
            {totalItems > 0 && (
              <span
                aria-atomic="true"
                aria-live="polite"
                className="pointer-events-none absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary font-bold text-[9px] text-primary-foreground"
              >
                {totalItems}
              </span>
            )}
          </div>

          {/* Mobile menu toggle */}
          <Button
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            size="icon"
            variant="ghost"
          >
            {mobileMenuOpen ? <Icons.close size={20} /> : <Icons.menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="border-border border-b bg-background/95 backdrop-blur-md md:hidden"
          id="mobile-menu"
          ref={mobileMenuRef}
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6">
            {NAV_ITEMS.map((item) => (
              <li className="mobile-nav-item" key={item.href}>
                <Link
                  className="font-serif text-foreground text-lg transition-colors hover:text-muted-foreground"
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mobile-nav-item border-border border-t pt-4">
              <Link
                className="font-serif text-lg text-muted-foreground transition-colors hover:text-foreground"
                href={DASHBOARD_LINK.href}
                onClick={() => setMobileMenuOpen(false)}
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
