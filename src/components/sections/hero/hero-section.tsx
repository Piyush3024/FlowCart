'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Icons } from '@/components/shared/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, EASE_SMOOTH, gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({ delay: 0.4 });

      tl.from('.hero-eyebrow', {
        autoAlpha: 0,
        y: 20,
        duration: DURATION.fast,
        ease: EASE_DEFAULT,
      })
        .from(
          '.hero-headline',
          {
            autoAlpha: 0,
            y: 60,
            duration: DURATION.slow,
            ease: EASE_DEFAULT,
          },
          '-=0.1',
        )
        .from(
          '.hero-subtext',
          {
            autoAlpha: 0,
            y: 30,
            duration: DURATION.normal,
            ease: EASE_DEFAULT,
          },
          '-=0.4',
        )
        .from(
          '.hero-cta',
          {
            autoAlpha: 0,
            y: 20,
            duration: DURATION.normal,
            ease: EASE_DEFAULT,
          },
          '-=0.3',
        )
        .from(
          '.hero-image',
          {
            autoAlpha: 0,
            scale: 1.05,
            duration: DURATION.xslow,
            ease: EASE_SMOOTH,
          },
          '-=0.8',
        )
        .from(
          '.hero-scroll-hint',
          {
            autoAlpha: 0,
            y: 10,
            duration: DURATION.normal,
            ease: EASE_DEFAULT,
          },
          '-=0.2',
        );
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24 lg:py-32">
          {/* Left — Text */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="hero-eyebrow flex items-center gap-3">
              <span className="w-8 h-px bg-primary" aria-hidden="true" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                New Collection 2026
              </span>
            </div>

            <h1
              className={cn(
                'hero-headline font-serif font-bold text-foreground leading-[0.95]',
                'text-[clamp(3.5rem,8vw,7.5rem)]',
              )}
            >
              Live with
              <br />
              <span className="italic text-muted-foreground">intention.</span>
            </h1>

            <p className="hero-subtext text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
              Premium lifestyle products designed for those who care about the details. Crafted to
              last. Built to be loved.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="h-12 px-8 tracking-wider">
                <Link href="/#products">
                  Shop Now
                  <Icons.arrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 tracking-wider">
                <Link href="/#categories">Browse Categories</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="hero-cta flex items-center gap-6 pt-2">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-foreground">12K+</span>
                <span className="text-xs text-muted-foreground tracking-wide">Happy customers</span>
              </div>
              <div className="w-px h-10 bg-border" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground tracking-wide">Avg. rating</span>
              </div>
              <div className="w-px h-10 bg-border" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-foreground">Free</span>
                <span className="text-xs text-muted-foreground tracking-wide">Shipping $100+</span>
              </div>
            </div>
          </div>

          {/* Right — Image */}
          <div className="hero-image relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <ImageWithFallback
                src="https://picsum.photos/seed/hero-main/900/1200"
                alt="Featured lifestyle product — premium outerwear"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <div
              className={cn(
                'absolute -bottom-4 -left-4 sm:-left-8',
                'bg-card border border-border rounded-xl p-4 shadow-xl',
                'flex items-center gap-3',
              )}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Icons.shieldCheck size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium text-card-foreground">Free Returns</p>
                <p className="text-xs text-muted-foreground">30-day guarantee</p>
              </div>
            </div>

            {/* New arrivals tag */}
            <div
              className={cn(
                'absolute top-6 -right-2 sm:-right-6',
                'bg-primary text-primary-foreground',
                'text-xs font-medium tracking-widest uppercase',
                'px-4 py-2 rounded-full',
              )}
            >
              New Arrivals
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
