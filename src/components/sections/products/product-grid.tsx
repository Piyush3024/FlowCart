'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useFeaturedProducts } from '@/services/product.service';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';

const SKELETON_IDS = Array.from({ length: 8 }).map((_, i) => `skeleton-${i}`);

export function ProductGrid() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { data: products, isPending, isError, refetch } = useFeaturedProducts();

  useEffect(() => {
    if (!isPending) {
      const id = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(id);
    }
  }, [isPending]);

  useGSAP(
    () => {
      if (reducedMotion || isPending || !products?.length) {
        return;
      }

      gsap.from('.product-card-item', {
        autoAlpha: 0,
        y: 50,
        duration: DURATION.normal,
        stagger: 0.1,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion, isPending, products] },
  );

  return (
    <section
      aria-label="Featured products"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      id="products"
      ref={sectionRef}
    >
      {/* Header */}
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Curated Selection
            </span>
          </div>
          <h2
            className={cn(
              'font-bold font-serif text-foreground leading-tight',
              'text-[clamp(2rem,4vw,3.5rem)]',
            )}
          >
            Featured Products
          </h2>
        </div>
        <Link
          className="shrink-0 text-muted-foreground text-sm underline underline-offset-4 transition-colors hover:text-foreground"
          href="/#products"
        >
          View all products
        </Link>
      </div>

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-muted-foreground text-sm">
            Failed to load products. Please try again.
          </p>
          <Button onClick={() => refetch()} size="sm" variant="outline">
            Retry
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!(isPending || isError) && (!products || products.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">🛍️</span>
          </div>
          <h3 className="font-semibold font-serif text-lg">No Products Yet</h3>
          <p className="max-w-sm text-muted-foreground text-sm">
            Our collection is being curated. Check back soon.
          </p>
        </div>
      )}

      {/* Grid */}
      {!isError && (
        <ul
          aria-busy={isPending}
          aria-label="Product list"
          className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
        >
          {isPending
            ? SKELETON_IDS.map((id) => (
                <li key={id}>
                  <ProductCardSkeleton />
                </li>
              ))
            : products?.map((product, i) => (
                <li className="product-card-item" key={product.id}>
                  <ProductCard priority={i < 2} product={product} />
                </li>
              ))}
        </ul>
      )}
    </section>
  );
}
