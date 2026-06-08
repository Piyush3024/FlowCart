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
      if (reducedMotion) return;
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
      ref={containerRef}
      className="w-full overflow-hidden bg-primary text-primary-foreground py-3"
      aria-label="Promotions"
      role="marquee"
    >
      <div className="flex whitespace-nowrap will-change-transform">
        {allItems.map(({ text, copy }) => (
          <span
            key={`${text}-${copy}`}
            className="promo-item inline-flex items-center gap-6 px-8 text-xs font-medium tracking-widest uppercase shrink-0"
          >
            {text}
            <span className="w-1 h-1 rounded-full bg-primary-foreground/40" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
