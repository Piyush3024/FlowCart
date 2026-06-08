import { CartDrawer } from '@/components/layout/cart-drawer';
import { Navbar } from '@/components/layout/navbar';
import { CategoriesSection } from '@/components/sections/categories/categories-section';
import { FaqSection } from '@/components/sections/faq/faq-section';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { ProductGrid } from '@/components/sections/products/product-grid';
import { PromoBanner } from '@/components/sections/promo/promo-banner';
import { QuickViewModal } from '@/components/sections/quick-view/quick-view-modal';
import { TestimonialsSection } from '@/components/sections/testimonials/testimonials-section';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <QuickViewModal />
      <main>
        <HeroSection />
        <PromoBanner />
        <ProductGrid />
        <CategoriesSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
    </>
  );
}
