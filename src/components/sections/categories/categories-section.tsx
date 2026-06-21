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
      if (reducedMotion) {
        return;
      }

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
      aria-label="Shop by category"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      id="categories"
      ref={sectionRef}
    >
      {/* Header */}
      <div className="category-header mb-12 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Collections
          </span>
        </div>
        <h2
          className={cn(
            'font-bold font-serif text-foreground leading-tight',
            'text-[clamp(2rem,4vw,3.5rem)]',
          )}
        >
          Shop by Category
        </h2>
      </div>

      {/* Bento grid */}
      <ul
        aria-label="Product categories"
        className="category-grid grid h-[600px] grid-cols-2 grid-rows-3 gap-3 sm:h-[700px] sm:gap-4"
      >
        {CATEGORIES.map((cat) => (
          <li className={cn(cat.span, 'h-full')} key={cat.id}>
            <Link
              aria-label={`Shop ${cat.label}`}
              className={cn(
                'category-tile group relative block h-full w-full overflow-hidden rounded-2xl bg-muted',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              )}
              href={cat.href}
            >
              {/* Image */}
              <ImageWithFallback
                alt={cat.label}
                className={cn(
                  'object-cover transition-transform duration-700 ease-out',
                  'group-hover:scale-105',
                )}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                src={cat.image}
              />

              {/* Gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              />

              {/* Label */}
              <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5">
                <p className="font-semibold font-serif text-lg text-white leading-tight sm:text-xl">
                  {cat.label}
                </p>
                <p className="mt-0.5 text-white/70 text-xs tracking-wide">{cat.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
