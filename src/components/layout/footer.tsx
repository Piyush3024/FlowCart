'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Icons } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const FOOTER_LINKS = {
  Shop: [
    { label: 'New Arrivals', href: ROUTES.products },
    { label: 'Apparel', href: ROUTES.categories },
    { label: 'Accessories', href: ROUTES.categories },
    { label: 'Footwear', href: ROUTES.categories },
    { label: 'Lifestyle', href: ROUTES.categories },
  ],
  Help: [
    { label: 'FAQ', href: ROUTES.faq },
    { label: 'Shipping & Returns', href: ROUTES.faq },
    { label: 'Size Guide', href: ROUTES.faq },
    { label: 'Contact Us', href: `mailto:${SITE.email}` },
  ],
  Company: [
    { label: 'About', href: ROUTES.about },
    { label: 'Sustainability', href: ROUTES.about },
    { label: 'Careers', href: ROUTES.about },
    { label: 'Press', href: ROUTES.about },
  ],
} as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    icon: 'instagram' as const,
    href: SITE.social.instagram,
  },
  { label: 'Twitter', icon: 'twitter' as const, href: SITE.social.twitter },
  {
    label: 'Pinterest',
    icon: 'pinterest' as const,
    href: SITE.social.pinterest,
  },
] as const;

export function Footer() {
  const reducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      gsap.from('.footer-content', {
        autoAlpha: 0,
        y: 30,
        duration: DURATION.normal,
        ease: EASE_DEFAULT,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: footerRef, dependencies: [reducedMotion] },
  );

  const onSubmit = async (_data: NewsletterFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Subscribed! Welcome to FlowCart.', {
        description: 'Welcome to FlowCart. Expect good things.',
      });
      reset();
    } catch {
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className="border-border border-t bg-card" ref={footerRef}>
      {/* Newsletter banner */}
      <div className="border-border border-b">
        <div className="footer-content mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex max-w-md flex-col gap-2">
              <h2 className="font-bold font-serif text-2xl text-card-foreground sm:text-3xl">
                Join the inner circle.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Early access to new drops, exclusive offers, and zero spam. Unsubscribe any time.
              </p>
            </div>

            {/* Newsletter form */}
            <form className="w-full lg:max-w-md" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 flex-col gap-1">
                  <label className="sr-only" htmlFor="newsletter-email">
                    Email address for newsletter
                  </label>
                  <Input
                    id="newsletter-email"
                    placeholder="your@email.com"
                    type="email"
                    {...register('email')}
                    aria-describedby={errors.email ? 'newsletter-error' : undefined}
                    className="h-11 w-full"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs" id="newsletter-error" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  aria-label="Subscribe to newsletter"
                  className="h-11 shrink-0 px-6 tracking-wider"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <Icons.spinner aria-hidden="true" className="animate-spin" size={16} />
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-content mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-2">
            <Link
              className="w-fit font-bold font-serif text-2xl text-card-foreground transition-opacity hover:opacity-70"
              href="/"
            >
              {SITE.name}
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              {SITE.description} Designed for the way you live.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  aria-label={`Follow us on ${social.label}`}
                  asChild
                  className="h-9 w-9"
                  key={social.label}
                  size="icon"
                  variant="outline"
                >
                  <a href={social.href} rel="noopener noreferrer" target="_blank">
                    {social.icon === 'instagram' && <Icons.instagram size={15} />}
                    {social.icon === 'twitter' && <Icons.twitter size={15} />}
                    {social.icon === 'pinterest' && <Icons.pinterest size={15} />}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div className="flex flex-col gap-4" key={group}>
              <h3 className="font-semibold text-card-foreground text-xs uppercase tracking-widest">
                {group}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-muted-foreground text-sm transition-colors hover:text-card-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="footer-content mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                className="text-muted-foreground text-xs transition-colors hover:text-card-foreground"
                href="#"
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
