'use client';

import { useRef } from 'react';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from './use-reduced-motion';

interface EntranceOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
}

export function useGsapEntrance<T extends HTMLElement>(
  selector: string,
  options: EntranceOptions = {},
) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      gsap.from(selector, {
        autoAlpha: 0,
        y: options.y ?? 40,
        duration: options.duration ?? DURATION.normal,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0.1,
        ease: EASE_DEFAULT,
        clearProps: 'all',
      });
    },
    {
      scope: ref,
      dependencies: [reducedMotion],
    },
  );

  return ref;
}
