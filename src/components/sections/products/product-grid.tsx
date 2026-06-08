'use client';

import { Link } from 'lucide-react';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useFeaturedProducts } from '@/services/product.service';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';

const SKELETON_IDS = Array.from({ length: 8 }).map((_, i) => `skeleton-${i}`);

export function ProductGrid() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { data: products, isLoading, isError } = useFeaturedProducts();

  // Scroll-triggered reveal
  useGSAP(
    () => {
      if (reducedMotion || isLoading || !products?.length) return;

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
    { scope: sectionRef, dependencies: [reducedMotion, isLoading, products] },
  );

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Featured products"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Curated Selection
            </span>
          </div>
          <h2
            className={cn(
              'font-serif font-bold text-foreground leading-tight',
              'text-[clamp(2rem,4vw,3.5rem)]',
            )}
          >
            Featured Products
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 shrink-0"
        >
          View all products
        </Link>
      </div>

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="font-serif text-lg text-foreground">Something went wrong</p>
          <p className="text-sm text-muted-foreground">
            Could not load products. Please try again.
          </p>
        </div>
      )}

      {/* Grid */}
      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"
        aria-label="Product list"
      >
        {isLoading
          ? SKELETON_IDS.map((id) => (
              <li key={id}>
                <ProductCardSkeleton />
              </li>
            ))
          : products?.map((product, i) => (
              <li key={product.id} className="product-card-item">
                <ProductCard product={product} priority={i < 2} />
              </li>
            ))}
      </ul>
    </section>
  );
}
