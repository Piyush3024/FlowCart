'use client';

import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';

const PROMO_ITEMS = [
  'Free shipping on orders over $100',
  'New collection just dropped',
  'Use code FLOW15 for 15% off',
  '30-day free returns',
  'Sustainably made',
  'Premium materials, honest prices',
];

export function PromoBanner() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }
      const tween = gsap
        .to('.promo-item', {
          xPercent: -100,
          repeat: -1,
          duration: 20,
          ease: 'linear',
        })
        .totalProgress(0.5);

      let lastScroll = 0;
      const onScroll = () => {
        const current = window.scrollY;
        const scrollingDown = current > lastScroll;
        gsap.to(tween, {
          timeScale: scrollingDown ? 2 : 1,
          duration: 0.4,
          overwrite: true,
        });
        lastScroll = current;
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  const allItems = [
    ...PROMO_ITEMS.map((item) => ({ text: item, copy: 0 })),
    ...PROMO_ITEMS.map((item) => ({ text: item, copy: 1 })),
  ];

  return (
    <div
      aria-label="Promotions"
      className="w-full overflow-hidden bg-primary py-3 text-primary-foreground"
      ref={containerRef}
      role="marquee"
    >
      <div className="flex whitespace-nowrap will-change-transform">
        {allItems.map(({ text, copy }) => (
          <span
            className="promo-item inline-flex shrink-0 items-center gap-6 px-8 font-medium text-xs uppercase tracking-widest"
            key={`${text}-${copy}`}
          >
            {text}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary-foreground/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
