'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/shared/icons';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { NAV_ITEMS } from '@/constants/navigation';
import { SITE } from '@/constants/site';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { useWishlistStore } from '@/stores/wishlist.store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setCartDrawerOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const totalItems = useCartStore((s) => s.totalItems);
  const wishlistIds = useWishlistStore((s) => s.ids);
  const reducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!navRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: DURATION.normal,
        ease: EASE_DEFAULT,
        delay: 0.2,
        clearProps: 'all',
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!mobileMenuRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      if (mobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: DURATION.fast, ease: EASE_DEFAULT },
        );
        gsap.from('.mobile-nav-item', {
          opacity: 0,
          x: -20,
          stagger: 0.08,
          duration: DURATION.fast,
          ease: EASE_DEFAULT,
        });
      }
    });
    return () => ctx.revert();
  }, [mobileMenuOpen, reducedMotion]);

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
          <ThemeToggle />

          {/* Wishlist */}
          <Link
            href="/#wishlist"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.heart size={20} />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            aria-label={`Cart (${totalItems()} items)`}
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.shoppingBag size={20} />
            {totalItems() > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <Icons.close size={20} /> : <Icons.menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
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
          </ul>
        </div>
      )}
    </header>
  );
}
