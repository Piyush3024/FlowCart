'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useFaqs } from '@/services/faq.service';

const SKELETON_IDS = Array.from({ length: 5 }).map((_, i) => `faq-skeleton-${i}`);

export function FaqSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { data: faqs, isPending, isError, refetch } = useFaqs();

  useEffect(() => {
    if (!isPending) {
      const id = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => clearTimeout(id);
    }
  }, [isPending]);

  useGSAP(
    () => {
      if (reducedMotion || isPending || !faqs?.length) return;

      gsap.from('.faq-header', {
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

      gsap.from('.faq-item', {
        autoAlpha: 0,
        y: 20,
        duration: DURATION.normal,
        stagger: 0.08,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion, isPending, faqs] },
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="faq-header flex flex-col gap-3 mb-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Support
            </span>
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            className={cn(
              'font-serif font-bold text-foreground leading-tight',
              'text-[clamp(2rem,4vw,3.5rem)]',
            )}
          >
            Frequently Asked
            <br />
            <span className="italic text-muted-foreground">Questions</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Everything you need to know about FlowCart. Can&apos;t find an answer?{' '}
            <Link
              href="mailto:hello@flowcart.co"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* Error state */}
        {isError && (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">Could not load FAQs. Please try again.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {/* Skeleton */}
        {isPending && (
          <div
            className="flex flex-col gap-4"
            role="status"
            aria-label="Loading FAQs"
            aria-busy="true"
          >
            {SKELETON_IDS.map((id) => (
              <div key={id} className="flex flex-col gap-2 py-3 border-b border-border">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* FAQ Accordion */}
        {!isPending && !isError && faqs && (
          <Accordion
            type="single"
            collapsible
            className="faq-list w-full"
            aria-label="FAQ accordion"
            onValueChange={() => {
              setTimeout(() => ScrollTrigger.refresh(), 300);
            }}
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="faq-item">
                <AccordionTrigger className="font-serif text-base font-medium text-foreground py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
