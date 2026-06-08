import { CartDrawer } from '@/components/layout/cart-drawer';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { ProductGrid } from '@/components/sections/products/product-grid';
import { PromoBanner } from '@/components/sections/promo/promo-banner';
import { QuickViewModal } from '@/components/sections/quick-view/quick-view-modal';

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
      </main>
    </>
  );
}
