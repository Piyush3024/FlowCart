import { CartDrawer } from '@/components/layout/cart-drawer';
import { Navbar } from '@/components/layout/navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-16">
        <p className="p-8 text-foreground font-sans">FlowCart</p>
      </main>
    </>
  );
}
