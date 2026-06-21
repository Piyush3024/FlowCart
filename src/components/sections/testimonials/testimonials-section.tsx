'use client';

import { useRef } from 'react';
import { Icons } from '@/components/shared/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_TESTIMONIALS } from '@/data/testimonials.mock';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export function TestimonialsSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      gsap.from('.testimonials-header', {
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

      gsap.from('.testimonial-card', {
        autoAlpha: 0,
        y: 40,
        duration: DURATION.normal,
        stagger: 0.12,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      aria-label="Customer testimonials"
      className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
      id="testimonials"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="testimonials-header mb-12 flex flex-col gap-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Social Proof
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
          </div>
          <h2
            className={cn(
              'font-bold font-serif text-foreground leading-tight',
              'text-[clamp(2rem,4vw,3.5rem)]',
            )}
          >
            Loved by thousands
            <br />
            <span className="text-muted-foreground italic">of customers</span>
          </h2>
        </div>

        {/* Grid */}
        <ul
          aria-label="Customer reviews"
          className="testimonials-grid columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3"
        >
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <li className="break-inside-avoid" key={testimonial.id}>
              <Card className="testimonial-card">
                <CardContent className="flex flex-col gap-4 pt-4">
                  {/* Stars */}
                  <div
                    aria-label={`${testimonial.rating} out of 5 stars`}
                    className="flex items-center gap-0.5"
                    role="img"
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <Icons.star
                        className={cn(
                          starValue <= testimonial.rating
                            ? 'fill-current text-foreground'
                            : 'text-muted-foreground',
                        )}
                        key={starValue}
                        size={13}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground text-sm leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Product tag */}
                  {testimonial.product && (
                    <Badge className="w-fit text-[10px] tracking-wide" variant="outline">
                      {testimonial.product}
                    </Badge>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                      <ImageWithFallback
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                        sizes="36px"
                        src={testimonial.avatar}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground text-xs">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <Icons.circleCheck
                            aria-label="Verified purchase"
                            className="shrink-0 text-primary"
                            size={12}
                          />
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {testimonial.handle}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
