'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  {
    id: 'apparel',
    label: 'Apparel',
    description: 'Refined essentials',
    image: 'https://picsum.photos/seed/cat-apparel/600/800',
    href: '/#products',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    description: 'Finish the look',
    image: 'https://picsum.photos/seed/cat-accessories/600/400',
    href: '/#products',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'footwear',
    label: 'Footwear',
    description: 'Step with intent',
    image: 'https://picsum.photos/seed/cat-footwear/600/400',
    href: '/#products',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    description: 'Everyday objects',
    image: 'https://picsum.photos/seed/cat-lifestyle/1200/400',
    href: '/#products',
    span: 'col-span-2 row-span-1',
  },
] as const;

export function CategoriesSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from('.category-header', {
        autoAlpha: 0,
        y: 30,
        duration: DURATION.normal,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.category-tile', {
        autoAlpha: 0,
        scale: 0.97,
        duration: DURATION.normal,
        stagger: 0.1,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: '.category-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Shop by category"
    >
      {/* Header */}
      <div className="category-header flex flex-col gap-3 mb-12">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-primary" aria-hidden="true" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Collections
          </span>
        </div>
        <h2
          className={cn(
            'font-serif font-bold text-foreground leading-tight',
            'text-[clamp(2rem,4vw,3.5rem)]',
          )}
        >
          Shop by Category
        </h2>
      </div>

      {/* Bento grid */}
      <ul
        className="category-grid grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[600px] sm:h-[700px]"
        aria-label="Product categories"
      >
        {CATEGORIES.map((cat) => (
          <li key={cat.id} className={cn(cat.span, 'h-full')}>
            <Link
              href={cat.href}
              aria-label={`Shop ${cat.label}`}
              className={cn(
                'category-tile group relative block w-full h-full overflow-hidden rounded-2xl bg-muted',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              )}
            >
              {/* Image */}
              <ImageWithFallback
                src={cat.image}
                alt={cat.label}
                fill
                className={cn(
                  'object-cover transition-transform duration-700 ease-out',
                  'group-hover:scale-105',
                )}
                sizes="(max-width: 640px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                aria-hidden="true"
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="font-serif text-white text-lg sm:text-xl font-semibold leading-tight">
                  {cat.label}
                </p>
                <p className="text-white/70 text-xs mt-0.5 tracking-wide">{cat.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
