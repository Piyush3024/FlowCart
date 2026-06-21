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
      if (reducedMotion) {
        return;
      }

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
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
      ref={containerRef}
    >
      {/* Background grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          {/* Left — Text */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="hero-eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                New Collection 2026
              </span>
            </div>

            <h1
              className={cn(
                'hero-headline font-bold font-serif text-foreground leading-[0.95]',
                'text-[clamp(3.5rem,8vw,7.5rem)]',
              )}
            >
              Live with
              <br />
              <span className="text-muted-foreground italic">intention.</span>
            </h1>

            <p className="hero-subtext max-w-md text-base text-muted-foreground leading-relaxed sm:text-lg">
              Premium lifestyle products designed for those who care about the details. Crafted to
              last. Built to be loved.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-4">
              <Button asChild className="h-12 px-8 tracking-wider" size="lg">
                <Link href="/#products">
                  Shop Now
                  <Icons.arrowRight size={16} />
                </Link>
              </Button>
              <Button asChild className="h-12 px-8 tracking-wider" size="lg" variant="outline">
                <Link href="/#categories">Browse Categories</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="hero-cta flex items-center gap-6 pt-2">
              <div className="flex flex-col">
                <span className="font-bold font-serif text-2xl text-foreground">12K+</span>
                <span className="text-muted-foreground text-xs tracking-wide">Happy customers</span>
              </div>
              <div aria-hidden="true" className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="font-bold font-serif text-2xl text-foreground">4.9</span>
                <span className="text-muted-foreground text-xs tracking-wide">Avg. rating</span>
              </div>
              <div aria-hidden="true" className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="font-bold font-serif text-2xl text-foreground">Free</span>
                <span className="text-muted-foreground text-xs tracking-wide">Shipping $100+</span>
              </div>
            </div>
          </div>

          {/* Right — Image */}
          <div className="hero-image relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
              <ImageWithFallback
                alt="Featured lifestyle product — premium outerwear"
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="https://picsum.photos/seed/hero-main/900/1200"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              />
            </div>

            {/* Floating badge */}
            <div
              className={cn(
                'absolute -bottom-4 -left-4 sm:-left-8',
                'rounded-xl border border-border bg-card p-4 shadow-xl',
                'flex items-center gap-3',
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                <Icons.shieldCheck className="text-primary-foreground" size={18} />
              </div>
              <div>
                <p className="font-medium text-card-foreground text-xs">Free Returns</p>
                <p className="text-muted-foreground text-xs">30-day guarantee</p>
              </div>
            </div>

            {/* New arrivals tag */}
            <div
              className={cn(
                'absolute top-6 -right-2 sm:-right-6',
                'bg-primary text-primary-foreground',
                'font-medium text-xs uppercase tracking-widest',
                'rounded-full px-4 py-2',
              )}
            >
              New Arrivals
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="hero-scroll-hint absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
