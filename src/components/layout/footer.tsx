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
      if (reducedMotion) return;

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
    <footer ref={footerRef} className="bg-card border-t border-border">
      {/* Newsletter banner */}
      <div className="border-b border-border">
        <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-2 max-w-md">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-card-foreground">
                Join the inner circle.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Early access to new drops, exclusive offers, and zero spam. Unsubscribe any time.
              </p>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full lg:max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    className="h-11 w-full"
                    aria-describedby={errors.email ? 'newsletter-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p id="newsletter-error" className="text-xs text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-6 tracking-wider shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <Icons.spinner size={16} className="animate-spin" aria-hidden="true" />
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
      <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-5">
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-card-foreground hover:opacity-70 transition-opacity w-fit"
            >
              {SITE.name}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {SITE.description} Designed for the way you live.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                  aria-label={`Follow us on ${social.label}`}
                  className="w-9 h-9"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
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
            <div key={group} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-card-foreground">
                {group}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-card-foreground transition-colors"
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
      <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-muted-foreground hover:text-card-foreground transition-colors"
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
