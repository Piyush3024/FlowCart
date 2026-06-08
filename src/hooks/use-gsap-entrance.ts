'use client';

import { useEffect, useRef } from 'react';
import { DURATION, EASE_DEFAULT, gsap } from '@/lib/gsap';
import { useReducedMotion } from './use-reduced-motion';

interface EntranceOptions {
  delay?: number;
  duration?: number;
  y?: number;
  opacity?: number;
  stagger?: number;
}

export function useGsapEntrance<T extends HTMLElement>(
  selector: string,
  options: EntranceOptions = {},
) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: options.y ?? 40,
        opacity: options.opacity ?? 0,
        duration: options.duration ?? DURATION.normal,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0.1,
        ease: EASE_DEFAULT,
        clearProps: 'all',
      });
    }, ref);

    return () => ctx.revert();
  }, [
    reducedMotion,
    selector,
    options.y,
    options.opacity,
    options.duration,
    options.delay,
    options.stagger,
  ]);

  return ref;
}
