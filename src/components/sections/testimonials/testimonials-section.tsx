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
      if (reducedMotion) return;

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
      ref={sectionRef}
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
      aria-label="Customer testimonials"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="testimonials-header flex flex-col gap-3 mb-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Social Proof
            </span>
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            className={cn(
              'font-serif font-bold text-foreground leading-tight',
              'text-[clamp(2rem,4vw,3.5rem)]',
            )}
          >
            Loved by thousands
            <br />
            <span className="italic text-muted-foreground">of customers</span>
          </h2>
        </div>

        {/* Grid */}
        <ul
          className="testimonials-grid columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          aria-label="Customer reviews"
        >
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.id} className="break-inside-avoid">
              <Card className="testimonial-card">
                <CardContent className="flex flex-col gap-4 pt-4">
                  {/* Stars */}
                  <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <Icons.star
                        key={starValue}
                        size={13}
                        className={cn(
                          starValue <= testimonial.rating
                            ? 'text-foreground fill-current'
                            : 'text-muted-foreground',
                        )}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-sm text-foreground leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Product tag */}
                  {testimonial.product && (
                    <Badge variant="outline" className="w-fit text-[10px] tracking-wide">
                      {testimonial.product}
                    </Badge>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-muted shrink-0">
                      <ImageWithFallback
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-foreground">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <Icons.circleCheck
                            size={12}
                            className="text-primary shrink-0"
                            aria-label="Verified purchase"
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
