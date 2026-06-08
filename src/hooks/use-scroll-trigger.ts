'use client';

import { useEffect, useRef } from 'react';
import { DURATION, EASE_DEFAULT, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from './use-reduced-motion';

interface ScrollTriggerOptions {
  selector: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

export function useScrollTrigger<T extends HTMLElement>(options: ScrollTriggerOptions) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(options.selector, {
        y: options.y ?? 50,
        opacity: 0,
        duration: options.duration ?? DURATION.normal,
        stagger: options.stagger ?? 0.15,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        t.kill();
      });
    };
  }, [
    reducedMotion,
    options.selector,
    options.y,
    options.stagger,
    options.duration,
    options.start,
  ]);

  return ref;
}
