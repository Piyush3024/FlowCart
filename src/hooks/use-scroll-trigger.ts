'use client';

import { useRef } from 'react';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from './use-reduced-motion';

interface ScrollTriggerOptions {
  selector: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

export function useScrollTrigger<T extends HTMLElement>(
  options: ScrollTriggerOptions,
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from(options.selector, {
        autoAlpha: 0,
        y: options.y ?? 50,
        duration: options.duration ?? DURATION.normal,
        stagger: options.stagger ?? 0.15,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    {
      scope: ref,
      dependencies: [reducedMotion],
    },
  );

  return ref;
}
