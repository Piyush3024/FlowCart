'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SITE } from '@/constants/site';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';

const FOOTER_LINKS = {
  Shop: [
    { label: 'New Arrivals', href: '/#products' },
    { label: 'Apparel', href: '/#categories' },
    { label: 'Accessories', href: '/#categories' },
    { label: 'Footwear', href: '/#categories' },
    { label: 'Lifestyle', href: '/#categories' },
  ],
  Help: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Shipping & Returns', href: '/#faq' },
    { label: 'Size Guide', href: '/#faq' },
    { label: 'Contact Us', href: `mailto:${SITE.email}` },
  ],
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Sustainability', href: '/#about' },
    { label: 'Careers', href: '/#about' },
    { label: 'Press', href: '/#about' },
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
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleNewsletterSubmit = async () => {
    if (!email?.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    toast.success("You're on the list!", {
      description: 'Welcome to FlowCart. Expect good things.',
    });

    setEmail('');
    setSubmitting(false);
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
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
                className="h-11 flex-1"
                aria-label="Email address for newsletter"
                disabled={submitting}
              />
              <Button
                onClick={handleNewsletterSubmit}
                disabled={submitting}
                className="h-11 px-6 tracking-wider shrink-0"
                aria-label="Subscribe to newsletter"
              >
                {submitting ? (
                  <Icons.spinner size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>
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
