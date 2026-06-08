import { CartDrawer } from '@/components/layout/cart-drawer';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { PromoBanner } from '@/components/sections/promo/promo-banner';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <HeroSection />
        <PromoBanner />
      </main>
    </>
  );
}
