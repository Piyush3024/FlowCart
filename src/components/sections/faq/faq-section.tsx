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
      if (reducedMotion || isPending || !faqs?.length) {
        return;
      }

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
      aria-label="Frequently asked questions"
      className="px-4 py-24 sm:px-6 lg:px-8"
      id="faq"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="faq-header mb-12 flex flex-col gap-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Support
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
          </div>
          <h2
            className={cn(
              'font-bold font-serif text-foreground leading-tight',
              'text-[clamp(2rem,4vw,3.5rem)]',
            )}
          >
            Frequently Asked
            <br />
            <span className="text-muted-foreground italic">Questions</span>
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground text-sm leading-relaxed">
            Everything you need to know about FlowCart. Can&apos;t find an answer?{' '}
            <Link
              className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
              href="mailto:hello@flowcart.co"
            >
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-muted-foreground text-sm">Could not load FAQs. Please try again.</p>
            <Button onClick={() => refetch()} size="sm" variant="outline">
              Retry
            </Button>
          </div>
        )}

        {/* Skeleton */}
        {isPending && (
          <div
            aria-busy="true"
            aria-label="Loading FAQs"
            className="flex flex-col gap-4"
            role="status"
          >
            {SKELETON_IDS.map((id) => (
              <div className="flex flex-col gap-2 border-border border-b py-3" key={id}>
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* FAQ Accordion */}
        {!(isPending || isError) && faqs && (
          <Accordion
            aria-label="FAQ accordion"
            className="faq-list w-full"
            collapsible
            onValueChange={() => {
              setTimeout(() => ScrollTrigger.refresh(), 300);
            }}
            type="single"
          >
            {faqs.map((faq) => (
              <AccordionItem className="faq-item m-1" key={faq.id} value={faq.id}>
                <AccordionTrigger className="px-2 py-4 font-medium font-serif text-base text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-2 text-muted-foreground leading-relaxed">
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
