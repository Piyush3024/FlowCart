import { ClientOverlays } from '@/components/layout/client-overlays';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { CategoriesSection } from '@/components/sections/categories/categories-section';
import { FaqSection } from '@/components/sections/faq/faq-section';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { ProductGrid } from '@/components/sections/products/product-grid';
import { PromoBanner } from '@/components/sections/promo/promo-banner';
import { TestimonialsSection } from '@/components/sections/testimonials/testimonials-section';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FlowCart',
  url: 'https://flowcart.vercel.app',
  logo: 'https://flowcart.vercel.app/logo.png',
  description: 'Premium lifestyle e-commerce store',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@flowcart.co',
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ClientOverlays />
      <main>
        <HeroSection />
        <PromoBanner />
        <ProductGrid />
        <CategoriesSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
