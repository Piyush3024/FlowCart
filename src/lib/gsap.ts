import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export const EASE_DEFAULT = 'power3.out';
export const EASE_BOUNCE = 'back.out(1.4)';
export const EASE_SMOOTH = 'power2.inOut';

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  xslow: 1.4,
} as const;

// biome-ignore lint/performance/noBarrelFile: central GSAP integration point
export { useGSAP } from '@gsap/react';
export { default as gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';
